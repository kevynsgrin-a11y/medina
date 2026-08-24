'use client'

import { Printer } from 'lucide-react'

export function PrintRecipeButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print recipe
    </button>
  )
}
