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
    description: "Enterprise-grade infrastructure for maximum reliability",
    specs: [
      { label: "Database", value: "PostgreSQL 15+", detail: "With pgvector extension" },
      { label: "Vector Engine", value: "Transformers.js", detail: "Local embeddings" },
      { label: "CDN", value: "Global edge network", detail: "50+ locations worldwide" },
      { label: "Load Balancing", value: "Automatic", detail: "Health checks included" }
    ]
  },
  {
    title: "Performance",
    icon: Zap,
    description: "Optimized for real-time AI applications",
    specs: [
      { label: "Search Latency", value: "<200ms", detail: "P99 response time" },
      { label: "Concurrent Users", value: "10,000+", detail: "Per instance" },
      { label: "Throughput", value: "50K req/sec", detail: "Burst capability" },
      { label: "Cache Hit Rate", value: "95%+", detail: "With smart caching" }
    ]
  },
  {
    title: "Security & Compliance",
    icon: Shield,
    description: "Enterprise security standards and certifications",
    specs: [
      { label: "Data Encryption", value: "AES-256", detail: "At rest and in transit" },
      { label: "Compliance", value: "GDPR, CCPA", detail: "SOC 2 Type II coming" },
      { label: "Authentication", value: "API Key / OAuth 2.0", detail: "JWT tokens" },
      { label: "Audit Logs", value: "Real-time", detail: "SIEM integration" }
    ]
  },
  {
    title: "Scalability",
    icon: Database,
    description: "Scale from startup to enterprise without architecture changes",
    specs: [
      { label: "Memory Storage", value: "Unlimited", detail: "Up to 1PB per customer" },
      { label: "API Rate Limit", value: "Configurable", detail: "Burst support" },
      { label: "Multi-region", value: "Active-active", detail: "Zero-downtime failover" },
      { label: "Backups", value: "Point-in-time", detail: "7-day retention" }
    ]
  },
  {
    title: "Global Availability",
    icon: Globe,
    description: "Worldwide infrastructure for minimal latency",
    specs: [
      { label: "Regions", value: "15+", detail: "Across 6 continents" },
      { label: "Uptime SLA", value: "99.9%", detail: "Premium: 99.99%" },
      { label: "Data Locality", value: "Full control", detail: "Choose your region" },
      { label: "Edge Caching", value: "Built-in", detail: "Automatic distribution" }
    ]
  },
  {
    title: "Privacy Features",
    icon: Lock,
    description: "Your data stays private with local processing",
    specs: [
      { label: "Embedding Location", value: "Local", detail: "No third-party APIs" },
      { label: "Data Residency", value: "Customer control", detail: "Choose storage location" },
      { label: "Data Deletion", value: "Instant", detail: "Right to be forgotten" },
      { label: "Private Cloud", value: "Available", detail: "On-premise option" }
    ]
  }
]

const enterpriseFeatures = [
  "Dedicated account manager",
  "Priority 24/7 support",
  "Custom SLA agreements",
  "Advanced analytics dashboard",
  "Custom integrations support",
  "On-premise deployment options",
  "Training and onboarding",
  "Custom embedding models"
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
            <h3 className="text-2xl font-bold mb-6">Enterprise Features</h3>
            <p className="text-muted-foreground mb-6">
              Everything you need to deploy PersistQ at scale in your organization
            </p>
            <div className="space-y-3">
              {enterpriseFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 rounded-lg p-8 border border-accent-cyan/20">
            <h3 className="text-xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6">
              We offer flexible deployment options including on-premise, private cloud, and dedicated instances tailored to your specific requirements.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-accent-cyan" />
                <span className="text-sm">SOC 2 Type II certification (in progress)</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent-purple" />
                <span className="text-sm">HIPAA compliance available</span>
              </div>
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-accent-cyan" />
                <span className="text-sm">Unlimited custom integrations</span>
              </div>
            </div>
            <Button size="lg" className="w-full mt-6 bg-accent-cyan hover:bg-accent-cyan/90 text-black">
              Contact Enterprise Sales
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