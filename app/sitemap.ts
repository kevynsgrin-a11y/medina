import type { MetadataRoute } from 'next'
import { CATEGORIES, RECIPES } from '@/lib/recipes'
import { RECIPE_RECORD_UPDATED_AT, SITE_URL } from '@/lib/schema'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/recipes`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/affiliate-disclosure`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/editorial-standards`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const recipeRoutes: MetadataRoute.Sitemap = RECIPES.map((r) => ({
    url: `${SITE_URL}/recipes/${r.id}`,
    lastModified: new Date(RECIPE_RECORD_UPDATED_AT),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...recipeRoutes]
}
