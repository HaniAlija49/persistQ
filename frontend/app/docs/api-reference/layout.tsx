import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference',
  description: 'Complete PersistQ API reference documentation. All endpoints, parameters, request/response examples, authentication, and error handling.',
  alternates: {
    canonical: '/docs/api-reference',
  },
}

export default function ApiReferenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
