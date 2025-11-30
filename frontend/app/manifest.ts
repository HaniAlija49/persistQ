import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PersistQ - Semantic Memory API for AI',
    short_name: 'PersistQ',
    description: 'Private, cost-effective semantic memory API for AI developers',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#22d3ee',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
