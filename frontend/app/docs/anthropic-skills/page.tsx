import { Metadata } from 'next'
import { SharedHeader } from '@/components/shared-header'
import Link from 'next/link'
import { ArrowRight, Brain, BookOpen, Code2, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Using PersistQ with Skills (Anthropic) | PersistQ',
  description: 'Learn how to integrate PersistQ memory storage with Anthropic Skills for intelligent memory management.',
}

export default function AnthropicSkillsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader activeLink="docs" />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-accent-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Make Your Claude Skills Remember</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Give your Anthropic Skills persistent memory. Enable them to recall user preferences, learn from past interactions, and provide increasingly personalized assistance across sessions.
          </p>

          {/* TL;DR Box */}
          <div className="p-6 rounded-lg bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 border border-accent-purple/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-accent-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">In 60 seconds:</h3>
                <p className="text-muted-foreground">
                  PersistQ gives your Claude Skills persistent memory. Your Skills can remember user preferences, past conversations, and learn from interactions - making them smarter over time. Works seamlessly with Claude.ai, Claude Code, and the Claude API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution - Why Skills Need Memory */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why Skills Need Memory</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Anthropic Skills are modular folders of instructions that Claude loads dynamically. They're powerful, but stateless - each invocation starts fresh.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Without Memory */}
            <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Without Memory
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 flex-shrink-0">•</span>
                  <span>Claude forgets your coding style every session</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 flex-shrink-0">•</span>
                  <span>Customer support restarts context each time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 flex-shrink-0">•</span>
                  <span>You repeat preferences and requirements constantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 flex-shrink-0">•</span>
                  <span>Skills can't learn from past mistakes or feedback</span>
                </li>
              </ul>
            </div>

            {/* With PersistQ Memory */}
            <div className="p-6 rounded-lg border border-green-500/20 bg-green-500/5">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                With PersistQ Memory
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0">•</span>
                  <span>Remembers you prefer functional React, no semicolons</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0">•</span>
                  <span>Recalls past issues and provides faster resolutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0">•</span>
                  <span>Learns your preferences once, applies them forever</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 flex-shrink-0">•</span>
                  <span>Improves continuously from every interaction</span>
                </li>
              </ul>
            </div>
          </div>

          {/* What are Skills - Condensed */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border bg-surface">
              <h3 className="text-xl font-semibold mb-4 text-accent-purple">Anthropic Skills</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
                  <span>Folders with SKILL.md instructions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
                  <span>Loaded dynamically when needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
                  <span>Work across Claude.ai, Code, and API</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-border bg-surface">
              <h3 className="text-xl font-semibold mb-4 text-accent-cyan">+ PersistQ Memory</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                  <span>Persistent context across sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                  <span>Learn from user interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                  <span>Personalized, improving responses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* See It In Action - Customer Support Example */}
      <section className="container mx-auto px-4 pb-16" id="example">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">See It In Action</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Here's how a Customer Support Skill uses PersistQ to remember user context and provide better service:
          </p>

          {/* Example Scenario */}
          <div className="p-8 rounded-lg border border-accent-purple/20 bg-gradient-to-br from-accent-purple/5 to-accent-cyan/5 mb-8">
            <h3 className="text-xl font-semibold mb-6">Example Scenario</h3>

            <div className="space-y-6">
              {/* First Interaction */}
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent-purple/20 text-sm font-semibold mb-3">
                  First Interaction - Monday
                </div>
                <div className="bg-background/50 rounded-lg p-4 mb-3">
                  <p className="text-sm font-semibold mb-2">User:</p>
                  <p className="text-muted-foreground">"I'm having trouble logging in with 2FA"</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">Skill Process:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Searches for user history (none found - new user)</li>
                    <li>• Helps troubleshoot 2FA issue</li>
                    <li>• <strong>Stores:</strong> User prefers step-by-step instructions, had 2FA problems</li>
                  </ul>
                </div>
              </div>

              {/* Second Interaction */}
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent-cyan/20 text-sm font-semibold mb-3">
                  Second Interaction - Friday (Same Week)
                </div>
                <div className="bg-background/50 rounded-lg p-4 mb-3">
                  <p className="text-sm font-semibold mb-2">User:</p>
                  <p className="text-muted-foreground">"I'm locked out again"</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">Skill Process:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Recalls:</strong> User had 2FA issues before, prefers detailed steps</li>
                    <li>• Immediately provides targeted 2FA troubleshooting with step-by-step guide</li>
                    <li>• <strong>Updates:</strong> This is a recurring issue, may need account review</li>
                  </ul>
                </div>
              </div>

              {/* Third Interaction */}
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-sm font-semibold mb-3">
                  Third Interaction - Next Month
                </div>
                <div className="bg-background/50 rounded-lg p-4 mb-3">
                  <p className="text-sm font-semibold mb-2">User:</p>
                  <p className="text-muted-foreground">"How do I update my billing info?"</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">Skill Process:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Remembers:</strong> User's communication style preference (step-by-step)</li>
                    <li>• Provides billing update guide in familiar detailed format</li>
                    <li>• No need to re-establish preferences or context</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-semibold mb-2">Result:</p>
              <p className="text-sm text-muted-foreground">
                Faster resolutions, personalized communication style, and proactive issue detection - all without the user repeating themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="container mx-auto px-4 pb-16" id="quick-start">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Quick Start: Get Running in 5 Minutes</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-purple text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Get Your API Key</h3>
                <p className="text-muted-foreground mb-3">Sign up at PersistQ and grab your API key from the dashboard</p>
                <div className="bg-muted rounded-lg p-4">
                  <code className="text-sm">export PERSISTQ_API_KEY="your-api-key-here"</code>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-purple text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Choose Your Integration Method</h3>
                <p className="text-muted-foreground mb-3">Two approaches - pick what works for you:</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border bg-surface">
                    <h4 className="font-semibold mb-2">MCP Server (Recommended)</h4>
                    <p className="text-sm text-muted-foreground mb-3">Best for Claude Desktop integration</p>
                    <ul className="text-sm space-y-1">
                      <li>✓ Automatic tool exposure</li>
                      <li>✓ Standardized interface</li>
                      <li>✓ Better security</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-surface">
                    <h4 className="font-semibold mb-2">Direct API</h4>
                    <p className="text-sm text-muted-foreground mb-3">Best for custom scripts & workflows</p>
                    <ul className="text-sm space-y-1">
                      <li>✓ Full control</li>
                      <li>✓ Simple HTTP calls</li>
                      <li>✓ Any language</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-purple text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Create Your First Memory-Enabled Skill</h3>
                <p className="text-muted-foreground mb-3">Add memory operations to your SKILL.md:</p>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`---
name: my-memory-skill
description: A skill that remembers user preferences
---

# My Memory Skill

Before responding, search for user context:
- Use search_memory() to find past interactions
- Use add_memory() to store new learnings
- Use list_memories() to review recent history`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-cyan text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Test It Out</h3>
                <p className="text-muted-foreground">Load your skill in Claude and watch it remember across conversations!</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-lg bg-accent-purple/5 border border-accent-purple/20">
            <p className="text-sm">
              <strong>Need more details?</strong> Jump to <a href="#mcp-integration" className="text-accent-purple hover:underline">MCP Integration</a> or <a href="#api-integration" className="text-accent-cyan hover:underline">Direct API Integration</a> sections below for complete setup instructions.
            </p>
          </div>
        </div>
      </section>

      {/* MCP Integration Pattern */}
      <section className="container mx-auto px-4 pb-16" id="mcp-integration">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">MCP Integration (Recommended)</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The Model Context Protocol (MCP) approach exposes PersistQ as tool calls that Claude can use automatically. This is the cleanest and most maintainable integration method.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">1. Install PersistQ MCP Package</h3>
              <p className="text-muted-foreground mb-4">
                Use our ready-to-use MCP server package - no need to build from scratch:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <pre className="text-sm overflow-x-auto">
                  {`# Install our MCP server package
npm install @persistq/mcp-server

# Or using yarn
yarn add @persistq/mcp-server`}
                </pre>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20">
                <p className="text-sm">
                  <strong>📦 Complete package includes:</strong> Pre-built MCP server with all PersistQ tools, automatic tool exposure, and ready-to-use configuration templates.
                </p>
              </div>
            </div>
          </div>
        </div>
