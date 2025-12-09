# v0.0.0 Roadmap — "Between Zero and One"

## Goal
Ship a small, honest static site for winter season that a real customer can use.

## Scope
- 1 flagship winter tour: `lake-ritsa-winter`.
- 3 key places: `gagra`, `blue-lake`, `lake-ritsa`.
- Required routes: `/`, `/tours`, `/tours/[slug]`, `/places/[slug]`, `/contacts`.
- Static/SSG only; capsules as the single source of truth.

## Priorities
1) Capsule completeness and graph correctness (deep-links resolve).  
2) Pages render cleanly with the defined UI tone.  
3) Contacts are obvious and trustworthy.  
4) Build and production export succeed without runtime deps.

## Out of scope (for v0.0.0)
- Additional tours/places beyond the flagship trio unless explicitly requested.
- Booking, payments, auth, dashboards, search/filters.
- Large design system or complex state management.
