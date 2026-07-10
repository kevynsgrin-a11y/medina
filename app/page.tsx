'use client'

import { useState } from 'react'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { FeaturedTeasers } from '@/components/featured-teasers'
import { RecipeGrid } from '@/components/recipe-grid'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  const [query, setQuery] = useState('')

  return (
    <main className="relative min-h-screen">
      <SiteNav query={query} onQueryChange={setQuery} />
      <Hero />
      <FeaturedTeasers />
      <RecipeGrid query={query} />
      <SiteFooter />
    </main>
  )
}
