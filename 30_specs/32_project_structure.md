# Project Structure (expected)

- `app/` — Next.js App Router pages/routes (`/`, `/tours`, `/tours/[slug]`, `/places/[slug]`, `/contacts`).
- `content/capsules/`
  - `tours/*.json`
  - `places/*.json`
  - `activities/*.json`
  - `guides/*.json`
- `src/lib/capsules/`
  - `schema.ts` — TS types (see `30_capsule_schema.ts`).
  - `loader.ts` — file-based loading and filtering helpers.
  - `renderLinks.tsx` — deep-link rendering for `[[slug]]`.
- `src/components/` — presentational/layout components.
- `public/` — static assets (images, favicon, etc.).
- `ops/opus/` — this control pack for Claude.

Notes:
- Keep capsule logic centralized; avoid duplicating schema/loader logic elsewhere.
- Keep content in capsules, not in components.
