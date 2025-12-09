# Routes and Pages (v0.0.0)

All routes must be statically generated from capsules.

## Required routes
- `/` (Home): highlight flagship tour `lake-ritsa-winter`, feature a few places, lead to catalog and contacts.
- `/tours`: list all tour capsules.
- `/tours/[slug]`: render a tour capsule by slug; show content, deep-links, and graph (contains/related).
- `/places/[slug]`: render a place capsule by slug; show content and tours where this place is `part_of`.
- `/contacts`: simple, honest contact options (phone/messengers).

## Data binding
- Pages must source domain content from JSON capsules under `content/capsules/**`.
- Deep-links `[[slug]]` resolve to internal routes based on capsule type.
- Graph edges `links[]` drive contains, part_of, nearby, related, recommends sections.

## Flagship and seed data (v0.0.0)
- Tour: `lake-ritsa-winter`.
- Places: `gagra`, `blue-lake`, `lake-ritsa`.
- Tour contains those places; each place is `part_of` the tour.
