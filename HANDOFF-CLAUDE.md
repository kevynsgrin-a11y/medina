# HANDOFF → Claude: medina — establish intent, then audit + test backfill

**Created:** 2026-10-02 by ZCode (fleet audit 2026-10-01). **Branch:** `handoff/claude-audit` (cut from main).
**The loop:** you audit + advise → write `RECOMMENDATIONS-CLAUDE.md` (spec at bottom) →
Kevyn feeds it to ZCode for execution. You advise; you do not execute, merge, or deploy.

## What this build is

tasteofmedina.com — Moroccan and North African cuisine/recipe site (per its GitHub
description). TypeScript site on `main`. **The audit's first finding is already known:
there is no README** (or it is empty) — intent must be reconstructed from code. Its
sister sites in the utility portfolio (norcook — Nordic cookbook, 2 tests; the
maghreb-culinary-codex — citable FDC nutrient records; nordic-culinary-platform) are
the closest references for what this was meant to be.

## Verified current status

Zero tests. No visible TODO debt. Last commit 2026-07-13 locally — the site predates
the fleet's current conventions and has not been pulled into them.

## The audit ask

1. **Reconstruct intent (the priority)**: from the code, data files, and the sister
   sites, write down what this build IS — pages, data model, any recipe-content
   pipeline, deployment target. Then judge: does the implementation cohere, or is it a
   stalled scaffold? Deliverable: a README draft embedded in the recommendations.
2. **Sister-site delta**: compare against norcook (the closest shipped sibling): what
   does norcook have that medina lacks (tests, CI, data validation, SEO surface)? That
   delta is the modernization backlog.
3. **Content reality-check**: is the recipe content real and complete, seeded, or
   placeholder? For a cuisine site, content IS the product — count it.
4. **Test/backfill strategy**: same fleet pattern as ScamWire/kbbqguide — data-integrity
   suite over the recipe/dish data shape (frontmatter completeness, unique slugs, image
   references resolve, category enums), plus any pure utils. Name the files + asserts.
5. **Verdict**: invest (modernize to fleet standard + content pass) or park (freeze
   content, keep domain). Either way the README draft is worth having.

## Fleet constraints

Live site — no deploys. Never merge. Secrets via vault. tsx + node:assert or vitest —
match whatever the repo's tooling implies, else fleet default.

## Deliverable spec

`RECOMMENDATIONS-CLAUDE.md` in repo root (this branch): `## Verdict` (invest/park) ·
`## Findings` (P1/P2/P3 with file:line + content census) · `## Execution plan` (ordered;
README first, then tests; branch names + verification commands) ·
`## Operator decisions needed`.
