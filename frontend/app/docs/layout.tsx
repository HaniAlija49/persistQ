import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation for PersistQ API. Quick start guides, API reference, code examples in Python and Node.js, and best practices for semantic memory.',
  openGraph: {
    title: 'PersistQ Documentation',
    description: 'Everything you need to integrate PersistQ into your AI applications. Quick start guides, API reference, and code examples.',
    url: '/docs',
  },
  twitter: {
    title: 'PersistQ Documentation',
    description: 'Everything you need to integrate PersistQ into your AI applications. Quick start guides, API reference, and code examples.',
  },
  alternates: {
    canonical: '/docs',
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
