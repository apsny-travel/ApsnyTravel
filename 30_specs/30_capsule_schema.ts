/**
 * Capsule types used across ApsnyTravel.
 */
export type CapsuleType = "tour" | "place" | "activity" | "guide";

/**
 * Graph relationship types between capsules.
 */
export type CapsuleLinkRelation =
  | "contains"
  | "part_of"
  | "nearby"
  | "related"
  | "recommends";

/**
 * Directed edge in the capsule graph.
 */
export interface CapsuleLink {
  /**
   * Relationship type (contains, part_of, etc.).
   */
  rel: CapsuleLinkRelation;

  /**
   * Target capsule slug (must match another capsule's slug).
   */
  targetSlug: string;
}

/**
 * Structured content of a capsule.
 */
export interface CapsuleContent {
  /**
   * Short hook (1–2 sentences).
   */
  surface: string;

  /**
   * Main body content (Markdown allowed), may include [[slug]] deep-links.
   */
  body: string;

  /**
   * Optional deeper, wiki-like text.
   */
  deep?: string;
}

/**
 * Metadata for filtering and display.
 */
export interface CapsuleMeta {
  /**
   * Region where the capsule is relevant.
   */
  region: "abkhazia" | "sochi";

  /**
   * Human-readable duration (e.g., "10-12 часов").
   */
  duration?: string;

  /**
   * Difficulty of the route or activity.
   */
  difficulty?: "easy" | "medium" | "hard";

  /**
   * Starting price in rubles. Omit if unknown.
   */
  priceFrom?: number;

  /**
   * Seasons when this capsule is most relevant.
   */
  season?: Array<"winter" | "spring" | "summer" | "autumn">;

  /**
   * Importance tier (1 = core, 2 = secondary).
   */
  tier?: 1 | 2;

  /**
   * Free-form tags.
   */
  tags?: string[];

  /**
   * Optional coordinates [lat, lng].
   */
  coordinates?: [number, number];
}

/**
 * Capsule is the primary content unit (tour, place, activity, guide).
 */
export interface Capsule {
  // Identity
  id: string; // convention: "<type>-<slug>"
  type: CapsuleType;
  slug: string; // lower-kebab, route-friendly
  lang: "ru" | "en";

  // Presentation
  title: string;
  summary: string;
  heroImage?: string;

  // Content
  content: CapsuleContent;

  // Metadata
  meta: CapsuleMeta;

  // Graph
  links?: CapsuleLink[];
}
