import Link from 'next/link'
import type { RecipeDetail } from '@/lib/recipe-details'

export function RecipeProvenance({ detail }: { detail: RecipeDetail }) {
  const sourceCount = detail.crossRefCodes.length + (detail.finalizedSources?.length ?? 0)

  return (
    <section className="rounded-xl border border-border bg-card/60 p-5" aria-labelledby="provenance-heading">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">Record status</p>
      <h2 id="provenance-heading" className="mt-2 font-serif text-2xl tracking-tight">
        Editorial provenance
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        This entry is part of a source-led culinary archive. It should be read as an editorial
        recipe record, not as a claim of individual kitchen testing or a single definitive version
        of a living regional tradition.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {sourceCount > 0
          ? `${sourceCount} source reference${sourceCount === 1 ? '' : 's'} are listed with this record where available.`
          : 'Source references are being documented for this record.'}{' '}
        <Link href="/editorial-standards" className="underline underline-offset-2 hover:text-primary">
          Read the editorial standards
        </Link>
        .
      </p>
    </section>
  )
}
