import type { Recipe } from './recipes'
import type { RecipeDetail } from './recipe-details'

const SITE_URL = 'https://www.tasteofmedina.com'

/** Best-effort ISO 8601 duration parse from freeform text like "1 hour 30 minutes".
 * Returns undefined when the text doesn't contain a clean, parseable time
 * (e.g. "Several hours", "Variable; depends on equipment") rather than guessing. */
export function parseIsoDuration(text: string): string | undefined {
  const hourMatch = text.match(/(\d+)\s*hour/i)
  const minuteMatch = text.match(/(\d+)\s*min/i)
  if (!hourMatch && !minuteMatch) return undefined
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0
  if (hours === 0 && minutes === 0) return undefined
  let out = 'PT'
  if (hours) out += `${hours}H`
  if (minutes) out += `${minutes}M`
  return out
}

export function buildRecipeJsonLd(recipe: Recipe, detail: RecipeDetail) {
  const ingredientLines: string[] = []
  for (const entry of detail.ingredients) {
    if (entry.type === 'group') {
      ingredientLines.push(`— ${entry.text} —`)
    } else {
      ingredientLines.push(entry.text)
    }
  }

  const totalTime = parseIsoDuration(detail.timeText)

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: detail.originStatus,
    image: [`${SITE_URL}${recipe.image}`],
    recipeCategory: recipe.category,
    recipeCuisine: 'North African',
    keywords: [recipe.region, recipe.category, 'North African cuisine'].join(', '),
    recipeYield: detail.yieldText,
    ...(totalTime ? { totalTime } : {}),
    recipeIngredient: ingredientLines,
    recipeInstructions: detail.method.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
    author: {
      '@type': 'Organization',
      name: 'The Maghreb Culinary Codex',
    },
  }
}

export function recipeUrl(id: number): string {
  return `${SITE_URL}/recipes/${id}`
}

export { SITE_URL }
