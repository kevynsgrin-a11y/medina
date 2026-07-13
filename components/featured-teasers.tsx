'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const MotionLink = motion.create(Link)

const TEASERS = [
  {
    id: 1,
    name: 'Tunisian Brik',
    region: 'Tunis',
    tag: 'Street Food',
    image: '/images/tunisian-brik.png',
    note: 'A molten egg sealed in shattering warqa pastry.',
    delay: 0,
  },
  {
    id: 2,
    name: 'Egyptian Koshari',
    region: 'Cairo',
    tag: 'Street Food',
    image: '/images/egyptian-koshari.png',
    note: 'The national bowl: rice, lentils, pasta, fried onion.',
    delay: 0.6,
  },
  {
    id: 31,
    name: 'Chicken M’qualli',
    region: 'Fez',
    tag: 'Tagines & Stews',
    image: '/images/hero-tagine.png',
    note: 'Saffron, preserved lemon, and the patience of a low flame.',
    delay: 1.2,
  },
]

export function FeaturedTeasers() {
  return (
    <section className="relative overflow-hidden border-y border-border py-24">
      <div
        className="grain pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            Selected Plates
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Artifacts worth crossing the medina for.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TEASERS.map((t, i) => (
            <MotionLink
              key={t.name}
              href={`/recipes/${t.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: t.delay,
                }}
                className={`relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/40 ${
                  i === 1 ? 'md:mt-12' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={t.image || '/placeholder.svg'}
                    alt={`${t.name} from ${t.region}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {t.tag}
                  </span>
                </div>
                <div className="space-y-2 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t.region}
                  </p>
                  <h3 className="flex items-center justify-between gap-2 font-serif text-2xl tracking-tight">
                    {t.name}
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                    {t.note}
                  </p>
                </div>
              </motion.div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  )
}
