import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SDK Documentation - PersistQ',
  description: 'Complete SDK documentation for PersistQ. TypeScript SDK and MCP Server integration guides.',
}

export default function SDKLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
