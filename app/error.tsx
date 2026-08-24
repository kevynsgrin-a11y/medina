'use client'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="flex min-h-[100svh] flex-col items-center justify-center gap-5 px-5 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-primary">Archive notice</p>
      <h1 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
        This page could not be loaded.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        Please try again. If the issue continues, return to the recipe index and revisit the
        record later.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
      >
        Try again
      </button>
    </main>
  )
}
