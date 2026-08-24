import type { Metadata } from 'next'
import Link from 'next/link'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { RecipeCard } from '@/components/recipe-card'
import { SiteFooter } from '@/components/site-footer'
import { CATEGORIES, RECIPES } from '@/lib/recipes'
import { SITE_NAME, SITE_URL } from '@/lib/schema'

const url = `${SITE_URL}/recipes`

export const metadata: Metadata = {
  title: 'Recipe index',
  description: 'Browse all 120 editorial recipe records in The Maghreb Culinary Codex.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Recipe index',
    description: 'Browse all 120 editorial recipe records in The Maghreb Culinary Codex.',
    type: 'website',
    url,
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipe index',
    description: 'Browse all 120 editorial recipe records in The Maghreb Culinary Codex.',
    images: ['/opengraph-image'],
  },
}

export default function RecipeIndexPage() {
  return (
    <>
      <DetailNav />
      <main id="main-content" className="relative min-h-screen">
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">The index</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            All recipe records
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Browse 120 source-led recipe records across four editorial categories. For permanent
            category pages, use the links below.
          </p>

          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Recipe categories">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
              >
                {category.label}
              </Link>
            ))}
          </nav>

          {CATEGORIES.map((category) => {
            const recipes = RECIPES.filter((recipe) => recipe.category === category.label)
            return (
              <section key={category.slug} className="mt-16" aria-labelledby={`${category.slug}-heading`}>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-primary">{category.note}</p>
                    <h2 id={`${category.slug}-heading`} className="mt-2 font-serif text-3xl tracking-tight">
                      {category.label}
                    </h2>
                  </div>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm font-medium text-primary underline underline-offset-4"
                  >
                    Browse this category
                  </Link>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </section>
            )
          })}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
