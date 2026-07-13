import { ChefHat } from 'lucide-react'
import type { RecipeDetail } from '@/lib/recipe-details'

export function ChefsNote({ detail }: { detail: RecipeDetail }) {
  if (!detail.chefsNote) return null

  return (
    <div className="flex gap-3 rounded-xl border border-primary/30 bg-primary/5 p-5">
      <ChefHat className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Chef’s note
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 text-pretty">
          {detail.chefsNote}
        </p>
      </div>
    </div>
  )
}
