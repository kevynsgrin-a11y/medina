import type { RecipeDetail } from '@/lib/recipe-details'

export function IngredientsPanel({ detail }: { detail: RecipeDetail }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-primary">
        {detail.ingredientsHeader}
      </p>
      <h2 className="mt-3 font-serif text-2xl tracking-tight text-balance sm:text-3xl">
        What you’ll need
      </h2>
      <ul className="mt-6 space-y-3 text-sm leading-relaxed">
        {detail.ingredients.map((entry, i) =>
          entry.type === 'group' ? (
            <li
              key={i}
              className="pt-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground first:pt-0"
            >
              {entry.text}
            </li>
          ) : (
            <li key={i} className="flex gap-3 border-b border-border/60 pb-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-foreground/90">{entry.text}</span>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
