// patch-page.mjs — insert the packet branch into app/recipes/[id]/page.tsx
import { readFileSync, writeFileSync } from 'node:fs';

const f = 'app/recipes/[id]/page.tsx';
let s = readFileSync(f, 'utf8');
if (s.includes('getPacket')) { console.log('already patched'); process.exit(0); }
const NL = '\r\n';
const imp = "import { getRecipeDetail } from '@/lib/recipe-details'";
if (!s.includes(imp)) { console.error('import anchor missing'); process.exit(1); }
s = s.replace(
  imp,
  imp + NL + "import { getPacket } from '@/lib/packet-bundle';" + NL + "import { renderPacketArticle } from '@/lib/packet-render';",
);
const anchor = '  if (!recipe || !detail) notFound()';
if (!s.includes(anchor)) { console.error('branch anchor missing'); process.exit(1); }
const ins = anchor + NL + NL +
`  // Recipe Finalz presentation-packet rollout (markup contract v1)
  const packet = getPacket(id)
  if (packet) {
    const html = renderPacketArticle(packet, recipe.image)
    return (
      <>
        <DetailNav />
        <main id="main-content" className="relative min-h-screen">
          <div className="mx-auto max-w-3xl px-5 py-10 md:px-8" dangerouslySetInnerHTML={{ __html: html }} />
        </main>
        <SiteFooter />
      </>
    )
  }`.replace(/\n/g, NL);
s = s.replace(anchor, ins);
writeFileSync(f, s);
console.log('page patched:', s.includes('getPacket(id)'));
