'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Flame } from 'lucide-react'
import type { Recipe } from '@/lib/recipes'
import type { RecipeDetail } from '@/lib/recipe-details'

export function RecipeHero({ recipe, detail }: { recipe: Recipe; detail: RecipeDetail }) {
  return (
    <section className="relative grid min-h-[70vh] grid-cols-1 pt-20 lg:grid-cols-2 lg:pt-0">
      <div className="relative min-h-[42vh] overflow-hidden border-b border-border lg:min-h-[70vh] lg:border-b-0 lg:border-r">
        <Image
          src={recipe.image || '/placeholder.svg'}
          alt={`${recipe.name}, a ${recipe.category.toLowerCase()} dish from ${recipe.region}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover"
        />
        <div className="grain absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/90"
          aria-hidden="true"
        />
        <span className="absolute left-5 top-5 rounded-full bg-background/70 px-3 py-1.5 font-mono text-xs tracking-widest text-primary backdrop-blur-sm">
          №{String(recipe.id).padStart(3, '0')}
        </span>
        <div className="absolute right-5 top-5 flex gap-1 rounded-full bg-background/70 px-2.5 py-1.5 backdrop-blur-sm">
          {[1, 2, 3].map((n) => (
            <Flame
              key={n}
              className={`h-3.5 w-3.5 ${n <= recipe.heat ? 'text-accent' : 'text-muted-foreground/30'}`}
              fill={n <= recipe.heat ? 'currentColor' : 'none'}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center gap-6 px-6 py-14 md:px-12 lg:py-0 lg:pl-16 xl:pl-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary"
        >
          <span className="h-px w-10 bg-primary" />
          {recipe.category}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06 }}
          className="font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl"
        >
          {recipe.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty"
        >
          {detail.originStatus}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-sm"
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {detail.timeText}
          </span>
          <span className="text-muted-foreground">
            <span className="text-foreground">Yield</span> · {detail.yieldText}
          </span>
          <span className="text-muted-foreground">
            <span className="text-foreground">Region</span> · {recipe.region}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
