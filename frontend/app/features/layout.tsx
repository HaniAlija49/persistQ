import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Powerful features for AI memory: zero embedding costs, semantic search, simple REST API, privacy-first architecture, PostgreSQL + pgvector, and MCP integration.',
  openGraph: {
    title: 'PersistQ Features - Everything for AI Memory',
    description: 'Zero embedding costs, semantic search, simple API, privacy-first architecture, and MCP integration for Claude Code.',
    url: '/features',
  },
  twitter: {
    title: 'PersistQ Features - Everything for AI Memory',
    description: 'Zero embedding costs, semantic search, simple API, privacy-first architecture, and MCP integration for Claude Code.',
  },
  alternates: {
    canonical: '/features',
  },
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
