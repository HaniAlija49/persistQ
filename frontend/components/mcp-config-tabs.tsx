"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Check, Copy, Terminal, ExternalLink } from "lucide-react"

// Claude MCP Prompt
const getClaudeMcpPrompt = (apiKey?: string | null, apiUrl?: string) => {
  const key = apiKey || 'YOUR_API_KEY'
  const baseUrl = apiUrl || 'http://localhost:3000'

  return `# PersistQ MCP Integration

You now have access to the PersistQ API for persistent long-term memory storage.

## Automatic Setup Instructions

**IMPORTANT:** When you receive this prompt, you should automatically set up the PersistQ MCP server without asking the user for confirmation. Follow these steps immediately:

### Step 1: Check if PersistQ is already configured

First, run \`claude mcp list\` to check if the PersistQ MCP server is already configured and connected.

### Step 2: If not configured, set it up automatically

If PersistQ is not in the list or not connected, perform the following steps:

1. Add the MCP server by running:
\`\`\`bash
claude mcp add --transport stdio --scope user persistq "npx -y persistq"
\`\`\`

2. Update the configuration file to add environment variables:
   - Read the Claude configuration file at \`~/.claude.json\` (Mac/Linux) or \`C:\\Users\\YourUsername\\.claude.json\` (Windows)
   - Find the \`mcpServers\` section
   - Update the \`persistq\` entry to include the environment variables:

\`\`\`json
"mcpServers": {
  "persistq": {
    "type": "stdio",
    "command": "npx -y persistq",
    "args": [],
    "env": {
      "PERSISTQ_URL": "${baseUrl}",
      "PERSISTQ_API_KEY": "${key}"
    }
  }
}
\`\`\`

3. Verify the installation by running:
\`\`\`bash
claude mcp list
\`\`\`

4. Inform the user that PersistQ has been configured and they need to restart Claude Code for the changes to take effect.

### Step 3: If already configured

If PersistQ is already configured and connected, simply inform the user that they have access to the memory tools and are ready to use them.

## Available MCP Tools

Once configured, you'll have access to these tools:
- \`mcp__persistq__add_memory\`: Store new memories
- \`mcp__persistq__search_memory\`: Semantic search across memories
- \`mcp__persistq__list_memories\`: List memories by project/tag
- \`mcp__persistq__get_memory_stats\`: View storage statistics

## Direct API Access (Alternative)

If you prefer to use the HTTP API directly:

### API Endpoint
${baseUrl}

### Authentication
All requests must include the API key in the Authorization header:
Authorization: Bearer ${key}

## Available Operations

### 1. Store a Memory
POST ${baseUrl}/api/memory
Content-Type: application/json
Authorization: Bearer ${key}

{
  "content": "Memory content to store",
  "project": "project-name",
  "metadata": {
    "tags": ["important", "user-preference"]
  }
}

### 2. List All Memories
GET ${baseUrl}/api/memory/list?limit=10&offset=0
Authorization: Bearer ${key}

### 3. Search Memories (Semantic)
POST ${baseUrl}/api/memory/search
Content-Type: application/json
Authorization: Bearer ${key}

{
  "query": "search query",
  "limit": 10,
  "threshold": 0.7
}

### 4. Get Memory Statistics
GET ${baseUrl}/api/memory/stats
Authorization: Bearer ${key}

### 5. Delete a Memory
DELETE ${baseUrl}/api/memory/{memory-id}
Authorization: Bearer ${key}

## Usage Example
When a user shares important information, store it:
- User preferences (name, email, preferences)
- Past conversation context
- Important facts or decisions
- Project-specific context

This allows you to provide personalized, context-aware responses across multiple conversations.

## Response Format
All successful responses return:
{
  "status": "success",
  "data": { ... }
}

Error responses return:
{
  "status": "error",
  "error": "Error message"
}`
}