<section className="container mx-auto px-4 pb-16" id="Claude desktop"></section>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">2. Configure Claude Desktop</h3>
          <p className="text-muted-foreground mb-4">
            Add the MCP server to your Claude configuration:
          </p>
          <div className="bg-muted rounded-lg p-6">
            <pre className="text-sm overflow-x-auto">
              {`// claude_desktop_config.json
{
  "mcpServers": {
    "persistq-memory": {
      "command": "npx",
      "args": ["@persistq/mcp-server"],
      "env": {
        "PERSISTQ_API_KEY": "your-api-key-here"
      }
    }
  }
}`}
            </pre>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-accent-purple/5 border border-accent-purple/20">
            <p className="text-sm">
              <strong>💡 Pro tip:</strong> Using <code className="bg-muted px-2 py-0.5 rounded">npx</code> means you don't need to download or manage the server file - it runs directly from npm!
            </p>
          </div>
        </div>
        <br />
        <div className="max-w-4xl mx-auto">
          <div>
          <h3 className="text-2xl font-semibold mb-4">3. Create Your Skill</h3>
          <p className="text-muted-foreground mb-4">
            Write a SKILL.md that instructs Claude when and how to use the memory tools:
          </p>
          <div className="bg-muted rounded-lg p-6">
            <pre className="text-sm overflow-x-auto">
              {`---
name: memory-assistant
description: Assistant with persistent memory across conversations
---

# Memory-Enhanced Assistant

## Memory Strategy

Before responding to any user request:
1. **Search** for relevant past interactions using search_memory()
2. **Consider** user preferences and context from memory
3. **Respond** with personalized, context-aware assistance
4. **Store** new learnings using add_memory()

## Example Usage

When user asks for coding help:
- Search for their coding style preferences
- Recall past projects and challenges
- Provide targeted assistance
- Store the interaction for next time

## Memory Categories

- user_preferences: Communication style, coding preferences
- learning_progress: Skills learned, topics covered
- project_context: Current projects, recurring patterns`}
            </pre>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-green-500/5 border border-green-500/20 mt-8">
          <h4 className="font-semibold mb-3">That's it!</h4>
          <p className="text-sm text-muted-foreground">
            When you load this skill in Claude, it will automatically have access to the PersistQ memory tools and will use them according to your instructions. Claude knows when to search, store, and recall information based on your skill's guidance.
          </p>
        </div>
        </div>
      </section >

    {/* Direct API Integration */ }
    < section className = "container mx-auto px-4 pb-16" id = "api-integration" >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Direct API Integration</h2>
        <p className="text-lg text-muted-foreground mb-8">
          For custom scripts, workflows, or non-Claude environments, use the PersistQ API directly.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Install PersistQ SDK</h3>
            <p className="text-muted-foreground mb-4">
              Use our official SDKs for direct API integration:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">JavaScript/TypeScript</h4>
                <pre className="text-sm overflow-x-auto">
                  {`npm install @persistq/sdk
# or
yarn add @persistq/sdk`}
                </pre>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">Python</h4>
                <pre className="text-sm overflow-x-auto">
                  {`pip install persistq
# or
pip3 install persistq`}
                </pre>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <pre className="text-sm overflow-x-auto">
                {`// JavaScript/TypeScript Example
import { PersistQClient } from '@persistq/sdk';

const client = new PersistQClient({
  apiKey: process.env.PERSISTQ_API_KEY
});

// Store a memory
await client.addMemory({
  text: "User prefers TypeScript over JavaScript",
  topic: "preferences",
  metadata: { user_id: "user_123" }
});

// Search memories
const results = await client.searchMemory({
  query: "TypeScript preferences",
  topic: "preferences"
});`}
              </pre>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-accent-purple/5 border border-accent-purple/20">
            <p className="text-sm">
              <strong>Full SDK documentation:</strong> Check our <a href="/docs/api-reference" className="text-accent-purple hover:underline">API Reference</a> for Python, Go, and other language examples.
            </p>
          </div>
        </div>

      </div>
      </section >

    {/* Best Practices */ }
    < section className = "container mx-auto px-4 pb-16" id = "best-practices" >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Best Practices</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Organize by Topics */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">📁</span>
              Organize by Topics
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use consistent topic names to categorize memories:
            </p>
            <ul className="text-sm space-y-2">
              <li>• <code className="bg-muted px-2 py-0.5 rounded">user_context</code> - Background, work, experience</li>
              <li>• <code className="bg-muted px-2 py-0.5 rounded">preferences</code> - Communication, coding style</li>
              <li>• <code className="bg-muted px-2 py-0.5 rounded">learning_progress</code> - Skills, topics covered</li>
              <li>• <code className="bg-muted px-2 py-0.5 rounded">problem_patterns</code> - Issues, solutions</li>
            </ul>
          </div>

          {/* Rich Metadata */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🏷️</span>
              Use Rich Metadata
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add structured metadata for better filtering:
            </p>
            <ul className="text-sm space-y-2">
              <li>• <strong>user_id</strong> - Associate with specific users</li>
              <li>• <strong>timestamps</strong> - Track when events occurred</li>
              <li>• <strong>satisfaction</strong> - Rate interaction quality</li>
              <li>• <strong>categories</strong> - Add custom tags</li>
            </ul>
          </div>

          {/* Search Strategically */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              Search Strategically
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Always search before responding:
            </p>
            <ul className="text-sm space-y-2">
              <li>• Check for existing user context first</li>
              <li>• Use topic filters to narrow results</li>
              <li>• Search broadly, then refine</li>
              <li>• Combine multiple searches for full context</li>
            </ul>
          </div>

          {/* Store Specific Memories */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">💾</span>
              Store Specific Memories
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Make memories actionable and clear:
            </p>
            <ul className="text-sm space-y-2">
              <li>• Be specific, not vague</li>
              <li>• Include context and outcomes</li>
              <li>• Store after meaningful interactions</li>
              <li>• Update outdated memories</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-accent-purple/5 border border-accent-purple/20">
          <h4 className="font-semibold mb-3">Memory Lifecycle</h4>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex-shrink-0">1. Search</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="flex-shrink-0">2. Use Context</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="flex-shrink-0">3. Respond</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="flex-shrink-0">4. Store Learnings</span>
          </div>
        </div>
      </div>
      </section >


    {/* Need Help */ }
    < section className = "container mx-auto px-4 pb-24" >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/docs/api-reference" className="p-6 rounded-lg border border-border bg-surface hover:border-accent-purple transition-colors group">
            <Code2 className="w-6 h-6 text-accent-purple mb-3" />
            <h3 className="font-semibold mb-2">API Reference</h3>
            <p className="text-sm text-muted-foreground">Detailed method documentation</p>
          </Link>

          <Link href="/docs/getting-started" className="p-6 rounded-lg border border-border bg-surface hover:border-accent-cyan transition-colors group">
            <BookOpen className="w-6 h-6 text-accent-cyan mb-3" />
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <p className="text-sm text-muted-foreground">Setup instructions and basics</p>
          </Link>

          <div className="p-6 rounded-lg border border-border bg-surface">
            <Lightbulb className="w-6 h-6 text-accent-purple mb-3" />
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="text-sm text-muted-foreground">Contact us for integration questions</p>
          </div>
        </div>
      </div>
      </section >
    </div >
  )
}