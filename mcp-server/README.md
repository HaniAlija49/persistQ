# PersistQ MCP Server

MCP (Model Context Protocol) server for PersistQ - enabling persistent memory management for Claude Code and other AI tools.

## Overview

PersistQ MCP Server provides a bridge between AI assistants (like Claude Code) and the PersistQ memory management system. It allows AI tools to:

- Store and retrieve memories
- Search across stored content
- Organize memories by topics/projects
- Access persistent memory statistics

## Installation

```bash
cd mcp-server
npm install
```

## Configuration

The server can be configured using environment variables:

- `PERSISTQ_URL`: URL of the PersistQ HTTP server (default: `http://localhost:3000`)
- `PERSISTQ_API_KEY`: API key for authentication (default: auto-generated)
- `PERSISTQ_TOPIC`: Default topic for memories (default: `ClaudeConversations`)

## Usage

### Starting the Server

```bash
npm start
```

### Available Tools

The MCP server exposes the following tools:

#### 1. add_memory
Add a new memory to PersistQ.

**Parameters:**
- `text` (required): The memory content to store
- `topic` (optional): Category or topic for this memory
- `metadata` (optional): Additional metadata object

#### 2. search_memory
Search memories by keyword or topic.

**Parameters:**
- `query` (required): Search query or keyword
- `topic` (optional): Filter by topic
- `limit` (optional): Maximum number of results (default: 10)

#### 3. get_memory_stats
Get statistics about stored memories.

**Parameters:** None

#### 4. list_memories
List memories with optional filtering.

**Parameters:**
- `project` (optional): Filter by project/tag name
- `limit` (optional): Maximum results (default: 10)
- `offset` (optional): Offset for pagination (default: 0)

### Available Resources

The server provides the following resources:

- `persistq://memories/all`: List of all stored memories
- `persistq://stats`: Overview of memory storage statistics

## Integration with Claude Code

Add to your Claude Code MCP configuration (`~/.claude/mcp.json`):

```json
{
  "mcpServers": {
    "persistq": {
      "command": "node",
      "args": ["D:/Projects/MemoryHub-Monorepo/mcp-server/pq-mcp-server.js"],
      "env": {
        "PERSISTQ_URL": "http://localhost:3000",
        "PERSISTQ_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Architecture

```
Claude Code / AI Tool
    ↓
MCP Protocol (stdio)
    ↓
pq-mcp-server.js
    ↓
HTTP → PersistQ Server (port 3000)
    ↓
Database Storage
```

## Requirements

- Node.js 16+
- PersistQ HTTP server running on port 3000

## License

MIT
