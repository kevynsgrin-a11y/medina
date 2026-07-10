'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CATEGORIES } from '@/lib/recipes'

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="relative border-t border-border">
      {/* Newsletter / subscribe band */}
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              Join the codex.
              <span className="block italic text-primary">
                One artifact a week.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground leading-relaxed text-pretty">
              A single, meticulously researched recipe delivered every Friday —
              from the Atlantic coast of Essaouira to the Red Sea shores of
              Egypt. No noise, only the good stuff.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSent(true)
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="flex-1">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-13 w-full rounded-full border border-border bg-card px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                {sent ? 'Welcome ✳' : 'Subscribe'}
              </motion.button>
            </form>
            {sent && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-sm text-primary"
              >
                You’re on the list. Check your inbox this Friday.
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Sitemap band */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:justify-between md:px-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 font-serif text-lg text-primary">
                ✳
              </span>
              <span className="font-serif text-lg leading-none">
                The Maghreb
                <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
                  Culinary Codex
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An editorial archive of North African gastronomy. Colors drawn
              from marqa sauce codifications — saffron M’qualli and paprika
              M’hammar.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-4"
            aria-label="Footer"
          >
            <div>
              <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Taxonomy
              </h3>
              <ul className="space-y-2 text-sm">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <a
                      href={`#${c.slug}`}
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                The Codex
              </h3>
              <ul className="space-y-2 text-sm">
                {['About', 'Methodology', 'Contributors', 'Archive'].map((x) => (
                  <li key={x}>
                    <a
                      href="#top"
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {x}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/affiliate-disclosure"
                    className="text-foreground/80 transition-colors hover:text-primary"
                  >
                    Affiliate Disclosure
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Regions
              </h3>
              <ul className="space-y-2 text-sm">
                {['Morocco', 'Tunisia', 'Algeria', 'Egypt'].map((x) => (
                  <li key={x}>
                    <a
                      href="#top"
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Follow
              </h3>
              <ul className="space-y-2 text-sm">
                {['Instagram', 'YouTube', 'Substack', 'TikTok'].map((x) => (
                  <li key={x}>
                    <a
                      href="#top"
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row md:px-8">
          <p>© {new Date().getFullYear()} The Maghreb Culinary Codex. Vol. I.</p>
          <p>From the Atlantic Coast to the Red Sea.</p>
        </div>
      </div>
    </footer>
  )
}
