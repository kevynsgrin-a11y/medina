// Monetization layer: curated "Shop this recipe" product suggestions.
//
// Uses Amazon Associates search-link affiliate URLs (no hardcoded ASINs, so
// links never go stale/discontinued). Replace the tag below with your real
// Associates tracking ID once approved — see README.md "Affiliate setup".
import type { Category, Recipe } from './recipes'

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || 'tasteofmedina-20'

export function amazonSearchUrl(query: string): string {
  const params = new URLSearchParams({ k: query, tag: AMAZON_TAG })
  return `https://www.amazon.com/s?${params.toString()}`
}

export type ShopProduct = {
  id: string
  label: string
  note: string
  query: string
  /** Recipe ids where suggesting this product would be redundant (the recipe *is* this product, from scratch). */
  excludeRecipeIds?: number[]
  test: (ingredientText: string) => boolean
}

const has = (kw: string) => (text: string) => text.includes(kw)
const hasAny =
  (...kws: string[]) =>
  (text: string) =>
    kws.some((k) => text.includes(k))

export const PANTRY_PRODUCTS: ShopProduct[] = [
  {
    id: 'harissa-paste',
    label: 'Prepared Harissa Paste',
    note: 'For nights you skip making it from scratch.',
    query: 'Moroccan Tunisian harissa paste jar',
    excludeRecipeIds: [91, 110],
    test: has('harissa'),
  },
  {
    id: 'preserved-lemons',
    label: 'Preserved Lemons',
    note: 'The jarred kind, ready to rinse and chop.',
    query: 'preserved lemons jar Moroccan',
    excludeRecipeIds: [92],
    test: has('preserved lemon'),
  },
  {
    id: 'ras-el-hanout',
    label: 'Ras el Hanout Blend',
    note: "Morocco's house spice blend, pre-mixed.",
    query: 'ras el hanout spice blend',
    excludeRecipeIds: [94],
    test: has('ras el hanout'),
  },
  {
    id: 'saffron-threads',
    label: 'Saffron Threads',
    note: 'True Crocus sativus threads, not a substitute powder.',
    query: 'pure saffron threads',
    excludeRecipeIds: [120],
    test: has('saffron'),
  },
  {
    id: 'orange-blossom-water',
    label: 'Orange Blossom Water',
    note: 'Culinary-grade hydrosol for pastries and tea.',
    query: 'culinary orange blossom water food grade',
    excludeRecipeIds: [107],
    test: hasAny('orange blossom water', 'orange blossom'),
  },
  {
    id: 'rose-water',
    label: 'Rose Water',
    note: 'Food-grade, for syrups and sprinkles.',
    query: 'culinary rose water food grade',
    test: hasAny('rose water', 'rosewater'),
  },
  {
    id: 'argan-oil-culinary',
    label: 'Culinary Argan Oil',
    note: 'Roasted, food-grade — the safe substitute for home pressing.',
    query: 'culinary edible argan oil food grade',
    excludeRecipeIds: [106],
    test: hasAny('argan oil', 'argan'),
  },
  {
    id: 'amlou',
    label: 'Amlou Almond-Argan Spread',
    note: "Moroccan breakfast spread, if you'd rather not grind your own.",
    query: 'amlou almond argan spread Moroccan',
    excludeRecipeIds: [96],
    test: has('amlou'),
  },
  {
    id: 'zaatar',
    label: 'Za’atar Herb Blend',
    note: 'Thyme, sumac, and sesame, pre-toasted.',
    query: 'zaatar spice blend',
    excludeRecipeIds: [109],
    test: hasAny('za’atar', "za'atar", 'zaatar'),
  },
  {
    id: 'sumac',
    label: 'Ground Sumac',
    note: 'The tart, brick-red finishing spice.',
    query: 'ground sumac spice',
    test: has('sumac'),
  },
  {
    id: 'dukkah',
    label: 'Dukkah Nut & Spice Blend',
    note: 'Egyptian nut-and-spice dip, ready-made.',
    query: 'dukkah spice blend Egyptian',
    excludeRecipeIds: [97],
    test: has('dukkah'),
  },
  {
    id: 'tahini',
    label: 'Tahini (Sesame Paste)',
    note: 'Smooth, stone-ground, for falafel sauce and dressings.',
    query: 'tahini sesame paste',
    test: has('tahini'),
  },
  {
    id: 'pomegranate-molasses',
    label: 'Pomegranate Molasses',
    note: 'Tart-sweet reduction for glazes and dressings.',
    query: 'pomegranate molasses',
    test: has('pomegranate molasses'),
  },
  {
    id: 'malsouka-warqa',
    label: 'Malsouka / Warqa Pastry Sheets',
    note: 'Frozen sheets, or the spring-roll-wrapper substitute.',
    query: 'malsouka warqa brik pastry sheets frozen',
    test: hasAny('malsouka', 'warqa', 'brik pastry', 'spring-roll wrapper', 'spring roll wrapper'),
  },
  {
    id: 'semolina-flour',
    label: 'Fine Semolina Flour',
    note: 'For khobz, msemen, and batbout doughs.',
    query: 'fine semolina flour baking',
    test: has('semolina'),
  },
  {
    id: 'couscous',
    label: 'Moroccan Couscous',
    note: 'Fine-grain, steams up light in 5 minutes.',
    query: 'Moroccan couscous fine grain',
    test: has('couscous'),
  },
  {
    id: 'dried-fava',
    label: 'Dried Split Fava Beans',
    note: 'For bessara and ta’ameya.',
    query: 'dried split fava beans peeled',
    test: has('fava'),
  },
  {
    id: 'rice-vermicelli',
    label: 'Broken Vermicelli Noodles',
    note: 'For koshari and rice pilafs.',
    query: 'broken vermicelli noodles pasta',
    test: has('vermicelli'),
  },
  {
    id: 'fenugreek-seed',
    label: 'Fenugreek Seeds',
    note: 'For rfissa and spice blends.',
    query: 'whole fenugreek seeds',
    test: has('fenugreek'),
  },
  {
    id: 'whole-cloves',
    label: 'Whole Cloves',
    note: 'For warming spice mixes and mulled tea.',
    query: 'whole cloves spice',
    test: (t) => /(?<!garlic )\bcloves?\b/i.test(t),
  },
  {
    id: 'moroccan-olives',
    label: 'Moroccan / Kalamata Olives',
    note: 'Brined, pitted, ready for the tagine.',
    query: 'Moroccan oil-cured olives jar',
    test: (t) => /\bolives?\b(?!\s*oil)/i.test(t),
  },
  {
    id: 'medjool-dates',
    label: 'Medjool Dates',
    note: 'For tagines, pastries, and mint tea service.',
    query: 'Medjool dates',
    test: has('date'),
  },
  {
    id: 'gunpowder-tea-mint',
    label: 'Gunpowder Green Tea + Dried Spearmint',
    note: 'The Moroccan mint tea base.',
    query: 'gunpowder green tea dried spearmint Moroccan mint tea',
    excludeRecipeIds: [119],
    test: hasAny('green tea', 'tea leaves', ' mint'),
  },
  {
    id: 'dried-limes',
    label: 'Dried Black Limes (Loomi)',
    note: 'Sun-dried limes for deep, tart, smoky broths.',
    query: 'dried black limes loomi',
    test: has('dried lime'),
  },
]

