import { NextRequest, NextResponse } from 'next/server';
import { processDocument, validateFile, ProcessingOptions } from '@/lib/document-processor';
import { validateApiKey } from '@/lib/auth';
import { z } from 'zod';

// Configure multer for file uploads
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UploadSchema = z.object({
  file: z.instanceof(File),
  chunkSize: z.coerce.number().min(100).max(5000).optional(),
  chunkOverlap: z.coerce.number().min(0).max(500).optional(),
  processingMethod: z.enum(['recursive', 'semantic', 'fixed']).optional(),
  project: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await validateApiKey();
    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Parse and validate options
    const options = {
      chunkSize: formData.get('chunkSize') ? Number(formData.get('chunkSize')) : undefined,
      chunkOverlap: formData.get('chunkOverlap') ? Number(formData.get('chunkOverlap')) : undefined,
      processingMethod: formData.get('processingMethod') as 'recursive' | 'semantic' | 'fixed' | undefined,
      project: formData.get('project') as string | undefined,
    };

    const validatedOptions = UploadSchema.parse({ file, ...options });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate file
    const validation = validateFile(buffer, file.name);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Process document
    const result = await processDocument(buffer, file.name, {
      chunkSize: validatedOptions.chunkSize,
      chunkOverlap: validatedOptions.chunkOverlap,
      processingMethod: validatedOptions.processingMethod,
    });

    // Add project to metadata if provided
    if (validatedOptions.project) {
      result.chunks.forEach(chunk => {
        chunk.metadata.project = validatedOptions.project;
      });
    }

    return NextResponse.json({
      success: true,
      chunks: result.chunks,
      stats: result.stats,
    });

  } catch (error) {
    console.error('Document processing error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process document' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Document processing endpoint. Use POST to upload and process documents.',
    supportedFormats: ['pdf', 'docx'],
    maxFileSize: '10MB',
    defaultOptions: {
      chunkSize: 2000,
      chunkOverlap: 200,
      processingMethod: 'recursive',
    },
  });
}