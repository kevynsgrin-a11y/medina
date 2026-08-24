'use client'

import { useState, type ReactNode } from 'react'
import { RecipeGrid } from '@/components/recipe-grid'
import { SiteNav } from '@/components/site-nav'

export function HomeExperience({ hero, featured }: { hero: ReactNode; featured: ReactNode }) {
  const [query, setQuery] = useState('')

  return (
    <>
      <SiteNav query={query} onQueryChange={setQuery} />
      <main id="main-content" className="relative min-h-screen">
        {hero}
        {featured}
        <RecipeGrid query={query} />
      </main>
    </>
  )
}
