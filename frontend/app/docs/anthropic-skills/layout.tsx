import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Using PersistQ with Skills (Anthropic) | PersistQ',
  description: 'Learn how to integrate PersistQ memory storage with Anthropic Skills for intelligent memory management.',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}