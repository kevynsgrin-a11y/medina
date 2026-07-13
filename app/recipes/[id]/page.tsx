import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RECIPES } from '@/lib/recipes'
import { getRecipeDetail } from '@/lib/recipe-details'
import { buildRecipeJsonLd, recipeUrl } from '@/lib/schema'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { RecipeHero } from '@/components/recipe-detail/recipe-hero'
import { IngredientsPanel } from '@/components/recipe-detail/ingredients-panel'
import { MethodPanel } from '@/components/recipe-detail/method-panel'
import { NoteCallout } from '@/components/recipe-detail/note-callout'
import { ChefsNote } from '@/components/recipe-detail/chefs-note'
import { ShopModule } from '@/components/recipe-detail/shop-module'
import { SourcesPanel } from '@/components/recipe-detail/sources-panel'
import { RecipeCard } from '@/components/recipe-card'
import { SiteFooter } from '@/components/site-footer'

export function generateStaticParams() {
  return RECIPES.map((r) => ({ id: String(r.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const recipe = RECIPES.find((r) => r.id === Number(id))
  const detail = getRecipeDetail(Number(id))
  if (!recipe || !detail) return {}

  const title = `${recipe.name} — Recipe №${String(recipe.id).padStart(3, '0')} | The Maghreb Culinary Codex`
  const description = detail.originStatus

  return {
    title,
    description,
    alternates: { canonical: recipeUrl(recipe.id) },
    openGraph: {
      title: recipe.name,
      description,
      type: 'article',
      images: [{ url: recipe.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.name,
      description,
    },
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const recipe = RECIPES.find((r) => r.id === Number(id))
  const detail = getRecipeDetail(Number(id))

  if (!recipe || !detail) notFound()

  const related = RECIPES.filter(
    (r) => r.category === recipe.category && r.id !== recipe.id,
  ).slice(0, 4)

  const jsonLd = buildRecipeJsonLd(recipe, detail)

  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DetailNav />
      <RecipeHero recipe={recipe} detail={detail} />

      <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-14">
            <IngredientsPanel detail={detail} />
            <MethodPanel detail={detail} />
            <NoteCallout detail={detail} />
            <ChefsNote detail={detail} />
          </div>

          <aside className="space-y-8 lg:border-l lg:border-border lg:pl-8">
            <ShopModule recipe={recipe} detail={detail} />
            <SourcesPanel
              crossRefCodes={detail.crossRefCodes}
              finalizedSources={detail.finalizedSources}
            />
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative mx-auto max-w-7xl border-t border-border px-5 py-16 md:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Keep exploring</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-balance sm:text-4xl">
            More from {recipe.category}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
            {related.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}
