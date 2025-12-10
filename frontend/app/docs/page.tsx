"use client"

import Link from "next/link"
import { SharedHeader } from "@/components/shared-header"
import { BookOpen, Code2, Lightbulb, ArrowRight, Terminal, Puzzle, Brain } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader activeLink="docs" />


      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to integrate PersistQ into your AI applications
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <Link
            href="/docs/getting-started"
            className="p-8 rounded-lg border border-border bg-surface hover:border-accent-cyan transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4 group-hover:bg-accent-cyan/20 transition-colors">
              <BookOpen className="w-6 h-6 text-accent-cyan" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Getting Started</h3>
            <p className="text-muted-foreground mb-4">
              Learn the basics and make your first API call in under 5 minutes
            </p>
            <div className="flex items-center gap-2 text-accent-cyan font-medium">
              Start learning
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/docs/typescript-sdk"
            className="p-8 rounded-lg border border-border bg-surface hover:border-accent-purple transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-4 group-hover:bg-accent-purple/20 transition-colors">
              <Terminal className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-2">TypeScript SDK</h3>
            <p className="text-muted-foreground mb-4">
              Official TypeScript/JavaScript SDK for web apps, Node.js, and serverless
            </p>
            <div className="flex items-center gap-2 text-accent-purple font-medium">
              View SDK docs
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/docs/mcp-integration"
            className="p-8 rounded-lg border border-border bg-surface hover:border-accent-cyan transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4 group-hover:bg-accent-cyan/20 transition-colors">
              <Puzzle className="w-6 h-6 text-accent-cyan" />
            </div>
            <h3 className="text-2xl font-bold mb-2">MCP Integration</h3>
            <p className="text-muted-foreground mb-4">
              Integrate with Claude Code and GitHub Copilot CLI via Model Context Protocol
            </p>
            <div className="flex items-center gap-2 text-accent-cyan font-medium">
              Setup MCP
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/docs/anthropic-skills"
            className="p-8 rounded-lg border border-border bg-surface hover:border-accent-purple transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-4 group-hover:bg-accent-purple/20 transition-colors">
              <Brain className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Anthropic Skills</h3>
            <p className="text-muted-foreground mb-4">
              Use PersistQ as the memory layer for Anthropic Skills with intelligent storage and recall
            </p>
            <div className="flex items-center gap-2 text-accent-purple font-medium">
              Learn Skills integration
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/docs/api-reference"
            className="p-8 rounded-lg border border-border bg-surface hover:border-accent-purple transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-4 group-hover:bg-accent-purple/20 transition-colors">
              <Code2 className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-2">API Reference</h3>
            <p className="text-muted-foreground mb-4">
              Complete reference for all endpoints, parameters, and responses
            </p>
            <div className="flex items-center gap-2 text-accent-purple font-medium">
              View API docs
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

        </div>
      </section>

      {/* Popular Topics */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">TypeScript SDK</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs/typescript-sdk#installation" className="hover:text-foreground">
                    Installation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/typescript-sdk#quick-start" className="hover:text-foreground">
                    Quick Start
                  </Link>
                </li>
                <li>
                  <Link href="/docs/typescript-sdk#api-methods" className="hover:text-foreground">
                    API Methods
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">MCP Integration</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs/mcp-integration#installation" className="hover:text-foreground">
                    Installation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/mcp-integration#setup-for-claude-code" className="hover:text-foreground">
                    Claude Code Setup
                  </Link>
                </li>
                <li>
                  <Link href="/docs/mcp-integration#available-mcp-tools" className="hover:text-foreground">
                    Available Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">API Reference</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs/api-reference#create-memory" className="hover:text-foreground">
                    Create Memory
                  </Link>
                </li>
                <li>
                  <Link href="/docs/api-reference#search-memories" className="hover:text-foreground">
                    Search Memories
                  </Link>
                </li>
                <li>
                  <Link href="/docs/api-reference#list-memories" className="hover:text-foreground">
                    List Memories
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Anthropic Skills</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs/anthropic-skills#memory-operations" className="hover:text-foreground">
                    Memory Operations
                  </Link>
                </li>
                <li>
                  <Link href="/docs/anthropic-skills#complete-skill-example" className="hover:text-foreground">
                    Skill Example
                  </Link>
                </li>
                <li>
                  <Link href="/docs/anthropic-skills#best-practices" className="hover:text-foreground">
                    Best Practices
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
