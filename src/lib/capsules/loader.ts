// file: src/lib/capsules/loader.ts
// Capsule loader - reads JSON capsules at build time

import { Capsule, TourCapsule, PlaceCapsule, isTourCapsule, isPlaceCapsule } from "./schema";

// Import all capsules statically for SSG
import lakeRitsaWinter from "@/content/capsules/tours/lake-ritsa-winter.json";
import gagra from "@/content/capsules/places/gagra.json";
import blueLake from "@/content/capsules/places/blue-lake.json";
import lakeRitsa from "@/content/capsules/places/lake-ritsa.json";

/**
 * All capsules indexed by slug
 */
const capsulesBySlug: Record<string, Capsule> = {
  "lake-ritsa-winter": lakeRitsaWinter as TourCapsule,
  "gagra": gagra as PlaceCapsule,
  "blue-lake": blueLake as PlaceCapsule,
  "lake-ritsa": lakeRitsa as PlaceCapsule,
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
 * Get related places for a tour (using "contains" links)
 */
export function getRelatedPlacesForTour(tour: TourCapsule): PlaceCapsule[] {
  const placeSlugs = tour.links
    .filter((link) => link.rel === "contains")
    .map((link) => link.targetSlug);

  return placeSlugs
    .map((slug) => getPlaceBySlug(slug))
    .filter((place): place is PlaceCapsule => place !== undefined);
}

/**
 * Get the parent tour for a place (using "part_of" links)
 */
export function getParentTourForPlace(place: PlaceCapsule): TourCapsule | undefined {
  const tourLink = place.links.find((link) => link.rel === "part_of");
  if (!tourLink) return undefined;
  return getTourBySlug(tourLink.targetSlug);
}

/**
 * Get nearby places for a place (using "nearby" links)
 */
export function getNearbyPlaces(place: PlaceCapsule): PlaceCapsule[] {
  const nearbySlugs = place.links
    .filter((link) => link.rel === "nearby")
    .map((link) => link.targetSlug);

  return nearbySlugs
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

    const path = isTourCapsule(capsule) ? `/tours/${slug}` : `/places/${slug}`;
    return `[${capsule.title}](${path})`;
  });
}
