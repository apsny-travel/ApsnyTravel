// file: src/lib/capsules/schema.ts
// ApsnyTravel Capsule Schema v2.0.0 - TypeScript type definitions

/**
 * Supported capsule types
 */
export type CapsuleType = "tour" | "place" | "guide" | "product";

/**
 * Supported languages
 */
export type Language = "ru" | "en";

/**
 * Difficulty levels
 */
export type Difficulty = "easy" | "moderate" | "hard";

/**
 * Seasons
 */
export type Season = "winter" | "spring" | "summer" | "autumn";

/**
 * Relationship types between capsules
 */
export type RelationType = 
  | "contains" 
  | "part_of" 
  | "nearby" 
  | "related" 
  | "recommends"
  | "included_in"
  | "has_topic"
  | "applies_to"
  | "emotional_resonance";

/**
 * A link/relationship to another capsule (v2 schema)
 */
export interface CapsuleLink {
  rel: RelationType;
  target?: string;
  targetSlug?: string;
  weight?: number;
  weights?: {
    static?: number;
    behavioral?: number;
    temporal?: number;
  };
  note?: string;
}

/**
 * Content layers (v2 schema)
 */
export interface ContentLayers {
  surface: string;
  middle: string;
  deep: string;
}

/**
 * Content block - supports both v1 (surface/body) and v2 (content_layers) formats
 */
export interface CapsuleContent {
  /** One-line hook/pitch for cards and previews */
  surface: string;
  /** Full Markdown body with [[slug]] deep-links */
  body: string;
}

/**
 * Experiential metadata (v2 schema)
 */
export interface Experiential {
  emotional_tone?: {
    inspiring?: number;
    adventurous?: number;
    peaceful?: number;
    mysterious?: number;
    nostalgic?: number;
  };
  difficulty?: {
    physical?: number;
    cultural?: number;
    logistical?: number;
  };
  sensory_profile?: {
    visual?: number;
    auditory?: number;
    gustatory?: number;
    olfactory?: number;
    tactile?: number;
  };
}

/**
 * Freshness metadata (v2 schema)
 */
export interface Freshness {
  created?: string;
  updated?: string;
  seasonal_relevance?: Season[];
  freshness_score?: number;
}

/**
 * Metadata (v2 schema)
 */
export interface CapsuleMeta {
  region?: string;
  tags?: string[];
  coordinates?: [number, number];
  season?: string;
  duration?: string;
  price_from?: number;
  difficulty?: string;
}

/**
 * Geographic coordinates
 */
export interface GeoCoordinates {
  lat: number;
  lng: number;
}

/**
 * Base capsule fields shared by all capsule types
 */
export interface BaseCapsule {
  id: string;
  type: CapsuleType;
  slug: string;
  lang: Language;
  title: string;
  subtitle?: string;
  summary: string;
  heroImage?: string;
  emoji?: string;
  tier?: number;
  
  // Content - supports both formats
  content?: CapsuleContent | string;
  content_layers?: ContentLayers;
  
  // Metadata
  meta?: CapsuleMeta;
  experiential?: Experiential;
  freshness?: Freshness;
  metadata?: {
    created?: string;
    updated?: string;
    version?: string;
    schema_version?: string;
    enriched?: string;
    author?: string;
  };
  
  // Graph
  links: CapsuleLink[];
  
  // Legacy fields
  tags?: string[];
  region?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Tour-specific fields
 */
export interface TourCapsule extends BaseCapsule {
  type: "tour";
  duration?: string;
  difficulty?: Difficulty;
  priceFrom?: number;
  priceCurrency?: string;
  season?: Season[] | string;
  tier?: number;
  maxGroupSize?: number;
  meetingPoint?: string;
  includes?: string[];
  excludes?: string[];
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
}

/**
 * Place-specific fields
 */
export interface PlaceCapsule extends BaseCapsule {
  type: "place";
  geo?: GeoCoordinates;
  altitude?: number;
  bestTime?: string;
  visitDuration?: string;
  highlights?: string[];
  practicalInfo?: {
    entryFee?: string;
    hours?: string;
    temperature?: string;
    bestTime?: string;
    facilities?: string[];
  };
}

/**
 * Guide-specific fields
 */
export interface GuideCapsule extends BaseCapsule {
  type: "guide";
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
}

/**
 * Product-specific fields (additional tours/experiences)
 */
export interface ProductCapsule extends BaseCapsule {
  type: "product";
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
}

/**
 * Union type for any capsule
 */
export type Capsule = TourCapsule | PlaceCapsule | GuideCapsule | ProductCapsule;

/**
 * Type guard for tour capsules
 */
export function isTourCapsule(capsule: Capsule): capsule is TourCapsule {
  return capsule.type === "tour";
}

/**
 * Type guard for place capsules
 */
export function isPlaceCapsule(capsule: Capsule): capsule is PlaceCapsule {
  return capsule.type === "place";
}

/**
 * Type guard for guide capsules
 */
export function isGuideCapsule(capsule: Capsule): capsule is GuideCapsule {
  return capsule.type === "guide";
}

/**
 * Type guard for product capsules  
 */
export function isProductCapsule(capsule: Capsule): capsule is ProductCapsule {
  return capsule.type === "product";
}

/**
 * Get content body from capsule (handles both v1 and v2 formats)
 */
export function getCapsuleBody(capsule: Capsule): string {
  if (capsule.content_layers) {
    return capsule.content_layers.middle || capsule.content_layers.surface;
  }
  if (typeof capsule.content === "string") {
    return capsule.content;
  }
  if (capsule.content?.body) {
    return capsule.content.body;
  }
  return capsule.summary || "";
}

/**
 * Get surface content from capsule
 */
export function getCapsuleSurface(capsule: Capsule): string {
  if (capsule.content_layers) {
    return capsule.content_layers.surface;
  }
  if (typeof capsule.content === "object" && capsule.content?.surface) {
    return capsule.content.surface;
  }
  return capsule.summary || "";
}
