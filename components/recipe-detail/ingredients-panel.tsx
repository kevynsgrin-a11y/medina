import type { RecipeDetail } from '@/lib/recipe-details'
import {
  NUTRITION_ATTRIBUTION,
  NUTRITION_FETCHED_AT,
  NUTRITION_SOURCE_URL,
  type Per100gNutrition,
} from '@/lib/nutrition'

/** Modest muted per-100g nutrient line for one verified ingredient. */
function Per100gLine({ per100g }: { per100g: Per100gNutrition }) {
  const fmt = (value: number | undefined, unit: string) =>
    value === undefined || value === null ? null : `${Math.round(value * 10) / 10} ${unit}`
  const parts = [
    fmt(per100g.kcal, 'kcal'),
    fmt(per100g.protein_g, 'g protein'),
    fmt(per100g.fat_g, 'g fat'),
    fmt(per100g.carbs_g, 'g carbs'),
  ].filter(Boolean)
  if (parts.length === 0) return null
  return <span className="block text-xs text-muted-foreground">{parts.join(' · ')} per 100 g</span>
}

export function IngredientsPanel({ detail }: { detail: RecipeDetail }) {
  const hasNutrition = detail.ingredients.some(
    (entry) => entry.type === 'item' && entry.nutrition,
  )
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
              <span className="text-foreground/90">
                {entry.text}
                {entry.nutrition ? <Per100gLine per100g={entry.nutrition.per100g} /> : null}
              </span>
            </li>
          ),
        )}
      </ul>
      {hasNutrition ? (
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Per-100 g values shown for ingredients verified against{' '}
          <a
            href={NUTRITION_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-primary"
          >
            {NUTRITION_ATTRIBUTION}
          </a>
          {NUTRITION_FETCHED_AT ? ` (snapshot ${NUTRITION_FETCHED_AT.slice(0, 10)})` : ''}.
          Ingredients not yet verified show no nutrition line.
        </p>
      ) : null}
    </div>
  )
}
