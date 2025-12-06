"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Database, Copy, Check, Code2, Cpu, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function SDKPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyCode = (code: string, section: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">PersistQ</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-accent-cyan hover:bg-accent-cyan/90 text-black">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/docs" className="hover:text-foreground">
              Docs
            </Link>
            <span>/</span>
            <span className="text-foreground">SDK & Integrations</span>
          </div>

          {/* Content */}
          <article className="space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">SDK & Integrations</h1>
              <p className="text-xl text-muted-foreground">
                Complete guide to integrating PersistQ with your applications and AI tools
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5">
                <div className="w-12 h-12 rounded-lg bg-accent-cyan/20 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-accent-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-2">TypeScript SDK</h3>
                <p className="text-muted-foreground mb-4">Direct HTTP API client for web apps, Node.js, and serverless</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                    <span>Zero runtime dependencies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                    <span>Full TypeScript support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                    <span>Works everywhere (Node.js 18+, browsers)</span>
                  </div>
                </div>
                <code className="block mt-4 text-sm bg-background px-3 py-2 rounded">npm install persistq-sdk</code>
              </div>

              <div className="p-8 rounded-lg border border-accent-purple/30 bg-accent-purple/5">
                <div className="w-12 h-12 rounded-lg bg-accent-purple/20 flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-accent-purple" />
                </div>
                <h3 className="text-2xl font-bold mb-2">MCP Server</h3>
                <p className="text-muted-foreground mb-4">Model Context Protocol integration for AI tools</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-purple" />
                    <span>Claude Code integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-purple" />
                    <span>GitHub Copilot CLI support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-purple" />
                    <span>MCP-compatible tools</span>
                  </div>
                </div>
                <code className="block mt-4 text-sm bg-background px-3 py-2 rounded">npm install -g persistq</code>
              </div>
            </div>

            {/* TypeScript SDK Section */}
            <div id="typescript-sdk" className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-accent-cyan" />
                </div>
                <h2 className="text-3xl font-bold">TypeScript SDK</h2>
              </div>

              <div className="p-4 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5">
                <p className="text-sm">
                  <strong className="text-accent-cyan">Package:</strong> <code className="bg-background px-2 py-1 rounded ml-2">persistq-sdk@1.0.0</code>
                </p>
                <p className="text-sm mt-2">
                  <strong className="text-accent-cyan">npm:</strong>{" "}
                  <a href="https://www.npmjs.com/package/persistq-sdk" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline ml-2">
                    npmjs.com/package/persistq-sdk
                  </a>
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Installation</h3>
              <div className="rounded-lg border border-border bg-surface p-4 mb-6 relative group">
                <button
                  onClick={() => copyCode("npm install persistq-sdk", "sdk-install")}
                  className="absolute top-4 right-4 p-2 rounded hover:bg-background transition-colors"
                >
                  {copiedSection === "sdk-install" ? (
                    <Check className="w-4 h-4 text-accent-cyan" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <pre className="text-sm overflow-x-auto">
                  <code>npm install persistq-sdk</code>
                </pre>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Quick Example</h3>
              <div className="rounded-lg border border-border bg-surface p-4 mb-6 relative group">
                <button
                  onClick={() =>
                    copyCode(
                      `import { createClient } from 'persistq-sdk'

const client = createClient({
  baseUrl: 'https://memoryhub-cloud.onrender.com',
  apiKey: process.env.PERSISTQ_API_KEY,
})

// Create a memory
await client.createMemory('User prefers dark mode', 'preferences')

// Search memories
const results = await client.searchMemories('dark mode preferences', {
  limit: 5,
})`,
                      "sdk-example",
                    )
                  }
                  className="absolute top-4 right-4 p-2 rounded hover:bg-background transition-colors"
                >
                  {copiedSection === "sdk-example" ? (
                    <Check className="w-4 h-4 text-accent-cyan" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { createClient } from 'persistq-sdk'

const client = createClient({
  baseUrl: 'https://memoryhub-cloud.onrender.com',
  apiKey: process.env.PERSISTQ_API_KEY,
})

// Create a memory
await client.createMemory('User prefers dark mode', 'preferences')

// Search memories
const results = await client.searchMemories('dark mode preferences', {
  limit: 5,
})`}</code>
                </pre>
              </div>

              <div className="p-4 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-3">Use Cases</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Next.js/React applications</li>
                  <li>• Node.js backend services</li>
                  <li>• Serverless functions (AWS Lambda, Vercel, Cloudflare Workers)</li>
                  <li>• Express.js/Fastify API servers</li>
                  <li>• Browser-based applications</li>
                </ul>
              </div>
            </div>

            {/* MCP Server Section */}
            <div id="mcp-server" className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-accent-purple" />
                </div>
                <h2 className="text-3xl font-bold">MCP Server</h2>
              </div>

              <div className="p-4 rounded-lg border border-accent-purple/30 bg-accent-purple/5">
                <p className="text-sm">
                  <strong className="text-accent-purple">Package:</strong> <code className="bg-background px-2 py-1 rounded ml-2">persistq@1.1.0</code>
                </p>
                <p className="text-sm mt-2">
                  <strong className="text-accent-purple">npm:</strong>{" "}
                  <a href="https://www.npmjs.com/package/persistq" target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:underline ml-2">
                    npmjs.com/package/persistq
                  </a>
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">What is MCP?</h3>
              <p className="text-muted-foreground mb-6">
                Model Context Protocol (MCP) is a standard protocol that allows AI assistants like Claude Code and GitHub Copilot to connect to external tools and data sources. The PersistQ MCP server acts as a bridge between these AI tools and your persistent memory storage.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Supported AI Tools</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <h4 className="font-semibold mb-2 text-accent-cyan">Claude Code</h4>
                  <p className="text-sm text-muted-foreground mb-3">Full MCP support with tools and resources</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>✓ 4 MCP tools</li>
                    <li>✓ 2 MCP resources</li>
                    <li>✓ Automatic detection</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <h4 className="font-semibold mb-2 text-accent-purple">GitHub Copilot CLI</h4>
                  <p className="text-sm text-muted-foreground mb-3">MCP tools support (resources not available)</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>✓ 4 MCP tools</li>
                    <li>✗ Resources (limitation)</li>
                    <li>✓ Natural language usage</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Installation</h3>
              <div className="rounded-lg border border-border bg-surface p-4 mb-6 relative group">
                <button
                  onClick={() => copyCode("npm install -g persistq", "mcp-install")}
                  className="absolute top-4 right-4 p-2 rounded hover:bg-background transition-colors"
                >
                  {copiedSection === "mcp-install" ? (
                    <Check className="w-4 h-4 text-accent-cyan" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <pre className="text-sm overflow-x-auto">
                  <code>npm install -g persistq</code>
                </pre>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Setup: Claude Code</h3>
              <p className="text-muted-foreground mb-4">
                Add to your <code className="bg-background px-2 py-1 rounded text-xs">~/.claude/mcp.json</code>:
              </p>
              <div className="rounded-lg border border-border bg-surface p-4 mb-6 relative group">
                <button
                  onClick={() =>
                    copyCode(
                      `{
  "mcpServers": {
    "persistq": {
      "command": "persistq",
      "env": {
        "PERSISTQ_URL": "https://memoryhub-cloud.onrender.com",
        "PERSISTQ_API_KEY": "your-api-key-here"
      }
    }
  }
}`,
                      "claude-setup",
                    )
                  }
                  className="absolute top-4 right-4 p-2 rounded hover:bg-background transition-colors"
                >
                  {copiedSection === "claude-setup" ? (
                    <Check className="w-4 h-4 text-accent-cyan" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <pre className="text-sm overflow-x-auto">
                  <code>{`{
  "mcpServers": {
    "persistq": {
      "command": "persistq",
      "env": {
        "PERSISTQ_URL": "https://memoryhub-cloud.onrender.com",
        "PERSISTQ_API_KEY": "your-api-key-here"
      }
    }
  }
}`}</code>
                </pre>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Setup: GitHub Copilot CLI</h3>
              <p className="text-muted-foreground mb-4">
                Add to <code className="bg-background px-2 py-1 rounded text-xs">~/.copilot/mcp-config.json</code>:
              </p>
              <div className="rounded-lg border border-border bg-surface p-4 mb-6 relative group">
                <button
                  onClick={() =>
                    copyCode(
                      `{
  "mcpServers": {
    "persistq": {
      "command": "persistq",
      "env": {
        "PERSISTQ_URL": "https://memoryhub-cloud.onrender.com",
        "PERSISTQ_API_KEY": "\${PERSISTQ_API_KEY}"
      }
    }
  }
}`,
                      "copilot-setup",
                    )
                  }
                  className="absolute top-4 right-4 p-2 rounded hover:bg-background transition-colors"
                >
                  {copiedSection === "copilot-setup" ? (
                    <Check className="w-4 h-4 text-accent-cyan" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <pre className="text-sm overflow-x-auto">
                  <code>{`{
  "mcpServers": {
    "persistq": {
      "command": "persistq",
      "env": {
        "PERSISTQ_URL": "https://memoryhub-cloud.onrender.com",
        "PERSISTQ_API_KEY": "\${PERSISTQ_API_KEY}"
      }
    }
  }
}`}</code>
                </pre>
              </div>

              <div className="p-4 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5">
                <h4 className="font-semibold mb-2 text-accent-cyan">Alternative: Using npx</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  If you prefer not to install globally, use npx:
                </p>
                <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
                  <code>{`{
  "mcpServers": {
    "persistq": {
      "command": "npx",
      "args": ["-y", "persistq"],
      "env": { ... }
    }
  }
}`}</code>
                </pre>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Available MCP Tools</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <h4 className="font-semibold mb-2">add_memory</h4>
                  <p className="text-sm text-muted-foreground mb-2">Store a new memory with content, topic, and metadata</p>
                  <code className="text-xs bg-background px-2 py-1 rounded">Parameters: text (required), topic, metadata</code>
                </div>
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <h4 className="font-semibold mb-2">search_memory</h4>
                  <p className="text-sm text-muted-foreground mb-2">Semantic search across stored memories</p>
                  <code className="text-xs bg-background px-2 py-1 rounded">Parameters: query (required), topic, limit</code>
                </div>
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <h4 className="font-semibold mb-2">get_memory_stats</h4>
                  <p className="text-sm text-muted-foreground mb-2">Get statistics about stored memories</p>
                  <code className="text-xs bg-background px-2 py-1 rounded">Parameters: none</code>
                </div>
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <h4 className="font-semibold mb-2">list_memories</h4>
                  <p className="text-sm text-muted-foreground mb-2">List memories with optional filtering and pagination</p>
                  <code className="text-xs bg-background px-2 py-1 rounded">Parameters: project, limit, offset</code>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Usage Examples</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Claude Code:</strong>
                  </p>
                  <p className="text-sm italic">"Store this information: User prefers TypeScript and uses Next.js"</p>
                  <p className="text-sm italic mt-2">"What do you remember about my tech stack preferences?"</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-surface">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>GitHub Copilot CLI:</strong>
                  </p>
                  <code className="text-xs">copilot "remember that I prefer functional programming"</code>
                  <br />
                  <code className="text-xs mt-2 block">copilot "what programming style do I use?"</code>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div id="comparison" className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">SDK vs MCP: When to Use What?</h2>
              <div className="overflow-x-auto">
                <table className="w-full rounded-lg border border-border">
                  <thead className="bg-surface">
                    <tr>
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-left p-4 font-semibold text-accent-cyan">TypeScript SDK</th>
                      <th className="text-left p-4 font-semibold text-accent-purple">MCP Server</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-border">
                      <td className="p-4">Use Case</td>
                      <td className="p-4">Direct API integration</td>
                      <td className="p-4">AI tool integration</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">Target Users</td>
                      <td className="p-4">Developers building apps</td>
                      <td className="p-4">AI tool users (Claude, Copilot)</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">Installation</td>
                      <td className="p-4"><code>npm install persistq-sdk</code></td>
                      <td className="p-4"><code>npm install -g persistq</code></td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">TypeScript Support</td>
                      <td className="p-4">✓ Full types included</td>
                      <td className="p-4">N/A (CLI tool)</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">Runtime</td>
                      <td className="p-4">Node.js 18+, browsers</td>
                      <td className="p-4">Node.js 16+</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">Bundle Size</td>
                      <td className="p-4">10.7 KB gzipped</td>
                      <td className="p-4">~9 KB (standalone)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Next Steps */}
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <Link
                href="/docs/getting-started"
                className="p-6 rounded-lg border border-border bg-surface hover:border-accent-cyan transition-colors"
              >
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-sm text-muted-foreground">Quick start guide and first API call</p>
              </Link>
              <Link
                href="/docs/api-reference"
                className="p-6 rounded-lg border border-border bg-surface hover:border-accent-purple transition-colors"
              >
                <h3 className="font-semibold mb-2">API Reference</h3>
                <p className="text-sm text-muted-foreground">Complete API documentation</p>
              </Link>
              <Link
                href="/docs/examples"
                className="p-6 rounded-lg border border-border bg-surface hover:border-accent-cyan transition-colors"
              >
                <h3 className="font-semibold mb-2">Code Examples</h3>
                <p className="text-sm text-muted-foreground">Ready-to-use code snippets</p>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
