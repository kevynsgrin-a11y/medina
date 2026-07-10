import type { MetadataRoute } from 'next'
import { RECIPES } from '@/lib/recipes'
import { SITE_URL } from '@/lib/schema'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/affiliate-disclosure`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const recipeRoutes: MetadataRoute.Sitemap = RECIPES.map((r) => ({
    url: `${SITE_URL}/recipes/${r.id}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...recipeRoutes]
}
