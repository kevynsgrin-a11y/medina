import Link from 'next/link'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return (
    <>
      <DetailNav />
      <main id="main-content" className="relative flex min-h-[100svh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 pt-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">№404</p>
          <h1 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            This record isn’t catalogued.
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            The page you’re looking for isn’t in the codex. Try the index instead.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
          >
            Back to the Codex
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
