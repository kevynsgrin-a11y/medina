import Link from 'next/link'
import { ExternalLink, ShoppingBag } from 'lucide-react'
import type { Recipe } from '@/lib/recipes'
import type { RecipeDetail } from '@/lib/recipe-details'
import { shopLinksForRecipe } from '@/lib/affiliates'

export function ShopModule({ recipe, detail }: { recipe: Recipe; detail: RecipeDetail }) {
  const ingredientTexts = detail.ingredients
    .filter((e) => e.type === 'item')
    .map((e) => e.text)
  const links = shopLinksForRecipe(recipe, ingredientTexts)

  if (links.length === 0) return null

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
        <ShoppingBag className="h-3.5 w-3.5" />
        Shop this recipe
      </p>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Disclosure: We may earn a commission if you buy through links on this page, at no
        additional cost to you.{' '}
        <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-primary">
          Learn more
        </Link>
        .
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="sponsored noopener nofollow"
              className="group flex items-start justify-between gap-3 rounded-lg border border-border/60 p-3 text-sm transition-colors hover:border-primary/50"
            >
              <span>
                <span className="block font-medium text-foreground/90">{link.label}</span>
                <span className="block text-xs text-muted-foreground">{link.note}</span>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
