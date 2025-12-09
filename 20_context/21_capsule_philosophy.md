# Capsule Philosophy

## Core idea
- Everything important is a capsule (tour, place, activity, guide).
- Capsules live in `content/capsules/**` as JSON and are the single source of truth.
- Components render capsules; business text should not be scattered in JSX.

## Deep-links
- `content.body` may contain `[[slug]]`; each must map to an existing capsule.
- Routing rules (v0): tour → `/tours/[slug]`, place → `/places/[slug]`; guides/activities follow the same pattern when added.
- Deep-links create a wiki-like feel: reading a tour surfaces places, and place pages point back to tours.

## Graph edges (`links[]`)
- `rel` values: contains | part_of | nearby | related | recommends.
- Typical v0 usage: tour contains places; place part_of tour; nearby/related to show adjacency.
- `targetSlug` must exist; avoid dangling edges.

## Why capsules
- One mental model for all domain content.
- Easy SSG: load JSON at build time, no runtime dependencies.
- Extensible: adding a tour/place is a content change, not a code rewrite.
