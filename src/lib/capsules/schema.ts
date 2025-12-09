// file: src/lib/capsules/schema.ts
// ApsnyTravel Capsule Schema - TypeScript type definitions

/**
 * Supported capsule types for v0.0.0
 */
export type CapsuleType = "tour" | "place";

/**
 * Supported languages
 */
export type Language = "ru";

/**
 * Difficulty levels for tours
 */
export type Difficulty = "easy" | "moderate" | "hard";

/**
 * Seasons when a tour operates
 */
export type Season = "winter" | "spring" | "summer" | "autumn";

/**
 * Relationship types between capsules
 */
export type RelationType = "contains" | "part_of" | "nearby" | "related";

/**
 * A link/relationship to another capsule
 */
export interface CapsuleLink {
  rel: RelationType;
  targetSlug: string;
}

/**
 * Content block with surface (short) and body (full) text
 */
export interface CapsuleContent {
  /** One-line hook/pitch for cards and previews */
  surface: string;
  /** Full Markdown body with [[slug]] deep-links */
  body: string;
}

/**
 * Geographic coordinates (optional for v0)
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
  summary: string;
  heroImage?: string;
  content: CapsuleContent;
  links: CapsuleLink[];
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
  duration: string;
  difficulty: Difficulty;
  priceFrom: number;
  priceCurrency?: string;
  season: Season[];
  tier?: "standard" | "comfort" | "premium";
  maxGroupSize?: number;
  meetingPoint?: string;
  includes?: string[];
  excludes?: string[];
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
}

/**
 * Union type for any capsule
 */
export type Capsule = TourCapsule | PlaceCapsule;

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
