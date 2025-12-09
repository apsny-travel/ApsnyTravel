# ApsnyTravel — Guardrails for Claude Opus 4.5

## Purpose
Defines hard lines and anti-patterns. Default to the stricter interpretation; keep v0.0.0 small, static, capsule-first.

## Absolute NOs (v0.0.0)
- Infrastructure: no databases, no headless CMS, no remote content APIs, no complex backend services.
- Auth/payments: no login, no accounts, no booking/checkout/payment flows.
- Stack changes: do not replace Next.js, TypeScript, or Tailwind; avoid heavy state libs (Redux/MobX/Zustand, etc.).
- Scope creep: no search, filters, dashboards, referrals, or roadmap-v1 features unless explicitly requested; no large refactors without cause.

## Architecture Anti-Patterns
- Ignoring capsule primacy: no hard-coded business content in components; do not duplicate capsule data.
- Scattered capsule logic: centralize schema/loader/deep-link rendering under `src/lib/capsules/`; avoid multiple inconsistent loaders.
- Over-abstraction: skip factories/plugins/meta-frameworks; prefer small explicit modules.
- Breaking SSG: no runtime fetch for core content; all data must be available at build time.

## Content Anti-Patterns
- Hallucinated content: do not invent tours/places/prices; if unknown, omit or mark as TBD when asked.
- Ignoring deep-links: when a capsule exists, reference it via `[[slug]]`; avoid plain-text references that should link.
- Broken graph: `links[].targetSlug` must exist; avoid dead ends and mismatched slugs vs ids.

## Process Anti-Patterns
- Ignoring roadmap/phase: do not implement v1 ideas during v0.0.0 tasks.
- Hidden work: do not introduce major changes without stating them; avoid rewriting unrelated areas.
- Unsafe edits: avoid destructive commands; keep changes reversible.

## How to respond to conflicts
1) Name the conflict and cite the guardrail.  
2) Offer the smallest compliant alternative (usually static/file-based).  
3) If the human insists, warn about impact and proceed only with explicit approval.

## Minimal success criteria
- Static generation intact; capsules remain the single source of truth.  
- Deep-links resolve to existing capsules; graph edges are valid.  
- UI stays within the defined tone; no aggressive marketing fluff.  
- The code stays small, readable, and easy for one dev to extend.
