export type Category =
  | 'Street Food'
  | 'Tagines & Stews'
  | 'Sephardic Traditions'
  | 'Condiments'

export type Recipe = {
  id: number
  name: string
  region: string
  category: Category
  minutes: number
  heat: 1 | 2 | 3
  blurb: string
  image: string
}

export const CATEGORIES: { label: Category; slug: string; note: string }[] = [
  { label: 'Street Food', slug: 'street-food', note: 'Souk & sidewalk' },
  { label: 'Tagines & Stews', slug: 'tagines-stews', note: 'The slow fire' },
  {
    label: 'Sephardic Traditions',
    slug: 'sephardic-traditions',
    note: 'The diaspora table',
  },
  { label: 'Condiments', slug: 'condiments', note: 'The pantry' },
]

const IMG = {
  tagine: '/images/hero-tagine.png',
  brik: '/images/tunisian-brik.png',
  koshari: '/images/egyptian-koshari.png',
  harissa: '/images/harissa.png',
  couscous: '/images/couscous.png',
  street: '/images/street-food.png',
  sephardic: '/images/sephardic.png',
  spices: '/images/spices.png',
  pastilla: '/images/pastilla.png',
  condiments: '/images/condiments.png',
  tea: '/images/mint-tea.png',
} as const

type Seed = [name: string, region: string, image: string]

const STREET: Seed[] = [
  ['Tunisian Brik', 'Tunis', IMG.brik],
  ['Egyptian Koshari', 'Cairo', IMG.koshari],
  ['Maakouda Potato Fritters', 'Casablanca', IMG.street],
  ['Merguez in Khobz', 'Algiers', IMG.street],
  ['Bocadillo de Calamares', 'Tangier', IMG.street],
  ['Sfenj Doughnuts', 'Fez', IMG.pastilla],
  ['Bessara Fava Soup', 'Chefchaouen', IMG.koshari],
  ['Hawawshi', 'Alexandria', IMG.street],
  ['Ta’ameya Falafel', 'Cairo', IMG.street],
  ['Fricassé Sandwich', 'Sousse', IMG.brik],
  ['Chapati Zanzibari', 'Djerba', IMG.pastilla],
  ['Karantita', 'Oran', IMG.koshari],
  ['Mahjouba Semolina Crêpe', 'Constantine', IMG.street],
  ['Grilled Sardine Skewers', 'Essaouira', IMG.street],
  ['Snail Babbouche Broth', 'Marrakech', IMG.tagine],
  ['Msemen with Amlou', 'Agadir', IMG.pastilla],
  ['Feseekh Rolls', 'Rosetta', IMG.street],
  ['Lablabi Chickpea Bowl', 'Kairouan', IMG.koshari],
  ['Kebda Iskandarani', 'Alexandria', IMG.street],
  ['Zaalouk Baguette', 'Rabat', IMG.harissa],
  ['Batbout Sliders', 'Meknes', IMG.street],
  ['Chakchouka Wrap', 'Gabès', IMG.sephardic],
  ['Fried Whitebait Cornet', 'Bizerte', IMG.brik],
  ['Harira Night Cup', 'Marrakech', IMG.tagine],
  ['Mombar Rice Sausage', 'Giza', IMG.koshari],
  ['Kaak Warka Rings', 'Tunis', IMG.pastilla],
  ['Grilled Corn with Cumin', 'Casablanca', IMG.spices],
  ['Douara Offal Skewers', 'Fez', IMG.street],
  ['Sardine Chermoula Roll', 'Safi', IMG.harissa],
  ['Roasted Chestnut Cone', 'Blida', IMG.spices],
]

