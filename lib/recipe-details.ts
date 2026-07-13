// Deep recipe content (ingredients, method, provenance) sourced from the
// North African & Related Regional Recipe Compendium, July 2026 edition.
// Kept as a separate data module from lib/recipes.ts (which powers the
// homepage grid/cards) so the detail layer can grow without touching the
// homepage's data contract.
import raw from './data/recipe-details.json'

export type IngredientEntry =
  | { type: 'item'; text: string }
  | { type: 'group'; text: string }

export type NoteLabel = 'Accuracy note' | 'Safety note'

export type RecipeDetail = {
  id: number
  name: string
  originStatus: string
  yieldText: string
  timeText: string
  ingredientsHeader: 'Ingredients' | 'Materials'
  ingredients: IngredientEntry[]
  method: string[]
  noteLabel: NoteLabel
  accuracyNote: string
  crossRefCodes: string[]
  /** Optional kitchen tip from the finalized recipe development pass. */
  chefsNote?: string
  /** Free-text names of the web sources consulted while finalizing the recipe.
   * Rendered as attributions; linked when the name resolves to a known source. */
  finalizedSources?: string[]
}

export const RECIPE_DETAILS: RecipeDetail[] = raw as RecipeDetail[]

const BY_ID = new Map<number, RecipeDetail>(RECIPE_DETAILS.map((r) => [r.id, r]))

export function getRecipeDetail(id: number): RecipeDetail | undefined {
  return BY_ID.get(id)
}
