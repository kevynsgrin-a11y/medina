import type { Metadata } from 'next'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | The Maghreb Culinary Codex',
  description:
    'How The Maghreb Culinary Codex uses affiliate links to support the archive.',
}

export default function AffiliateDisclosurePage() {
  return (
    <main className="relative min-h-screen">
      <DetailNav />
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">The Codex</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
          Affiliate Disclosure
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
          <p>
            The Maghreb Culinary Codex is an independent editorial archive. Some pages —
            including individual recipe entries — contain “Shop this recipe” links to
            specialty ingredients, cookware, and books referenced in our source guide.
          </p>
          <p>
            Some of these are <strong>affiliate links</strong>, primarily through the Amazon
            Associates program. If you click one and make a qualifying purchase, we may earn
            a small commission — at no additional cost to you. Prices are set by the
            retailer and are unaffected by whether you use our link.
          </p>
          <p>
            We only link to products and books that are directly relevant to the recipe or
            citation on the page. Affiliate relationships never influence which recipes we
            publish, how they’re written, or what the Accuracy and Safety notes say.
          </p>
          <p>
            Links to the regional recipe archives, food-safety authorities, and other
            reference sites cited throughout the Codex (marked in each entry’s
            “Cross-checked against” list) are <strong>not</strong> affiliate links — they’re
            provided purely for attribution and further reading.
          </p>
          <p className="text-muted-foreground">
            Questions about this policy can be sent to the contact address listed in our
            About page.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
