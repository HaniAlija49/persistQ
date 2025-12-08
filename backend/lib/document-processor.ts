import PDFParser from 'pdf2json';
import mammoth from 'mammoth';
import { Readable } from 'stream';

export interface DocumentChunk {
  content: string;
  metadata: {
    source: string;
    fileName: string;
    fileType: 'pdf' | 'docx';
    originalSize: number;
    chunkIndex: number;
    totalChunks: number;
    processingMethod: 'recursive' | 'semantic' | 'fixed';
    extractedAt: string;
    documentTitle?: string;
    author?: string;
    project?: string;
  };
}

export interface ProcessingStats {
  totalChunks: number;
  totalCharacters: number;
  processingTime: number;
  fileType: string;
  fileName: string;
}

export interface ProcessingOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  processingMethod?: 'recursive' | 'semantic' | 'fixed';
  maxFileSize?: number; // in bytes
}

const DEFAULT_OPTIONS: Required<ProcessingOptions> = {
  chunkSize: 2000,
  chunkOverlap: 200,
  processingMethod: 'recursive',
  maxFileSize: 10 * 1024 * 1024, // 10MB
};

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<{
  text: string;
  metadata?: any;
}> {
  return new Promise((resolve, reject) => {
    try {
      const pdfParser = new PDFParser();
      
      pdfParser.on('pdfParser_dataError', (errData: any) => {
        reject(new Error(`PDF parsing error: ${errData.parserError}`));
      });
      
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        try {
          // Extract raw text from all pages
          let fullText = '';
          
          if (pdfData.Pages) {
            pdfData.Pages.forEach((page: any) => {
              if (page.Texts) {
                page.Texts.forEach((text: any) => {
                  if (text.R) {
                    text.R.forEach((r: any) => {
                      if (r.T) {
                        fullText += decodeURIComponent(r.T) + ' ';
                      }
                    });
                  }
                });
                fullText += '\n';
              }
            });
          }
          
          resolve({
            text: fullText.trim(),
            metadata: {
              pages: pdfData.Pages ? pdfData.Pages.length : 0,
              info: pdfData.Meta || {},
            },
          });
        } catch (err) {
          reject(new Error(`PDF data processing error: ${err instanceof Error ? err.message : 'Unknown error'}`));
        }
      });
      
      // Parse the PDF buffer
      pdfParser.parseBuffer(buffer);
      
    } catch (error) {
      reject(new Error(`PDF extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });
}

/**
 * Extract text from Word document buffer
 */
export async function extractTextFromWord(buffer: Buffer): Promise<{
  text: string;
  metadata?: any;
}> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return {
      text: result.value,
      metadata: {
        messages: result.messages,
      },
    };
  } catch (error) {
    throw new Error(`Word document extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Split text into chunks using recursive character splitting
 */
export function recursiveCharacterSplit(
  text: string,
  chunkSize: number = DEFAULT_OPTIONS.chunkSize,
  chunkOverlap: number = DEFAULT_OPTIONS.chunkOverlap
): string[] {
  const separators = ['\n\n', '\n', '. ', ' ', ''];
  const chunks: string[] = [];
  
  function splitWithSeparator(separator: string): string[] {
    if (separator === '') {
      // Final fallback: split by character
      const parts = [];
      for (let i = 0; i < text.length; i += chunkSize - chunkOverlap) {
        parts.push(text.slice(i, i + chunkSize));
      }
      return parts;
    }
    
    const parts = text.split(separator);
    const result: string[] = [];
    let currentChunk = '';
    
    for (const part of parts) {
      const testChunk = currentChunk + (currentChunk ? separator : '') + part;
      
      if (testChunk.length <= chunkSize) {
        currentChunk = testChunk;
      } else {
        if (currentChunk) {
          result.push(currentChunk);
        }
        currentChunk = part;
      }
    }
    
    if (currentChunk) {
      result.push(currentChunk);
    }
    
    return result;
  }
  
  // Try each separator in order
  for (const separator of separators) {
    const testChunks = splitWithSeparator(separator);
    
    // Check if chunks are reasonable size
    const validChunks = testChunks.filter(chunk => chunk.trim().length > 0);
    if (validChunks.length > 0 && validChunks.every(chunk => chunk.length <= chunkSize * 1.2)) {
      return validChunks;
    }
  }
  
  // Fallback to fixed-size chunks
  return splitWithSeparator('');
}

/**
 * Split text into fixed-size chunks
 */
export function fixedSizeSplit(
  text: string,
  chunkSize: number = DEFAULT_OPTIONS.chunkSize,
  chunkOverlap: number = DEFAULT_OPTIONS.chunkOverlap
): string[] {
  const chunks: string[] = [];
  
  for (let i = 0; i < text.length; i += chunkSize - chunkOverlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  
  return chunks.filter(chunk => chunk.trim().length > 0);
}

/**
 * Process document and create chunks
 */
export async function processDocument(
  buffer: Buffer,
  fileName: string,
  options: ProcessingOptions = {}
): Promise<{
  chunks: DocumentChunk[];
  stats: ProcessingStats;
}> {
  const startTime = Date.now();
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Validate file size
  if (buffer.length > opts.maxFileSize) {
    throw new Error(`File size exceeds maximum allowed size of ${opts.maxFileSize / 1024 / 1024}MB`);
  }
  
  // Determine file type
  const fileExtension = fileName.toLowerCase().split('.').pop();
  if (!fileExtension || !['pdf', 'docx'].includes(fileExtension)) {
    throw new Error('Unsupported file type. Only PDF and DOCX files are allowed.');
  }
  
  const fileType = fileExtension as 'pdf' | 'docx';
  
  // Extract text
  let extractedText: string;
  let documentMetadata: any = {};
  
  if (fileType === 'pdf') {
    const result = await extractTextFromPDF(buffer);
    extractedText = result.text;
    documentMetadata = result.metadata;
  } else {
    const result = await extractTextFromWord(buffer);
    extractedText = result.text;
    documentMetadata = result.metadata;
  }
  
  if (!extractedText.trim()) {
    throw new Error('No text content found in the document');
  }
  
  // Split into chunks
  let textChunks: string[];
  
  switch (opts.processingMethod) {
    case 'fixed':
      textChunks = fixedSizeSplit(extractedText, opts.chunkSize, opts.chunkOverlap);
      break;
    case 'recursive':
    default:
      textChunks = recursiveCharacterSplit(extractedText, opts.chunkSize, opts.chunkOverlap);
      break;
  }
  
  // Create document chunks with metadata
  const chunks: DocumentChunk[] = textChunks.map((content, index) => ({
    content: content.trim(),
    metadata: {
      source: 'document_upload',
      fileName,
      fileType,
      originalSize: buffer.length,
      chunkIndex: index,
      totalChunks: textChunks.length,
      processingMethod: opts.processingMethod,
      extractedAt: new Date().toISOString(),
      documentTitle: documentMetadata?.info?.Title || documentMetadata?.metadata?.dc?.title,
      author: documentMetadata?.info?.Author || documentMetadata?.metadata?.dc?.creator,
    },
  }));
  
  const processingTime = Date.now() - startTime;
  
  return {
    chunks,
    stats: {
      totalChunks: chunks.length,
      totalCharacters: extractedText.length,
      processingTime,
      fileType,
      fileName,
    },
  };
}

/**
 * Validate file type and size
 */
export function validateFile(buffer: Buffer, fileName: string, maxSize: number = DEFAULT_OPTIONS.maxFileSize): {
  isValid: boolean;
  error?: string;
  fileType?: 'pdf' | 'docx';
} {
  // Check file size
  if (buffer.length > maxSize) {
    return {
      isValid: false,
      error: `File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`,
    };
  }
  
  // Check file type
  const fileExtension = fileName.toLowerCase().split('.').pop();
  if (!fileExtension || !['pdf', 'docx'].includes(fileExtension)) {
    return {
      isValid: false,
      error: 'Unsupported file type. Only PDF and DOCX files are allowed.',
    };
  }
  
  return {
    isValid: true,
    fileType: fileExtension as 'pdf' | 'docx',
  };
}