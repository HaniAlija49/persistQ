import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Getting Started',
  description: 'Get started with PersistQ in under 5 minutes. Learn how to install SDKs, authenticate, and make your first API call to store and retrieve AI memories.',
  alternates: {
    canonical: '/docs/getting-started',
  },
}

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
