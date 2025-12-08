"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Rocket, Zap, Shield, Globe, Database, Lock } from "lucide-react"

interface UpdateItem {
  date: string
  version: string
  title: string
  description: string
  type: "feature" | "improvement" | "fix"
  icon: React.ComponentType<{ className?: string }>
}

interface RoadmapItem {
  quarter: string
  features: {
    title: string
    description: string
    status: "planned" | "in-progress" | "beta"
  }[]
}

const updates: UpdateItem[] = [
  {
    date: "2024-12-01",
    version: "v2.4.0",
    title: "Advanced Search Filters",
    description: "New filtering options for semantic search including date ranges, metadata filters, and custom scoring algorithms.",
    type: "feature",
    icon: Zap
  },
  {
    date: "2024-11-15",
    version: "v2.3.2",
    title: "Performance Improvements",
    description: "Reduced memory usage by 40% and improved search latency by 25% through query optimization.",
    type: "improvement",
    icon: Rocket
  },
  {
    date: "2024-11-01",
    version: "v2.3.0",
    title: "GDPR Compliance Tools",
    description: "Enhanced data deletion, export capabilities, and consent management for European customers.",
    type: "feature",
    icon: Shield
  },
  {
    date: "2024-10-20",
    version: "v2.2.1",
    title: "API Rate Limiting Fix",
    description: "Resolved issue with rate limiting not properly resetting for Enterprise plans.",
    type: "fix",
    icon: Database
  }
]

const roadmap: RoadmapItem[] = [
  {
    quarter: "Q1 2025",
    features: [
      {
        title: "Custom Embedding Models",
        description: "Upload and train your own embedding models for domain-specific semantic search.",
        status: "in-progress"
      },
      {
        title: "Real-time Collaboration",
        description: "Multi-user editing and sharing of memory collections with role-based access control.",
        status: "planned"
      },
      {
        title: "Advanced Analytics Dashboard",
        description: "Detailed insights into memory usage, search patterns, and performance metrics.",
        status: "in-progress"
      }
    ]
  },
  {
    quarter: "Q2 2025",
    features: [
      {
        title: "Vector Database Support",
        description: "Native support for Pinecone, Weaviate, and other vector databases.",
        status: "planned"
      },
      {
        title: "Hybrid Search Algorithm",
        description: "Combined semantic and keyword search with configurable weighting.",
        status: "planned"
      },
      {
        title: "Webhook Integrations",
        description: "Automated memory creation from external services via webhooks.",
        status: "beta"
      }
    ]
  },
  {
    quarter: "Q3 2025",
    features: [
      {
        title: "Enterprise SSO",
        description: "SAML and OIDC support for enterprise authentication.",
        status: "planned"
      },
      {
        title: "Geographic Data Regions",
        description: "Choose specific geographic regions for data storage and processing.",
        status: "planned"
      },
      {
        title: "Memory Versioning",
        description: "Track changes and roll back to previous versions of memories.",
        status: "planned"
      }
    ]
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "beta":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Beta</Badge>
    case "in-progress":
      return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">In Progress</Badge>
    case "planned":
      return <Badge variant="secondary">Planned</Badge>
    default:
      return <Badge variant="secondary">Planned</Badge>
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Rocket className="w-4 h-4 text-accent-cyan" />
    case "improvement":
      return <Zap className="w-4 h-4 text-green-500" />
    case "fix":
      return <Database className="w-4 h-4 text-orange-500" />
    default:
      return <Rocket className="w-4 h-4" />
  }
}

export default function WhatsNew() {
  return (
    <section className="py-32 container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-purple/10 px-4 py-2 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-accent-purple" />
            <span className="text-sm text-accent-purple font-medium">Product Updates</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">
            What's New & Coming Soon
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest features and see what we're building next
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recent Updates */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Recent Updates</h3>
            <div className="space-y-6">
              {updates.map((update, index) => {
                const Icon = update.icon
                return (
                  <Card key={index} className="bg-surface/50 border-border/50 hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-background border border-border/30 flex items-center justify-center">
                            {getTypeIcon(update.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-sm font-semibold">
                                {update.title}
                              </CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {update.version}
                              </Badge>
                            </div>
                            <CardDescription className="text-xs">
                              {new Date(update.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {update.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="mt-8">
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Product Roadmap</h3>
            <div className="space-y-8">
              {roadmap.map((quarter, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-lg font-semibold text-accent-cyan">
                    {quarter.quarter}
                  </h4>
                  <div className="space-y-3">
                    {quarter.features.map((feature, featureIndex) => (
                      <Card key={featureIndex} className="bg-background/50 border-border/30">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-2 flex-1">
                              <h5 className="font-medium text-sm">{feature.title}</h5>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                            {getStatusBadge(feature.status)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 rounded-lg p-8 border border-accent-cyan/20">
            <h3 className="text-2xl font-bold mb-4">Have a Feature Request?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for feedback and ideas to improve PersistQ.
              Join our community and help shape the future of AI memory.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-accent-cyan hover:bg-accent-cyan/90 text-black" disabled>
                Coming Soon
              </Button>
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}