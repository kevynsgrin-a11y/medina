/**
 * Ingredient nutrition lookup backed by a committed build-time artifact
 * (lib/data/ingredient-nutrition.json), derived from the TrueAPI portfolio
 * ingredient dictionary (USDA FoodData Central data resolved offline).
 *
 * No runtime API calls: everything is static data joined at build time.
 * Refresh: DICTIONARY_PATH=<updated bundle> node scripts/build-nutrition.mjs
 */
import nutritionArtifact from './data/ingredient-nutrition.json'

export type Per100gNutrition = {
  kcal?: number
  protein_g?: number
  fat_g?: number
  carbs_g?: number
  fiber_g?: number
  sugar_g?: number
  sodium_mg?: number
  calcium_mg?: number
  iron_mg?: number
  potassium_mg?: number
}

export type IngredientNutrition = {
  /** Dictionary key (normalized ingredient name) that produced the match. */
  key: string
  display: string
  fdcId: number | null
  name: string | null
  dataType: string | null
  confidence: number | null
  per100g: Per100gNutrition
}

export const NUTRITION_ATTRIBUTION = 'Nutrition data: USDA FoodData Central'
export const NUTRITION_SOURCE_URL = 'https://fdc.nal.usda.gov'
export const NUTRITION_FETCHED_AT: string | null = nutritionArtifact.fetchedAt ?? null
export const NUTRITION_COVERAGE = nutritionArtifact.coverage as {
  resolved: number
  total: number
}

/** Normalize an ingredient string to the dictionary key form. */
function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

/**
 * Reduce a full ingredient line ("1 large russet potato (boiled and mashed)")
 * toward its dictionary key: drop parenthetical prep notes, then a leading
 * quantity with an optional measure/container word ("4 sheets of"). Mirrors
 * how the dictionary keys were derived from these ingredient lines.
 */
function reduceLine(line: string): string {
  let s = line.replace(/\s*\([^)]*\)/g, '')
  s = s.replace(
    /^\d+(?:[./]\d+)?\s*(?:(?:sheets?|cans?|tins?|packets?|packs?|bunches?|heads?|bulbs?|cloves?|slices?|pieces?|sprigs?|leaves|tablespoons?|teaspoons?|cups?|pounds?|lbs?|ounces?|oz|grams?|g|kg|ml|liters?|litres?|jars?|bottles?|boxes?|bags?|stalks?|stems?|ribs?|ears?|fillets?|steaks?|pinches?|dashes?|handfuls?)\s*)?(?:of\s+)?/i,
    '',
  )
  return s.trim()
}

const entries = nutritionArtifact.entries as Record<
  string,
  {
    display: string
    fdcId: number | null
    name: string | null
    dataType: string | null
    confidence: number | null
    per100g: Per100gNutrition
  }
>

function toNutrition(key: string, entry: (typeof entries)[string]): IngredientNutrition {
  return {
    key,
    display: entry.display,
    fdcId: entry.fdcId,
    name: entry.name,
    dataType: entry.dataType,
    confidence: entry.confidence,
    per100g: entry.per100g,
  }
}

/**
 * Look up per-100g nutrition for a raw ingredient line. Matching is layered
 * and conservative: exact line, then the line minus parentheticals/leading
 * quantity, then the first comma clause — every layer must still hit a
 * dictionary name that FoodData Central actually resolved, so no number is
 * ever invented. Returns null when unresolved; callers render nothing.
 */
export function nutritionForIngredientText(text: string): IngredientNutrition | null {
  const exact = normalize(text)
  if (entries[exact]?.per100g) return toNutrition(exact, entries[exact])

  const reduced = normalize(reduceLine(text))
  if (reduced && entries[reduced]?.per100g) return toNutrition(reduced, entries[reduced])

  const clause = reduced.split(',')[0]
  if (clause && clause !== reduced && entries[clause]?.per100g) {
    return toNutrition(clause, entries[clause])
  }
  return null
}
