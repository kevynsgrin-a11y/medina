import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const TEASERS = [
  {
    id: 1,
    name: 'Tunisian Brik',
    region: 'Tunis',
    tag: 'Street Food',
    image: '/images/tunisian-brik.webp',
    note: 'A molten egg sealed in shattering warqa pastry.',
  },
  {
    id: 2,
    name: 'Egyptian Koshari',
    region: 'Cairo',
    tag: 'Street Food',
    image: '/images/egyptian-koshari.webp',
    note: 'The national bowl: rice, lentils, pasta, fried onion.',
  },
  {
    id: 31,
    name: 'Chicken M’qualli',
    region: 'Fez',
    tag: 'Tagines & Stews',
    image: '/images/hero-tagine.webp',
    note: 'Saffron, preserved lemon, and the patience of a low flame.',
  },
]

export function FeaturedTeasers() {
  return (
    <section className="relative overflow-hidden border-y border-border py-24">
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Selected records</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Three regional dishes to begin with.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TEASERS.map((teaser, index) => (
            <Link
              key={teaser.name}
              href={`/recipes/${teaser.id}`}
              className={`group relative transition-transform duration-300 hover:-translate-y-2 focus-visible:-translate-y-2 ${
                index === 1 ? 'md:mt-12' : ''
              }`}
            >
              <article className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={teaser.image}
                    alt={`${teaser.name} from ${teaser.region}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" aria-hidden="true" />
                  <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {teaser.tag}
                  </span>
                </div>
                <div className="space-y-2 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {teaser.region}
                  </p>
                  <h3 className="flex items-center justify-between gap-2 font-serif text-2xl tracking-tight">
                    {teaser.name}
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" aria-hidden="true" />
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{teaser.note}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
