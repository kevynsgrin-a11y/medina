'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { CATEGORIES } from '@/lib/recipes'

export function SiteNav({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMobileOpen(false)
      menuButtonRef.current?.focus()
    }
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    mediaQuery.addEventListener('change', onDesktop)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      mediaQuery.removeEventListener('change', onDesktop)
    }
  }, [mobileOpen])

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/95 lg:bg-background/85 lg:backdrop-blur-xl'
          : 'border-b border-transparent bg-background/95 lg:bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 font-serif text-lg text-primary">
            ✳
          </span>
          <span className="hidden font-serif text-lg leading-none tracking-tight sm:block">
            The Maghreb
            <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
              Culinary Codex
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {CATEGORIES.map((category) => (
            <a
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {category.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <label className="group relative hidden items-center md:flex">
            <Search
              className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />
            <span className="sr-only">Search the codex</span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search 120 entries…"
              className="h-10 w-52 rounded-full border border-border bg-card/60 pl-9 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:w-64 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 lg:w-56"
            />
          </label>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-background/98 px-5 py-5 lg:hidden">
          <nav className="mx-auto max-w-7xl" aria-label="Mobile primary">
            <label className="group relative flex items-center">
              <Search
                className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              />
              <span className="sr-only">Search the codex</span>
              <input
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search 120 entries…"
                className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CATEGORIES.map((category) => (
                <a
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-border px-3 py-3 text-sm text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {category.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
