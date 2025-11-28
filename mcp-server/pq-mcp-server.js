#!/usr/bin/env node
/**
 * PersistQ MCP Server (Stdio Transport)
 * Uses official @modelcontextprotocol/sdk for stdio communication with Claude Code
 * Connects to PersistQ HTTP server on port 3000
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');
const axios = require('axios');

const PERSISTQ_URL = process.env.PERSISTQ_URL || 'http://localhost:3000';
const API_KEY = process.env.PERSISTQ_API_KEY || 'pq_9df422f134ef9ec93e8337dd5bde0540dfd3d0de714e6e00379f3f7f174cfdff';
const TOPIC = process.env.PERSISTQ_TOPIC || 'ClaudeConversations';

// Create MCP server
const server = new Server(
  {
    name: 'persistq-mcp-server',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {},
      resources: {}
    }
  }
);

// Tool: list_tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'add_memory',
      description: 'Add a new memory to PersistQ',
      inputSchema: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'The memory content to store' },
          topic: { type: 'string', description: 'Category or topic for this memory', default: TOPIC },
          metadata: { type: 'object', description: 'Additional metadata' }
        },
        required: ['text']
      }
    },
    {
      name: 'search_memory',
      description: 'Search memories by keyword or topic',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query or keyword' },
          topic: { type: 'string', description: 'Filter by topic' },
          limit: { type: 'number', description: 'Maximum results', default: 10 }
        },
        required: ['query']
      }
    },
    {
      name: 'get_memory_stats',
      description: 'Get statistics about stored memories',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'list_memories',
      description: 'List memories with optional filtering by project/tag',
      inputSchema: {
        type: 'object',
        properties: {
          project: { type: 'string', description: 'Filter by project/tag name' },
          limit: { type: 'number', description: 'Maximum results', default: 10 },
          offset: { type: 'number', description: 'Offset for pagination', default: 0 }
        }
      }
    }
  ]
}));

// Tool: call_tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'add_memory': {
        const response = await axios.post(`${PERSISTQ_URL}/api/memory`, {
          content: args.text,
          project: args.topic || TOPIC,
          metadata: args.metadata || {}
        }, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        const memoryId = response.data.data?.memoryId || response.data.memory?.id || response.data.id || 'OK';
        return {
          content: [{ type: 'text', text: `Memory added successfully: ${memoryId}` }]
        };
      }

      case 'search_memory': {
        const response = await axios.post(`${PERSISTQ_URL}/api/memory/search`, {
          query: args.query,
          limit: args.limit || 10,
          threshold: 0.7
        }, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        const results = response.data.data || response.data.memories || [];
        const text = results.length > 0
          ? results.map(r => `[${r.id}] ${(r.text || r.content || '').substring(0, 200)}... (Score: ${r.score?.toFixed(2) || 'N/A'})`).join('\n\n')
          : 'No memories found';
        return {
          content: [{ type: 'text', text }]
        };
      }

      case 'get_memory_stats': {
        const response = await axios.get(`${PERSISTQ_URL}/api/memory/stats`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        const stats = response.data.data || response.data.stats || response.data || {};
        return {
          content: [{ type: 'text', text: JSON.stringify(stats, null, 2) }]
        };
      }

      case 'list_memories': {
        const params = new URLSearchParams();
        if (args.project) params.append('project', args.project);
        if (args.limit) params.append('limit', String(args.limit));
        if (args.offset) params.append('offset', String(args.offset));

        const response = await axios.get(`${PERSISTQ_URL}/api/memory/list?${params.toString()}`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        const memories = response.data.data?.memories || response.data.memories || [];
        const text = memories.length > 0
          ? memories.map(m => `[${m.id}]\nProject: ${m.project}\nContent: ${m.content}\nCreated: ${m.createdAt}\n`).join('\n')
          : 'No memories found';
        return {
          content: [{ type: 'text', text }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true
    };
  }
});

// Resources: list_resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'persistq://memories/all',
      name: 'All Memories',
      description: 'List of all stored memories',
      mimeType: 'application/json'
    },
    {
      uri: 'persistq://stats',
      name: 'Memory Statistics',
      description: 'Overview of memory storage',
      mimeType: 'application/json'
    }
  ]
}));

// Resources: read_resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    if (uri === 'persistq://memories/all') {
      const response = await axios.get(`${PERSISTQ_URL}/api/memory/list?limit=100&offset=0`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(response.data.memories || [], null, 2)
        }]
      };
    }

    if (uri === 'persistq://stats') {
      const response = await axios.get(`${PERSISTQ_URL}/api/memory/stats`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      const stats = response.data.stats || response.data || {};
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(stats, null, 2)
        }]
      };
    }

    throw new Error(`Unknown resource: ${uri}`);
  } catch (error) {
    throw new Error(`Failed to read resource: ${error.message}`);
  }
});

// Start server with stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[PersistQ MCP Server] Started on stdio');
}

main().catch((error) => {
  console.error('[PersistQ MCP Server] Fatal error:', error);
  process.exit(1);
});
