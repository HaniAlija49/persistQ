import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anthropic Skills Integration - PersistQ',
  description: 'Learn how to integrate PersistQ memory storage with Anthropic Skills for intelligent AI agent memory management. Complete setup guide with code examples.',
  alternates: {
    canonical: '/docs/anthropic-skills',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}