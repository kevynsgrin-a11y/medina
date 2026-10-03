// export-packets.mjs — copy composed tasteofmedina packets into the repo
// keyed by the SITE's numeric recipe id, matched by folded recipe name.
// Hero images are per-id: /images/recipes/<id>.webp (site-authoritative).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_SRC = 'C:/Users/Dell/Recipe Finalz/presentation/out/tasteofmedina';

const fold = (x) =>
  String(x).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

// roster: parse the four seed arrays in declaration order; ids assigned by
// buildCategory (STREET start 1, TAGINES 31, SEPHARDIC 61, CONDIMENTS 91)
const src = readFileSync('lib/recipes.ts', 'utf8').replace(/\r/g, '');
const groups = ['STREET', 'TAGINES', 'SEPHARDIC', 'CONDIMENTS'];
const starts = { STREET: 1, TAGINES: 31, SEPHARDIC: 61, CONDIMENTS: 91 };
const roster = [];
for (const g of groups) {
  const open = src.indexOf(`const ${g}: Seed[] = [`) + `const ${g}: Seed[] = [`.length;
  const j = src.indexOf('\n]', open);
  const names = [...src.slice(open, j).matchAll(/\['([^']+)',/g)].map((m) => m[1]);
  names.forEach((name, k) => roster.push({ id: starts[g] + k, name }));
}
if (roster.length !== 120) { console.error(`roster parse got ${roster.length}, want 120`); process.exit(1); }

const packets = readdirSync(OUT_SRC).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
const taken = new Map(); // packetSlug -> siteId
const usedName = new Set();
for (const p of packets) {
  const pf = fold(p);
  let hit = roster.find((r) => !usedName.has(r.id) && fold(r.name) === pf);
  if (!hit) hit = roster.find((r) => !usedName.has(r.id) && (() => { const f = fold(r.name); return f.length >= 6 && (f.includes(pf) || pf.includes(f)); })());
  if (!hit) hit = roster.find((r) => !usedName.has(r.id) && (() => {
    const want = new Set(p.split(/[^a-z0-9]+/).filter((t) => t.length > 2));
    const have = new Set(fold(r.name).split(/(?=[A-Z])/).flatMap((w) => w.split(/[^a-z0-9]/)).filter(Boolean));
    let n = 0; for (const t of want) if (fold(r.name).includes(t)) n++;
    return want.size && n / want.size >= 0.6;
  })());
  if (hit) { taken.set(p, hit.id); usedName.add(hit.id); }
}

mkdirSync('content/packets', { recursive: true });
for (const [p, id] of taken) {
  const packet = JSON.parse(readFileSync(join(OUT_SRC, p + '.json'), 'utf8'));
  if (!/<figure data-block="step"/.test(packet.skeleton)) { console.log(`degenerate skeleton (skip): ${p}`); continue; }
  writeFileSync(join('content/packets', `${id}.json`), JSON.stringify(packet));
}
writeFileSync('lib/packet-ids.json', JSON.stringify({ ids: [...taken.values()].sort((a, b) => a - b) }, null, 1));
const unmatched = packets.filter((p) => !taken.has(p));
const missing = roster.filter((r) => !usedName.has(r.id));
console.log(`mapped ${taken.size}/120 site recipes; unmatched packets: ${unmatched.length ? unmatched.join(', ') : 'none'}`);
if (missing.length) console.log('site recipes without packets:', missing.map((r) => `${r.id}:${r.name}`).join(' | '));
