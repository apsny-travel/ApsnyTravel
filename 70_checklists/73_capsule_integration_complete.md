# Capsule Integration Complete ✅

## Schema v2.0.0 Upgrade

The capsule schema has been upgraded to support the Living Knowledge Graph v2 architecture:

### New Types
- `guide` - Practical guides and how-tos
- `product` - Additional products/experiences

### New Features
- **Content Layers**: `surface`, `middle`, `deep` for progressive disclosure
- **Experiential Metadata**: emotional_tone, difficulty, sensory_profile
- **Freshness Tracking**: seasonal_relevance, freshness_score
- **Extended Relations**: recommends, included_in, has_topic, emotional_resonance

## Capsule Files

### Tours (catalog/)
| File | Slug | Status |
|------|------|--------|
| tour-ritsa-winter.json | lake-ritsa-winter | ✅ V2 |
| tour-sochi-city.json | sochi-city | ✅ V2 |
| tour-new-athos.json | new-athos-cave | ✅ V2 |

### Places
| File | Slug | Status |
|------|------|--------|
| ritsa.json | lake-ritsa | ✅ V2 |
| blue-lake-v2.json | blue-lake | ✅ V2 |
| olympic-park.json | olympic-park | ✅ V2 |
| gagra.json | gagra | Legacy V1 |

### Guides
| File | Slug | Status |
|------|------|--------|
| guide-border-crossing.json | border-crossing | ✅ V2 |

## Loader Functions

```typescript
// Core
getAllCapsules(): Capsule[]
getCapsuleBySlug(slug: string): Capsule | undefined

// Type-specific
getAllTours(): TourCapsule[]
getAllPlaces(): PlaceCapsule[]
getAllGuides(): GuideCapsule[]
getTourBySlug(slug: string): TourCapsule | undefined
getPlaceBySlug(slug: string): PlaceCapsule | undefined
getGuideBySlug(slug: string): GuideCapsule | undefined

// Relations
getRelatedPlacesForTour(tour): PlaceCapsule[]
getParentTourForPlace(place): TourCapsule | undefined
getNearbyPlaces(place): PlaceCapsule[]

// Helpers
getCapsulePrice(capsule): number | undefined
getCapsuleRegion(capsule): string | undefined
getCapsuleDuration(capsule): string | undefined
getCapsuleTags(capsule): string[]
getCapsuleContentBody(capsule): string
resolveDeepLinks(markdown): string

// Static Params
getAllTourSlugs(): string[]
getAllPlaceSlugs(): string[]
getAllGuideSlugs(): string[]
```

## Schema Helpers

```typescript
getCapsuleBody(capsule): string
getCapsuleSurface(capsule): string
isTourCapsule(capsule): boolean
isPlaceCapsule(capsule): boolean
isGuideCapsule(capsule): boolean
isProductCapsule(capsule): boolean
```

## Pages

| Route | Component | Status |
|-------|-----------|--------|
| / | HomePage | ✅ V2 Compatible |
| /tours | ToursPage | ✅ V2 Compatible |
| /tours/[slug] | TourDetailPage | ✅ V2 Compatible |
| /places/[slug] | PlaceDetailPage | ✅ V2 Compatible |
| /guides/[slug] | GuideDetailPage | ✅ New |
| /contacts | ContactsPage | ✅ |

## Components Updated

- **TourCard** - Handles v1/v2 season, duration, price + emoji
- **PlaceCard** - Highlights, emoji, duration formats
- **MarkdownContent** - Resolves [[slug]] deep links
- **Header** - Added Guides nav link

## Deep Links

The Markdown content supports `[[slug]]` syntax for inter-capsule links:

```markdown
Visit [[lake-ritsa]] and stop at [[blue-lake]] on the way.
```

Resolved to:
```markdown
Visit [Озеро Рица](/places/lake-ritsa) and stop at [Голубое озеро](/places/blue-lake) on the way.
```

## Next Steps

1. Add more capsules as content grows
2. Implement search/filtering on tours page
3. Add map visualization for places
4. Create more guide capsules for common questions
