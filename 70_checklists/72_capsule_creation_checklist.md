# Capsule Creation Checklist

1) Choose type and identity  
- type: tour | place | activity | guide.  
- id: `<type>-<slug>`; slug lower-kebab; lang set.

2) Fill required fields  
- title, summary, optional heroImage.  
- content.surface (short hook).  
- content.body (Markdown ok) with `[[slug]]` deep-links to existing capsules where appropriate.  
- meta.region (abkhazia|sochi|...), season?, duration?, difficulty?, priceFrom?, tier?, tags?, coordinates?.

3) Graph links  
- Add `links[]` with rel (contains | part_of | nearby | related | recommends) and valid `targetSlug`.  
- Ensure the target capsule exists; avoid dead ends.

4) Validate  
- JSON is well-formed; matches schema.  
- Deep-links point to real capsules; routes will exist for those slugs.

5) Place the file correctly  
- `content/capsules/tours/*.json`, `places/*.json`, etc. Keep naming consistent with id/slug.

6) Test in app  
- Build or run dev; open the route; check deep-links and graph sections render correctly.