const TAGINES: Seed[] = [
  ['Chicken M’qualli with Preserved Lemon', 'Fez', IMG.tagine],
  ['Lamb M’hammar', 'Marrakech', IMG.tagine],
  ['Kefta Mkaouara', 'Rabat', IMG.sephardic],
  ['Seven-Vegetable Couscous', 'Casablanca', IMG.couscous],
  ['Lamb Tangia', 'Marrakech', IMG.tagine],
  ['Beef Tagine with Prunes', 'Meknes', IMG.tagine],
  ['Fish Tagine Chermoula', 'Essaouira', IMG.harissa],
  ['Chicken Pastilla', 'Fez', IMG.pastilla],
  ['Rfissa with Fenugreek', 'Rabat', IMG.tagine],
  ['Djej Bil Zaytoun', 'Tlemcen', IMG.tagine],
  ['Mrouzia Honey Lamb', 'Marrakech', IMG.tagine],
  ['Chtitha Djej', 'Algiers', IMG.sephardic],
  ['Loubia White Bean Stew', 'Oujda', IMG.koshari],
  ['Molokhia with Rabbit', 'Cairo', IMG.sephardic],
  ['Fasolia Green Bean Stew', 'Damietta', IMG.koshari],
  ['Camel Meat Tagine', 'Guelmim', IMG.tagine],
  ['Quince & Lamb Tagine', 'Sefrou', IMG.tagine],
  ['Artichoke & Pea Tagine', 'Kénitra', IMG.couscous],
  ['Bakoula Mallow Stew', 'Salé', IMG.sephardic],
  ['Chicken with Almonds & Eggs', 'Tétouan', IMG.tagine],
  ['Sardine Meatball Tagine', 'Safi', IMG.harissa],
  ['Kaddid Dried Beef Couscous', 'Sfax', IMG.couscous],
  ['Marqa Hlowa Sweet Stew', 'Constantine', IMG.tagine],
  ['Osban Stuffed Tripe', 'Gabès', IMG.sephardic],
  ['Chakhchoukha Ravioli Stew', 'Biskra', IMG.harissa],
  ['Dfina Sabbath Stew', 'Marrakech', IMG.sephardic],
  ['Berkoukes Pearl Couscous', 'Sétif', IMG.couscous],
  ['Lamb & Cardoon Tagine', 'Azrou', IMG.tagine],
  ['Squid & Chickpea Marqa', 'Tangier', IMG.harissa],
  ['Goat Tagine with Figs', 'Beni Mellal', IMG.tagine],
]

const SEPHARDIC: Seed[] = [
  ['Shakshuka', 'Tétouan', IMG.sephardic],
  ['Mafroum Stuffed Potatoes', 'Tripoli', IMG.sephardic],
  ['Pkaila Spinach & Beans', 'Tunis', IMG.sephardic],
  ['Chraime Spiced Fish', 'Tripoli', IMG.harissa],
  ['Skhina Sabbath Stew', 'Fez', IMG.sephardic],
  ['Mina de Matza', 'Tangier', IMG.pastilla],
  ['Boyos de Pan', 'Tétouan', IMG.pastilla],
  ['Sfenj for Hanukkah', 'Marrakech', IMG.pastilla],
  ['Trout with Preserved Lemon', 'Sefrou', IMG.harissa],
  ['Couscous with Osban', 'Djerba', IMG.couscous],
  ['Fijuelas Fried Ribbons', 'Casablanca', IMG.pastilla],
  ['Adafina Chickpea Pot', 'Meknes', IMG.sephardic],
  ['Huevos Haminados', 'Tangier', IMG.sephardic],
  ['Lubia Black-Eyed Peas', 'Tunis', IMG.koshari],
  ['Tbikha Vegetable Stew', 'Sousse', IMG.sephardic],
  ['Sfiria Chicken Croquettes', 'Fez', IMG.sephardic],
  ['Mouna Sweet Bread', 'Oran', IMG.pastilla],
  ['Pastel de Carne', 'Tétouan', IMG.pastilla],
  ['Ktzitzot Fish Cakes', 'Essaouira', IMG.harissa],
  ['Marqa Batata Sweet-Sour', 'Constantine', IMG.tagine],
  ['Dafina with Kouclas', 'Rabat', IMG.sephardic],
  ['Fritada de Espinaca', 'Tangier', IMG.sephardic],
  ['Debla Fried Roses', 'Tunis', IMG.pastilla],
  ['Salona Sweet Fish', 'Alexandria', IMG.harissa],
  ['Bomba Rice Timbale', 'Tétouan', IMG.koshari],
  ['Ojja with Merguez', 'Sfax', IMG.sephardic],
  ['Kaak Anise Rings', 'Fez', IMG.pastilla],
  ['Loubia b’Dersa', 'Oujda', IMG.koshari],
  ['Terfess Desert Truffle Stew', 'Ghardaïa', IMG.tagine],
  ['Boulettes de Poisson', 'Casablanca', IMG.harissa],
]

