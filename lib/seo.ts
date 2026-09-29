// Query-aligned <title>/<meta description> helpers for the 2026-09-29
// page-two SERP push. Query/position data lives in the PR description;
// overrides exist only where the ranking query's phrasing differs from the
// dish name. Facts (region, category, blurb) stay as authored in recipes.ts.
// Titles carry no brand suffix here — app/layout.tsx appends the site name
// via its title template, and the SERP budget is ~60 characters (the first
// deploy doubled the suffix; this keeps titles single-branded).
import type { Recipe } from './recipes'

// id -> title text (brand appended by the layout template).
const TITLE_OVERRIDES: Record<number, string> = {
  // GSC Sep: "bakoula" pos 14, "bakoula recipe" 10, "bakoula moroccan" 11
  49: 'Bakoula Recipe — Moroccan Mallow Stew',
  // GSC Sep: "amlou msemen" pos 6
  16: 'Amlou Msemen Recipe — Moroccan Flatbread',
  // GSC Sep: "algerian crepes" pos 12
  13: 'Mahjouba — Algerian Crêpes Recipe',
}

const DESCRIPTION_OVERRIDES: Record<number, string> = {
  49: 'How to cook bakoula, the Moroccan mallow greens dish — wilted with garlic, olives, and preserved lemon.',
  16: 'Msemen with amlou: flaky Moroccan flatbread squares dipped in almond-argan spread, from Agadir.',
}

export function recipeSeoTitle(recipe: Recipe): string {
  return TITLE_OVERRIDES[recipe.id] ?? `${recipe.name} Recipe`
}

export function recipeSeoDescription(recipe: Recipe): string {
  const base =
    DESCRIPTION_OVERRIDES[recipe.id] ??
    `${recipe.blurb} Traditional recipe from ${recipe.region}.`
  return base.slice(0, 155)
}
