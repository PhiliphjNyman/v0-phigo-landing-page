import type { MetadataRoute } from 'next'
import { getCases } from '@/lib/cases'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://phigo.se'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const caseRoutes: MetadataRoute.Sitemap = getCases().map((c) => ({
    url: `${baseUrl}/cases/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...caseRoutes]
}