const CONDIMENTS: Seed[] = [
  ['Harissa Paste', 'Nabeul', IMG.harissa],
  ['Preserved Lemons', 'Safi', IMG.condiments],
  ['Chermoula Marinade', 'Essaouira', IMG.harissa],
  ['Ras el Hanout Blend', 'Marrakech', IMG.spices],
  ['Smen Aged Butter', 'Fez', IMG.condiments],
  ['Amlou Argan Spread', 'Agadir', IMG.condiments],
  ['Dukkah Nut Blend', 'Cairo', IMG.spices],
  ['Tabil Tunisian Spice', 'Tunis', IMG.spices],
  ['Zhug Green Chili', 'Alexandria', IMG.harissa],
  ['Matbucha Cooked Salad', 'Tétouan', IMG.harissa],
  ['Filfel Chuma', 'Tripoli', IMG.harissa],
  ['Baharat Warm Blend', 'Cairo', IMG.spices],
  ['Charmoula Verte', 'Rabat', IMG.condiments],
  ['Torshi Pickled Turnips', 'Alexandria', IMG.condiments],
  ['Slata Mechouia', 'Sousse', IMG.harissa],
  ['Argan Oil Pressing', 'Taroudant', IMG.condiments],
  ['Orange Blossom Water', 'Marrakech', IMG.tea],
  ['Pickled Wild Cardoon', 'Meknes', IMG.condiments],
  ['Zaatar Herb Blend', 'Cairo', IMG.spices],
  ['Harissa Rose Petal', 'Kairouan', IMG.harissa],
  ['Berbere-Adjacent Felfla', 'Ghardaïa', IMG.spices],
  ['Confit Garlic in Smen', 'Fez', IMG.condiments],
  ['Preserved Green Chilies', 'Gabès', IMG.harissa],
  ['Msir Salt-Cured Citrus', 'Beni Mellal', IMG.condiments],
  ['Chili Oil Zeit Har', 'Sfax', IMG.harissa],
  ['Toasted Cumin Salt', 'Casablanca', IMG.spices],
  ['Rose & Sesame Sprinkle', 'Fez', IMG.spices],
  ['Fermented Caper Berries', 'Tangier', IMG.condiments],
  ['Mint Tea Base', 'Marrakech', IMG.tea],
  ['Saffron Threads M’qualli', 'Taliouine', IMG.spices],
]

const BLURBS: Record<Category, string[]> = {
  'Street Food': [
    'Griddle-hot and built for the walk home — crunch first, questions later.',
    'The sidewalk classic that taught a city how to snack.',
    'Fried to a whisper-thin shatter and gone in three bites.',
    'Sold by weight, seasoned by instinct, eaten standing up.',
  ],
  'Tagines & Stews': [
    'Coaxed for hours over a low flame until the sauce turns to velvet.',
    'The conical lid does the work — you just wait and breathe the steam.',
    'Slow, patient, and unapologetically rich with spice.',
    'A one-pot argument for why time is the best ingredient.',
  ],
  'Sephardic Traditions': [
    'Carried across borders and kept alive at the Sabbath table.',
    'A recipe with two homelands and a single, unmistakable soul.',
    'Simmered overnight so the morning could taste of memory.',
    'The diaspora on a plate — sweet, savory, and centuries deep.',
  ],
  Condiments: [
    'The pantry cornerstone that seasons a hundred other dishes.',
    'A jar of pure intent — heat, acid, and perfume in balance.',
    'Made once, hoarded always, spooned onto everything.',
    'The quiet foundation beneath every great Maghrebi meal.',
  ],
}

function buildCategory(seeds: Seed[], category: Category, start: number): Recipe[] {
  const blurbs = BLURBS[category]
  return seeds.map((seed, i) => ({
    id: start + i,
    name: seed[0],
    region: seed[1],
    image: `/images/recipes/${start + i}.png`,
    category,
    minutes: 20 + ((i * 13) % 160),
    heat: ((i % 3) + 1) as 1 | 2 | 3,
    blurb: blurbs[i % blurbs.length],
  }))
}

export const RECIPES: Recipe[] = [
  ...buildCategory(STREET, 'Street Food', 1),
  ...buildCategory(TAGINES, 'Tagines & Stews', 31),
  ...buildCategory(SEPHARDIC, 'Sephardic Traditions', 61),
  ...buildCategory(CONDIMENTS, 'Condiments', 91),
]
