import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for PersistQ. Start free and scale as you grow. No hidden fees, no surprises. Save up to 17% with annual billing.',
  openGraph: {
    title: 'PersistQ Pricing - Start Free',
    description: 'Simple, transparent pricing. Start free and scale as you grow. Save up to 17% with annual billing.',
    url: '/pricing',
  },
  twitter: {
    title: 'PersistQ Pricing - Start Free',
    description: 'Simple, transparent pricing. Start free and scale as you grow. Save up to 17% with annual billing.',
  },
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
