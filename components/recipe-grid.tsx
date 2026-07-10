'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
import { CATEGORIES, RECIPES, type Category } from '@/lib/recipes'
import { RecipeCard } from '@/components/recipe-card'

type Filter = 'All' | Category

export function RecipeGrid({ query }: { query: string }) {
  const [filter, setFilter] = useState<Filter>('All')

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchesFilter = filter === 'All' || r.category === filter
      const matchesQuery =
        !normalizedQuery ||
        r.name.toLowerCase().includes(normalizedQuery) ||
        r.region.toLowerCase().includes(normalizedQuery) ||
        r.category.toLowerCase().includes(normalizedQuery)
      return matchesFilter && matchesQuery
    })
  }, [filter, normalizedQuery])

  const filters: Filter[] = ['All', ...CATEGORIES.map((c) => c.label)]

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
      {/* anchor targets for category nav links */}
      {CATEGORIES.map((c) => (
        <span key={c.slug} id={c.slug} className="block -translate-y-24" />
      ))}

      <div className="flex flex-col gap-6 border-b border-border pb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              The Index
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              120 Culinary Artifacts
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted-foreground md:block">
            An exhaustive index of North African gastronomy, cataloged by
            region, heat, and tradition.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const active = filter === f
            const count =
              f === 'All'
                ? RECIPES.length
                : RECIPES.filter((r) => r.category === f).length
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {f}
                <span className="ml-1.5 text-xs opacity-70">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results */}
      <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
        Showing <span className="text-foreground">{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'artifact' : 'artifacts'}
        {normalizedQuery && (
          <>
            {' '}
            for “<span className="text-primary">{query}</span>”
          </>
        )}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="font-serif text-2xl">No artifacts found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            The codex is deep, but this query came up empty. Try a region like
            “Fez” or a dish like “tagine”.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