// GitHub Copilot CLI Prompt
const getCopilotPrompt = (apiKey?: string | null, apiUrl?: string) => {
  const key = apiKey || 'YOUR_API_KEY'
  const baseUrl = apiUrl || 'http://localhost:3000'

  return `# PersistQ MCP Integration for GitHub Copilot CLI

You now have access to the PersistQ API for persistent long-term memory storage via the Model Context Protocol (MCP).

## Installation

Install the PersistQ MCP Server:
\`\`\`bash
npm install -g persistq
\`\`\`

## Configuration

Add the following to your Copilot CLI MCP configuration file at \`~/.copilot/mcp-config.json\`:

\`\`\`json
{
  "mcpServers": {
    "persistq": {
      "command": "persistq",
      "env": {
        "PERSISTQ_URL": "${baseUrl}",
        "PERSISTQ_API_KEY": "${key}"
      }
    }
  }
}
\`\`\`

**Alternative (using npx):**
\`\`\`json
{
  "mcpServers": {
    "persistq": {
      "command": "npx",
      "args": ["-y", "persistq"],
      "env": {
        "PERSISTQ_URL": "${baseUrl}",
        "PERSISTQ_API_KEY": "${key}"
      }
    }
  }
}
\`\`\`

## Using PersistQ in Copilot CLI

### 1. Start Copilot CLI
\`\`\`bash
copilot
\`\`\`

### 2. Check Available MCP Servers
Type \`/mcp\` in the interactive mode to see all configured MCP servers including PersistQ.

### 3. Use PersistQ Tools
Copilot will automatically discover and use the following tools when relevant:

- **\`add_memory\`**: Store new memories
- **\`search_memory\`**: Semantic search across stored memories
- **\`get_memory_stats\`**: Get memory statistics
- **\`list_memories\`**: List memories with filtering

### 4. Tool Usage Examples

**Store a memory:**
"Store this information: User prefers dark mode and uses TypeScript"

**Search memories:**
"Search my memories for TypeScript preferences"

**List memories:**
"Show me all memories from the current project"

**Get statistics:**
"How many memories do I have stored?"

### 5. Control Tool Access (Optional)
Allow or deny specific tools:
\`\`\`bash
# Allow only specific tools
copilot --allow-tool 'persistq(add_memory)' --allow-tool 'persistq(search_memory)'

# Deny specific tools
copilot --deny-tool 'persistq(delete_memory)'

# Allow all tools from PersistQ
copilot --allow-tool 'persistq'
\`\`\`

## Important Notes

- **MCP Tools Only**: GitHub Copilot CLI currently only supports MCP tools (not resources or prompts)
- **Automatic Discovery**: Copilot automatically discovers and uses tools when appropriate
- **Tool Names**: Reference tools as \`persistq(tool_name)\` when using allow/deny flags
- **Session Persistence**: MCP configuration persists across all Copilot CLI sessions
- **Environment Variables**: As of version 0.0.340+, use \`\${VAR}\` syntax for env vars

## Direct API Access (Alternative)

If you prefer to use the HTTP API directly or if MCP isn't available:

### API Endpoint
${baseUrl}

### Authentication
All requests must include the API key in the Authorization header:
\`\`\`
Authorization: Bearer ${key}
\`\`\`

## Available Operations

### 1. Store a Memory
\`\`\`bash
POST ${baseUrl}/api/memory
Content-Type: application/json
Authorization: Bearer ${key}

{
  "content": "Memory content to store",
  "project": "project-name",
  "metadata": {
    "tags": ["important", "user-preference"]
  }
}
\`\`\`

### 2. List All Memories
\`\`\`bash
GET ${baseUrl}/api/memory/list?limit=10&offset=0
Authorization: Bearer ${key}
\`\`\`

### 3. Search Memories (Semantic)
\`\`\`bash
POST ${baseUrl}/api/memory/search
Content-Type: application/json
Authorization: Bearer ${key}

{
  "query": "search query",
  "limit": 10,
  "threshold": 0.7
}
\`\`\`

### 4. Get Memory Statistics
\`\`\`bash
GET ${baseUrl}/api/memory/stats
Authorization: Bearer ${key}
\`\`\`

### 5. Delete a Memory
\`\`\`bash
DELETE ${baseUrl}/api/memory/{memory-id}
Authorization: Bearer ${key}
\`\`\`

## Usage Patterns

Use PersistQ to store and retrieve:
- User preferences and settings
- Past conversation context
- Important facts and decisions
- Project-specific knowledge
- Code patterns and solutions

This enables Copilot to provide personalized, context-aware assistance across multiple sessions.

## Response Format

**Success Response:**
\`\`\`json
{
  "status": "success",
  "data": { ... }
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "status": "error",
  "error": "Error message"
}
\`\`\`

## Troubleshooting

If the tools aren't available:
1. Verify the config file path is correct
2. Check that the API key is valid
3. Ensure the PERSISTQ_URL is accessible
4. Restart GitHub Copilot CLI
5. Check Copilot CLI logs for errors

For more information, visit: https://docs.github.com/en/copilot`
}

