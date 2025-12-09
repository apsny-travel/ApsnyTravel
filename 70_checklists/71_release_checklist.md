# Release Checklist

## Tech
- Install, build, and production export succeed; no fatal console errors.
- Static generation covers required routes; no missing data at build time.
- Lint/tests (if present) pass.

## Content and links
- Capsules present for `lake-ritsa-winter`, `gagra`, `blue-lake`, `lake-ritsa`.
- Deep-links map to existing capsules; `links[].targetSlug` valid.
- Meta/title/description set for key routes (at least sensible defaults).

## UX
- Header/footer/nav visible and working on mobile/desktop.
- Text readable on dark base; Cloud Dancer accent used sparingly for contrast.
- Contacts page shows phone/messengers clearly.

## Final pass
- Pages load without obvious layout breakage on common breakpoints.
- No hidden scope creep (no booking/auth/search slipped in).
