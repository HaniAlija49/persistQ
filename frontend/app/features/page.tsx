"use client"

import Link from "next/link"
import Image from "next/image"
import { SharedHeader } from "@/components/shared-header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Zap, Shield, Code, DollarSign, Search, Database, Lock } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader activeLink="features" />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Everything you need for AI memory</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PersistQ combines powerful semantic search, local embeddings, and transparent pricing to give your AI
          applications long-term memory at scale.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Zero Embedding Costs */}
          <div className="p-8 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-6">
              <DollarSign className="w-6 h-6 text-accent-cyan" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Zero Embedding Costs</h3>
            <p className="text-muted-foreground mb-6">
              Save hundreds per month with local Transformers.js embeddings. No per-token charges, no OpenAI API costs.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Free embeddings forever</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>No per-token fees</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Predictable pricing</span>
              </li>
            </ul>
          </div>

          {/* Semantic Search */}
          <div className="p-8 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Semantic Search</h3>
            <p className="text-muted-foreground mb-6">
              Vector-based search finds relevant memories even with fuzzy queries. Powered by pgvector and automatic
              embeddings.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Automatic embeddings</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Hybrid search (semantic + keyword)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Sub-200ms response time</span>
              </li>
            </ul>
          </div>

          {/* Simple API */}
          <div className="p-8 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-accent-cyan" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Simple REST API</h3>
            <p className="text-muted-foreground mb-6">
              Get started in seconds with our intuitive REST API. Works with any language or framework.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>No complex setup</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>SDKs for Node.js & Python</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Works with any HTTP client</span>
              </li>
            </ul>
          </div>

          {/* Privacy First */}
          <div className="p-8 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Privacy First</h3>
            <p className="text-muted-foreground mb-6">
              Your data never leaves your infrastructure for embeddings. No third-party AI service dependencies.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Local embedding generation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>GDPR compliant</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Secure API authentication</span>
              </li>
            </ul>
          </div>

          {/* PostgreSQL + pgvector */}
          <div className="p-8 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-accent-cyan" />
            </div>
            <h3 className="text-2xl font-bold mb-4">PostgreSQL + pgvector</h3>
            <p className="text-muted-foreground mb-6">
              Built on battle-tested PostgreSQL with pgvector extension. No vendor lock-in, familiar technology.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Standard PostgreSQL</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>pgvector for vectors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Self-hosting option</span>
              </li>
            </ul>
          </div>

          {/* MCP Integration */}
          <div className="p-8 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Claude Code / MCP Ready</h3>
            <p className="text-muted-foreground mb-6">
              One prompt and Claude Code sets up PersistQ via MCP. Zero manual configuration needed.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>MCP integration</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Auto-setup with Claude</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>Instant productivity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="container mx-auto px-4 py-32 bg-surface/30">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Powerful features for production</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to build AI applications with long-term memory
            </p>
          </div>

          {/* Memory Management */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Memory Management</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Store & Retrieve</h4>
                <p className="text-sm text-muted-foreground">
                  Store memories with automatic embedding generation. Retrieve by semantic search or exact match.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Groups & Tags</h4>
                <p className="text-sm text-muted-foreground">
                  Organize memories with groups and tags. Filter searches by category for precise results.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Metadata Support</h4>
                <p className="text-sm text-muted-foreground">
                  Attach custom metadata to memories. Search and filter by any field.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Full CRUD Operations</h4>
                <p className="text-sm text-muted-foreground">
                  Create, read, update, and delete memories via simple API endpoints.
                </p>
              </div>
            </div>
          </div>

          {/* Search Capabilities */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Search Capabilities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Vector Search</h4>
                <p className="text-sm text-muted-foreground">
                  Semantic search powered by 384-dimensional embeddings. Find relevant memories by meaning.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Keyword Search</h4>
                <p className="text-sm text-muted-foreground">
                  Traditional text-based search for exact matches. Fast and reliable.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Hybrid Search</h4>
                <p className="text-sm text-muted-foreground">
                  Combines semantic and keyword search for best results. Automatic query optimization.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Filtering</h4>
                <p className="text-sm text-muted-foreground">
                  Filter by groups, tags, metadata, and date ranges. Narrow down results efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Developer Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Developer Experience</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Comprehensive Docs</h4>
                <p className="text-sm text-muted-foreground">
                  Clear documentation with examples in multiple languages. Quick start guides included.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Dashboard UI</h4>
                <p className="text-sm text-muted-foreground">
                  Web dashboard to view memories, manage API keys, and monitor usage.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Rate Limiting</h4>
                <p className="text-sm text-muted-foreground">
                  Built-in rate limiting to protect your application. Configurable per tier.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-surface">
                <h4 className="font-semibold mb-2">Usage Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Track API usage, storage, and costs. Basic analytics on free tier, advanced on paid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 p-12 rounded-2xl border border-border bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground">Start building with PersistQ today. No credit card required.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-accent-cyan hover:bg-accent-cyan/90 text-black font-medium">
              Start building for free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-surface/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs/api-reference" className="hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/docs/getting-started" className="hover:text-foreground transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7">
                <Image
                  src="/logo-small.png"
                  alt="PersistQ Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-lg">PersistQ</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 PersistQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
