import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://persistq.com'

  const routes = [
    '',
    '/features',
    '/pricing',
    '/docs',
    '/docs/getting-started',
    '/docs/api-reference',
    '/privacy-policy',
    '/terms',
    '/refund-policy',
    '/login',
    '/signup',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1 : route.includes('/docs') ? 0.8 : 0.7,
  }))
}
