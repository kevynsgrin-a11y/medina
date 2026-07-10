import type { RecipeDetail } from '@/lib/recipe-details'

export function MethodPanel({ detail }: { detail: RecipeDetail }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-primary">Method</p>
      <h2 className="mt-3 font-serif text-2xl tracking-tight text-balance sm:text-3xl">
        How it comes together
      </h2>
      <ol className="mt-6 space-y-6">
        {detail.method.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/50 font-serif text-sm text-primary">
              {i + 1}
            </span>
            <p className="pt-1 text-sm leading-relaxed text-foreground/90 text-pretty">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
