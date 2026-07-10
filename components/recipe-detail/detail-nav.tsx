'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function DetailNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
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

        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to the Codex
        </Link>
      </div>
    </header>
  )
}
