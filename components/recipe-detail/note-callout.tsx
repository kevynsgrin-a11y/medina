import { ShieldAlert, Info } from 'lucide-react'
import type { RecipeDetail } from '@/lib/recipe-details'

export function NoteCallout({ detail }: { detail: RecipeDetail }) {
  const isSafety = detail.noteLabel === 'Safety note'

  return (
    <div
      className={`flex gap-3 rounded-xl border p-5 ${
        isSafety
          ? 'border-destructive/40 bg-destructive/10'
          : 'border-border bg-card'
      }`}
    >
      {isSafety ? (
        <ShieldAlert className="h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
      ) : (
        <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      )}
      <div>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            isSafety ? 'text-destructive' : 'text-primary'
          }`}
        >
          {detail.noteLabel}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 text-pretty">
          {detail.accuracyNote}
        </p>
      </div>
    </div>
  )
}