export type EquipmentProduct = {
  id: string
  label: string
  note: string
  query: string
  test: (recipe: Pick<Recipe, 'name' | 'category'>) => boolean
}

export const EQUIPMENT_PRODUCTS: EquipmentProduct[] = [
  {
    id: 'tagine-pot',
    label: 'Clay Tagine Pot',
    note: 'The conical lid that makes the sauce.',
    query: 'Moroccan clay tagine pot for cooking',
    test: (r) => r.category === 'Tagines & Stews',
  },
  {
    id: 'couscoussier',
    label: 'Couscoussier Steamer Pot',
    note: 'For properly steamed (not boiled) couscous.',
    query: 'couscoussier steamer pot',
    test: (r) => r.name.toLowerCase().includes('couscous'),
  },
  {
    id: 'tea-glasses-set',
    label: 'Moroccan Tea Glasses + Teapot',
    note: 'For serving mint tea the traditional way.',
    query: 'Moroccan tea glasses teapot set',
    test: (r) => r.name.toLowerCase().includes('tea') || r.name.toLowerCase().includes('mint'),
  },
  {
    id: 'deep-fry-thermometer',
    label: 'Deep-Fry Thermometer',
    note: 'Every recipe here calls for a measured oil temperature — this is how.',
    query: 'deep fry candy thermometer',
    test: (r) => r.category === 'Street Food',
  },
  {
    id: 'canning-jars',
    label: 'Canning / Pickling Jars',
    note: 'For preserved lemons, pickles, and jarred condiments.',
    query: 'wide mouth glass canning jars pint',
    test: (r) => r.category === 'Condiments',
  },
]

export type ShopLink = { id: string; label: string; note: string; url: string }

export function shopLinksForRecipe(recipe: Recipe, ingredientTexts: string[], max = 4): ShopLink[] {
  const haystack = ingredientTexts.map((t) => t.toLowerCase()).join(' | ')
  const pantryMatches = PANTRY_PRODUCTS.filter(
    (p) => !p.excludeRecipeIds?.includes(recipe.id) && p.test(haystack),
  )
  const equipmentMatches = EQUIPMENT_PRODUCTS.filter((p) => p.test(recipe))

  const combined = [...pantryMatches, ...equipmentMatches]
  const deduped = combined.filter((p, i) => combined.findIndex((q) => q.id === p.id) === i)

  return deduped.slice(0, max).map((p) => ({
    id: p.id,
    label: p.label,
    note: p.note,
    url: amazonSearchUrl(p.query),
  }))
}
