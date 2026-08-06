import type { MetadataRoute } from 'next'
import { getCases } from '@/lib/cases'
import { getPublishedBlogPosts } from '@/lib/blog'

/**
 * Single source of truth for every indexable URL on the site. Two consumers:
 * app/sitemap.ts (needs the full entries) and app/api/indexnow/route.ts (needs
 * the URL list). One list, so the two can never drift again — IndexNow used to
 * miss the three product pages because it kept its own copy.
 */
export const BASE_URL = 'https://phigo.se'

type StaticRoute = {
  path: string
  lastModified: Date
  changeFrequency: 'weekly' | 'monthly'
  priority: number
}

const staticRoutes: StaticRoute[] = [
  { path: '', lastModified: new Date('2026-03-26'), changeFrequency: 'monthly', priority: 1.0 },
  { path: '/hemsida', lastModified: new Date('2026-08-05'), changeFrequency: 'monthly', priority: 0.9 },
  { path: '/ai-receptionist', lastModified: new Date('2026-08-05'), changeFrequency: 'monthly', priority: 0.9 },
  { path: '/chatbot', lastModified: new Date('2026-08-05'), changeFrequency: 'monthly', priority: 0.9 },
  { path: '/cases', lastModified: new Date('2026-03-26'), changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blogg', lastModified: new Date('2026-03-26'), changeFrequency: 'weekly', priority: 0.8 },
  { path: '/integritetspolicy', lastModified: new Date('2026-03-26'), changeFrequency: 'monthly', priority: 0.3 },
]

/** Full sitemap entries: static routes + case pages + published blog posts. */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const caseEntries: MetadataRoute.Sitemap = getCases().map((c) => ({
    url: `${BASE_URL}/cases/${c.slug}`,
    lastModified: new Date('2026-03-26'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = getPublishedBlogPosts().map((p) => ({
    url: `${BASE_URL}/blogg/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(p.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...caseEntries, ...blogEntries]
}

/** The same URLs as the sitemap, as a plain list (IndexNow's format). */
export function getAllIndexableUrls(): string[] {
  return getSitemapEntries().map((e) => e.url)
}
