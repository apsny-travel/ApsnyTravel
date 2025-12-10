// file: src/lib/capsules/loader.ts
// Capsule loader v2.0.0 - reads JSON capsules at build time

import { 
  Capsule, 
  TourCapsule, 
  PlaceCapsule, 
  GuideCapsule,
  isTourCapsule, 
  isPlaceCapsule,
  isGuideCapsule,
  getCapsuleBody
} from "./schema";

// Import all capsules statically for SSG
// Legacy tours
import lakeRitsaWinterLegacy from "@/content/capsules/tours/lake-ritsa-winter.json";

// Legacy places
import gagraLegacy from "@/content/capsules/places/gagra.json";
import blueLakeLegacy from "@/content/capsules/places/blue-lake.json";
import lakeRitsaLegacy from "@/content/capsules/places/lake-ritsa.json";

// New v2 catalog tours
import tourRitsaWinter from "@/content/capsules/catalog/tour-ritsa-winter.json";
import tourSochiCity from "@/content/capsules/catalog/tour-sochi-city.json";
import tourNewAthos from "@/content/capsules/catalog/tour-new-athos.json";

// New v2 places
import placeRitsa from "@/content/capsules/places/ritsa.json";
import placeBlueLakeV2 from "@/content/capsules/places/blue-lake-v2.json";
import placeOlympicPark from "@/content/capsules/places/olympic-park.json";

// Guides
import guideBorderCrossing from "@/content/capsules/guides/guide-border-crossing.json";

/**
 * All capsules indexed by slug
 * Prioritize v2 capsules over legacy ones when slugs match
 */
const capsulesBySlug: Record<string, Capsule> = {
  // Tours - v2 catalog
  "lake-ritsa-winter": tourRitsaWinter as unknown as TourCapsule,
  "sochi-city": tourSochiCity as unknown as TourCapsule,
  "new-athos-cave": tourNewAthos as unknown as TourCapsule,
  
  // Places - v2
  "lake-ritsa": placeRitsa as unknown as PlaceCapsule,
  "blue-lake": placeBlueLakeV2 as unknown as PlaceCapsule,
  "olympic-park": placeOlympicPark as unknown as PlaceCapsule,
  
  // Legacy places (for backwards compatibility)
  "gagra": gagraLegacy as unknown as PlaceCapsule,
  
  // Guides
  "border-crossing": guideBorderCrossing as unknown as GuideCapsule,
};

/**
 * Get all capsules
 */
export function getAllCapsules(): Capsule[] {
  return Object.values(capsulesBySlug);
}

/**
 * Get a capsule by slug
 */
export function getCapsuleBySlug(slug: string): Capsule | undefined {
  return capsulesBySlug[slug];
}

/**
 * Get all tour capsules
 */
export function getAllTours(): TourCapsule[] {
  return getAllCapsules().filter(isTourCapsule);
}

/**
 * Get all place capsules
 */
export function getAllPlaces(): PlaceCapsule[] {
  return getAllCapsules().filter(isPlaceCapsule);
}

/**
 * Get all guide capsules
 */
export function getAllGuides(): GuideCapsule[] {
  return getAllCapsules().filter(isGuideCapsule);
}

/**
 * Get a tour by slug
 */
export function getTourBySlug(slug: string): TourCapsule | undefined {
  const capsule = getCapsuleBySlug(slug);
  return capsule && isTourCapsule(capsule) ? capsule : undefined;
}

/**
 * Get a place by slug
 */
export function getPlaceBySlug(slug: string): PlaceCapsule | undefined {
  const capsule = getCapsuleBySlug(slug);
  return capsule && isPlaceCapsule(capsule) ? capsule : undefined;
}

/**
 * Get a guide by slug
 */
export function getGuideBySlug(slug: string): GuideCapsule | undefined {
  const capsule = getCapsuleBySlug(slug);
  return capsule && isGuideCapsule(capsule) ? capsule : undefined;
}

/**
 * Get related places for a tour (using "contains" links)
 */
export function getRelatedPlacesForTour(tour: TourCapsule): PlaceCapsule[] {
  const placeSlugs = tour.links
    .filter((link) => link.rel === "contains")
    .map((link) => link.targetSlug || link.target?.replace('place-', ''));

  return placeSlugs
    .filter((slug): slug is string => slug !== undefined)
    .map((slug) => getPlaceBySlug(slug))
    .filter((place): place is PlaceCapsule => place !== undefined);
}

/**
 * Get the parent tour for a place (using "part_of" links)
 */
export function getParentTourForPlace(place: PlaceCapsule): TourCapsule | undefined {
  const tourLink = place.links.find((link) => link.rel === "part_of");
  if (!tourLink) return undefined;
  const slug = tourLink.targetSlug || tourLink.target?.replace('tour-', '');
  return slug ? getTourBySlug(slug) : undefined;
}

/**
 * Get nearby places for a place (using "nearby" links)
 */
export function getNearbyPlaces(place: PlaceCapsule): PlaceCapsule[] {
  const nearbySlugs = place.links
    .filter((link) => link.rel === "nearby")
    .map((link) => link.targetSlug || link.target?.replace('place-', ''));

  return nearbySlugs
    .filter((slug): slug is string => slug !== undefined)
    .map((slug) => getPlaceBySlug(slug))
    .filter((p): p is PlaceCapsule => p !== undefined);
}

/**
 * Get all tour slugs (for static params generation)
 */
export function getAllTourSlugs(): string[] {
  return getAllTours().map((tour) => tour.slug);
}

/**
 * Get all place slugs (for static params generation)
 */
export function getAllPlaceSlugs(): string[] {
  return getAllPlaces().map((place) => place.slug);
}

/**
 * Convert [[slug]] deep-links in Markdown to actual links
 */
export function resolveDeepLinks(markdown: string): string {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (match, slug) => {
    const capsule = getCapsuleBySlug(slug);
    if (!capsule) {
      console.warn(`Deep-link reference not found: ${slug}`);
      return match; // Keep original if not found
    }

    let path: string;
    if (isTourCapsule(capsule)) {
      path = `/tours/${slug}`;
    } else if (isPlaceCapsule(capsule)) {
      path = `/places/${slug}`;
    } else if (isGuideCapsule(capsule)) {
      path = `/guides/${slug}`;
    } else {
      path = `/${slug}`;
    }
    
    return `[${capsule.title}](${path})`;
  });
}

/**
 * Get capsule content body (handles v1 and v2 formats)
 */
export function getCapsuleContentBody(capsule: Capsule): string {
  return getCapsuleBody(capsule);
}

/**
 * Get capsule price (handles different field names)
 */
export function getCapsulePrice(capsule: Capsule): number | undefined {
  if (isTourCapsule(capsule)) {
    return capsule.priceFrom || capsule.meta?.price_from;
  }
  return undefined;
}

/**
 * Get capsule region
 */
export function getCapsuleRegion(capsule: Capsule): string | undefined {
  return capsule.meta?.region || capsule.region;
}

/**
 * Get capsule duration
 */
export function getCapsuleDuration(capsule: Capsule): string | undefined {
  if (isTourCapsule(capsule)) {
    return capsule.duration || capsule.meta?.duration;
  }
  return capsule.meta?.duration;
}

/**
 * Get capsule tags
 */
export function getCapsuleTags(capsule: Capsule): string[] {
  return capsule.meta?.tags || capsule.tags || [];
}

/**
 * Get all guide slugs (for static params generation)
 */
export function getAllGuideSlugs(): string[] {
  return getAllGuides().map((guide) => guide.slug);
}
