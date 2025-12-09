# Content Prompt Template (capsule creation/refinement)

Use this when generating or editing capsules.

1) Pick type and identity  
- type: tour | place | activity | guide  
- id convention: `<type>-<slug>`; slug lower-kebab; lang (ru/en).

2) Required fields  
- `title`, `summary`, optional `heroImage`.  
- `content.surface` (short hook).  
- `content.body` (Markdown allowed) with `[[slug]]` deep-links to existing capsules where relevant.  
- `meta`: region (abkhazia | sochi | ...); optional season[], duration, difficulty, priceFrom, tier, tags, coordinates.

3) Graph (`links[]`)  
- `rel` in contains | part_of | nearby | related | recommends.  
- `targetSlug` must match an existing capsule.  
- v0 defaults: tour contains places; place part_of tour; optional nearby/related.

4) Tone and accuracy  
- Honest, calm, helpful; no invented attractions or fake prices.  
- If data unknown, omit or mark as TBD only when asked.  
- Use deep-links consistently when referencing existing capsules.

5) Output format  
- JSON matching the schema; ensure valid UTF-8 and proper quoting.  
- Keep ASCII where practical; non-ASCII is fine for Russian copy when needed.
