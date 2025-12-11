import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TypeScript SDK - PersistQ',
  description: 'Complete guide for the PersistQ TypeScript/JavaScript SDK. Install, configure, and integrate semantic memory storage into your Node.js, Next.js, and web applications.',
  alternates: {
    canonical: '/docs/typescript-sdk',
  },
}

export default function TypeScriptSDKLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