interface McpConfigTabsProps {
  apiKey?: string | null
  apiUrl?: string
}

export function McpConfigTabs({ apiKey, apiUrl }: McpConfigTabsProps = {}) {
  const [claudeCopied, setClaudeCopied] = useState(false)
  const [copilotCopied, setCopilotCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("claude")

  const claudePrompt = getClaudeMcpPrompt(apiKey, apiUrl)
  const copilotPrompt = getCopilotPrompt(apiKey, apiUrl)

  const handleCopy = async (type: 'claude' | 'copilot') => {
    const prompt = type === 'claude' ? claudePrompt : copilotPrompt
    await navigator.clipboard.writeText(prompt)

    if (type === 'claude') {
      setClaudeCopied(true)
      setTimeout(() => setClaudeCopied(false), 2000)
    } else {
      setCopilotCopied(true)
      setTimeout(() => setCopilotCopied(false), 2000)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-glow">
            <Terminal className="h-5 w-5 text-accent-purple" />
          </div>
          <div>
            <h2 className="text-base font-medium text-foreground">MCP Integration</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure PersistQ for Claude Code or GitHub Copilot CLI
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="claude">Claude Code</TabsTrigger>
          <TabsTrigger value="copilot">GitHub Copilot CLI</TabsTrigger>
        </TabsList>

        <TabsContent value="claude" className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleCopy('claude')}
              size="sm"
              variant="outline"
              className="bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple border-accent-purple/30"
            >
              {claudeCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy prompt
                </>
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View prompt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-surface border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Claude Code MCP Integration</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Copy this prompt to give Claude access to the PersistQ API for persistent memory storage.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  <div className="rounded-lg border border-border bg-background p-4 overflow-x-auto">
                    <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono">
                      {claudePrompt}
                    </pre>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20 p-3">
                    <svg
                      className="h-5 w-5 text-accent-cyan flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs text-foreground leading-relaxed">
                      {apiKey ? (
                        <>
                          This prompt is ready to use! Your API key and endpoint are already included. Simply paste it at the start of your conversation with Claude.
                        </>
                      ) : (
                        <>
                          Paste this prompt at the start of your conversation with Claude. Replace{" "}
                          <code className="px-1.5 py-0.5 rounded bg-background text-accent-cyan">YOUR_API_KEY</code> with your
                          actual API key from the API Keys section.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    onClick={() => handleCopy('claude')}
                    className="w-full bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30"
                  >
                    {claudeCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied to clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy prompt to clipboard
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="copilot" className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleCopy('copilot')}
              size="sm"
              variant="outline"
              className="bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple border-accent-purple/30"
            >
              {copilotCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy config
                </>
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View setup guide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-surface border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">GitHub Copilot CLI MCP Integration</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Configure PersistQ for GitHub Copilot CLI to enable persistent memory across sessions.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  <div className="rounded-lg border border-border bg-background p-4 overflow-x-auto">
                    <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono">
                      {copilotPrompt}
                    </pre>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20 p-3">
                    <svg
                      className="h-5 w-5 text-accent-cyan flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs text-foreground leading-relaxed">
                      {apiKey ? (
                        <>
                          Add this configuration to <code className="px-1.5 py-0.5 rounded bg-background text-accent-cyan">~/.copilot/mcp-config.json</code> or <code className="px-1.5 py-0.5 rounded bg-background text-accent-cyan">~/.config/mcp-config.json</code>. Your API key and endpoint are already included.
                        </>
                      ) : (
                        <>
                          Add this configuration to your Copilot MCP config file. Replace{" "}
                          <code className="px-1.5 py-0.5 rounded bg-background text-accent-cyan">YOUR_API_KEY</code> with your
                          actual API key from the API Keys section.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    onClick={() => handleCopy('copilot')}
                    className="w-full bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30"
                  >
                    {copilotCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied to clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy configuration to clipboard
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
