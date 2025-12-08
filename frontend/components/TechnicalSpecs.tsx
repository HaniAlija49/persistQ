"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Server,
  Shield,
  Zap,
  Database,
  Globe,
  Lock,
  Check,
  ArrowRight
} from "lucide-react"

interface SpecCategory {
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  specs: {
    label: string
    value: string
    detail?: string
  }[]
}

const specCategories: SpecCategory[] = [
  {
    title: "Infrastructure",
    icon: Server,
    description: "Modern, reliable infrastructure built for developers",
    specs: [
      { label: "Database", value: "PostgreSQL 15+", detail: "With pgvector extension" },
      { label: "Vector Engine", value: "Transformers.js", detail: "Local embeddings (all-MiniLM-L6-v2)" },
      { label: "Deployment", value: "Render (Vercel)", detail: "Managed infrastructure" },
      { label: "Monitoring", value: "Highlight.io", detail: "Real-time error tracking" }
    ]
  },
  {
    title: "Performance",
    icon: Zap,
    description: "Optimized for real-time AI applications",
    specs: [
      { label: "Search Latency", value: "~200ms", detail: "Average response time" },
      { label: "API Throughput", value: "Rate Limited", detail: "By plan tier" },
      { label: "Embedding Speed", value: "<50ms", detail: "Local generation" },
      { label: "Search Quality", value: "Semantic", detail: "Vector-based similarity" }
    ]
  },
  {
    title: "Security & Compliance",
    icon: Shield,
    description: "Privacy-first with enterprise-grade security",
    specs: [
      { label: "Data Encryption", value: "AES-256", detail: "At rest and in transit" },
      { label: "Compliance", value: "GDPR, CCPA", detail: "Privacy by design" },
      { label: "Authentication", value: "API Key / Clerk", detail: "Secure key management" },
      { label: "Data Privacy", value: "Local Processing", detail: "Embeddings never leave" }
    ]
  },
  {
    title: "API Capabilities",
    icon: Database,
    description: "Comprehensive REST API for memory operations",
    specs: [
      { label: "Memory Storage", value: "JSON Metadata", detail: "Flexible schema" },
      { label: "Search", value: "Semantic + Keyword", detail: "Hybrid search" },
      { label: "Operations", value: "CRUD", detail: "Create, Read, Search, Delete" },
      { label: "Usage Tracking", value: "Built-in", detail: "API call and memory quotas" }
    ]
  },
  {
    title: "Integrations",
    icon: Globe,
    description: "Works with your existing development stack",
    specs: [
      { label: "TypeScript SDK", value: "@persistq/sdk", detail: "Full type safety" },
      { label: "MCP Support", value: "Yes", detail: "Claude Code integration" },
      { label: "REST API", value: "OpenAPI", detail: "Standard HTTP endpoints" },
      { label: "Billing", value: "Dodo Payments", detail: "Subscription management" }
    ]
  },
  {
    title: "Developer Experience",
    icon: Lock,
    description: "Built by developers, for developers",
    specs: [
      { label: "Documentation", value: "Comprehensive", detail: "API reference + guides" },
      { label: "SDK Support", value: "TypeScript", detail: "Full IntelliSense" },
      { label: "Error Handling", value: "Detailed", detail: "Clear error messages" },
      { label: "Monitoring", value: "Usage Stats", detail: "Real-time metrics" }
    ]
  }
]

const developerFeatures = [
  "Comprehensive TypeScript SDK",
  "RESTful API with OpenAPI docs",
  "Real-time usage monitoring",
  "Flexible JSON metadata schema",
  "Semantic search capabilities",
  "Local embedding processing",
  "Privacy-first design",
  "Simple pricing structure"
]

export default function TechnicalSpecs() {
  return (
    <section className="py-32 container mx-auto px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-cyan/10 px-4 py-2 rounded-full mb-6">
            <Server className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-accent-cyan font-medium">Enterprise Ready</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">
            Technical Specifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for enterprise scale with performance, security, and reliability at the core
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {specCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="bg-background/50 border-border/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{spec.label}</span>
                          </div>
                          {spec.detail && (
                            <p className="text-xs text-muted-foreground">{spec.detail}</p>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {spec.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Enterprise Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Developer Features</h3>
            <p className="text-muted-foreground mb-6">
              Everything developers need to build intelligent AI applications with persistent memory
            </p>
            <div className="space-y-3">
              {developerFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 rounded-lg p-8 border border-accent-cyan/20">
            <h3 className="text-xl font-bold mb-4">Simple, Transparent Pricing</h3>
            <p className="text-muted-foreground mb-6">
              Focus on building your application, not managing infrastructure. Our straightforward pricing scales with your needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-accent-cyan" />
                <span className="text-sm">Zero embedding costs forever</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent-purple" />
                <span className="text-sm">Privacy-first by design</span>
              </div>
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-accent-cyan" />
                <span className="text-sm">Scale from startup to enterprise</span>
              </div>
            </div>
            <Button size="lg" className="w-full mt-6 bg-accent-cyan hover:bg-accent-cyan/90 text-black">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Ready to deploy at enterprise scale?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-accent-cyan hover:bg-accent-cyan/90 text-black">
              Schedule a Demo
            </Button>
            <Button variant="outline" size="lg">
              Download Technical Whitepaper
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}