'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Flame } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="top"
      className="relative grid min-h-screen grid-cols-1 pt-20 lg:grid-cols-2 lg:pt-0"
    >
      {/* LEFT — editorial copy + condiment artifact */}
      <div className="relative z-10 flex flex-col justify-center gap-8 px-6 py-16 md:px-12 lg:py-0 lg:pl-16 xl:pl-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary"
        >
          <span className="h-px w-10 bg-primary" />
          Vol. I — The Atlas Edition
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl xl:text-7xl"
        >
          The Maghreb
          <span className="block italic text-primary">Culinary Codex</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          120 Authentic Culinary Artifacts from the Atlantic Coast to the Red
          Sea.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#street-food"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
          >
            Explore the Codex
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </motion.a>
          <span className="text-sm text-muted-foreground">
            Saffron M’qualli · Paprika M’hammar
          </span>
        </motion.div>

        {/* Condiment artifact strip */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32 }}
          className="group relative mt-2 aspect-[16/7] w-full max-w-md overflow-hidden rounded-xl border border-border"
        >
          <img
            src="/images/harissa.png"
            alt="Deep red harissa paste with dried chilies and olive oil"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
          <figcaption className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Flame className="h-3.5 w-3.5" />
            </span>
            Harissa · The Ember Base
          </figcaption>
        </motion.figure>
      </div>

      {/* RIGHT — hero tagine centerpiece */}
      <div className="relative min-h-[52vh] overflow-hidden border-t border-border lg:min-h-screen lg:border-l lg:border-t-0">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src="/images/hero-tagine.png"
            alt="Bubbling Moroccan chicken tagine with preserved lemon, olives and saffron sauce"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="grain absolute inset-0 opacity-40" aria-hidden="true" />
        {/* Cinematic vignette blending into the page */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent lg:from-background/90"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Chicken M’qualli · Fès medina
        </motion.div>
      </div>
    </section>
  )
}
