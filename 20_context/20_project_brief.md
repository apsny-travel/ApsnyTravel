# ApsnyTravel — Project Brief (v0.0.0)

## Snapshot
- Family project: father = real guide in Sochi/Abkhazia, son = developer.
- Purpose: small, honest site that sells one flagship winter tour and doubles as a mini-guide.
- Stack: Next.js App Router + TypeScript + Tailwind; static/SSG only; capsules as content.

## Goals for v0.0.0 (Between Zero and One)
- Ship a minimal but real site for winter season: one flagship tour (lake-ritsa-winter) plus a few key places (gagra, blue-lake, lake-ritsa).
- Make it trustworthy and readable; no startup fluff.
- Keep everything capsule-first so adding tours/places later is easy.

## What “small and honest” means
- Focus on core routes: `/`, `/tours`, `/tours/[slug]`, `/places/[slug]`, `/contacts`.
- No DB/CMS/auth/booking; static files only.
- Deep-links and graph edges make the site feel like a guide, not just a catalog.
- Copy tone: warm, calm, factual; helps a real person choose or at least learn.
