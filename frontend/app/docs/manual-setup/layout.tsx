import { Metadata } from 'next'
import { SharedHeader } from "@/components/shared-header"

export const metadata: Metadata = {
  title: 'Manual Setup - PersistQ',
  description: 'Step-by-step manual setup guide for PersistQ. Self-host PersistQ with PostgreSQL, pgvector, and Redis. Complete deployment instructions for production environments.',
  alternates: {
    canonical: '/docs/manual-setup',
  },
}

export default function ManualSetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader activeLink="docs" />
      {children}
    </div>
  )
}