'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X } from 'lucide-react'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        {/* Brand */}
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 font-serif text-lg text-primary">
            ✳
          </span>
          <span className="hidden font-serif text-lg leading-none tracking-tight sm:block">
            The Maghreb
            <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
              Culinary Codex
            </span>
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {c.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Search + mobile toggle */}
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
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search 120 artifacts…"
              className="h-10 w-52 rounded-full border border-border bg-card/60 pl-9 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:w-64 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 lg:w-56"
            />
          </label>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-4 px-5 py-6">
              <label className="relative flex items-center">
                <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Search the codex</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search 120 artifacts…"
                  className="h-11 w-full rounded-full border border-border bg-card/60 pl-9 pr-4 text-sm outline-none focus:border-primary/60"
                />
              </label>
              <nav className="grid gap-1" aria-label="Mobile">
                {CATEGORIES.map((c) => (
                  <a
                    key={c.slug}
                    href={`#${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-card"
                  >
                    {c.label}
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.note}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
