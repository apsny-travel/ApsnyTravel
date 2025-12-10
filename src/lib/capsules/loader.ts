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

// ═══════════════════════════════════════════════════════════════
// CAPSULE IMPORTS - v2.0.0 ApsnyTravel Catalog
// ═══════════════════════════════════════════════════════════════

// ── CATALOG TOURS (Tier 1) ──
import tourRitsaWinter from "@/content/capsules/catalog/tour-ritsa-winter.json";
import tourSochiCity from "@/content/capsules/catalog/tour-sochi-city.json";
import tourNewAthos from "@/content/capsules/catalog/tour-new-athos.json";
import tourGagraPitsunda from "@/content/capsules/catalog/tour-gagra-pitsunda.json";
import tourKrasnayaPolyana from "@/content/capsules/catalog/tour-krasnaya-polyana.json";
import tourOlympicEvening from "@/content/capsules/catalog/tour-olympic-evening.json";
import tourPhotoAbkhazia from "@/content/capsules/catalog/tour-photo-abkhazia.json";
import tourRosaPanorama from "@/content/capsules/catalog/tour-rosa-panorama.json";
import tourSukhum from "@/content/capsules/catalog/tour-sukhum.json";
import tourWinterWaterfalls from "@/content/capsules/catalog/tour-winter-waterfalls.json";

// ── PLACES (Tier 2) ──
import placeRitsa from "@/content/capsules/places/place-ritsa.json";
import placeBlueLakeV2 from "@/content/capsules/places/blue-lake-v2.json";
import placeOlympicPark from "@/content/capsules/places/olympic-park.json";
import place33Waterfalls from "@/content/capsules/places/place-33-waterfalls.json";
import placeGagraColonnade from "@/content/capsules/places/place-gagra-colonnade.json";
import placeRosaKhutor from "@/content/capsules/places/place-rosa-khutor.json";
import placeNewAthosCave from "@/content/capsules/places/place-new-athos-cave.json";
import placeDendrary from "@/content/capsules/places/place-dendrary.json";
import placeSeaPort from "@/content/capsules/places/place-sea-port.json";
import placePitsundaPine from "@/content/capsules/places/place-pitsunda-pine.json";
import placeGazprom from "@/content/capsules/places/place-gazprom.json";
import placeOrekhovsky from "@/content/capsules/places/place-orekhovsky.json";
import placeSukhumEmbankment from "@/content/capsules/places/place-sukhum-embankment.json";

import placeBotanicalGarden from "@/content/capsules/places/place-botanical-garden.json";
import placeNewAthosMonastery from "@/content/capsules/places/place-new-athos-monastery.json";

// Legacy places (for backwards compatibility)
import gagraLegacy from "@/content/capsules/places/gagra.json";

// ── GUIDES (Tier 2) ──
import guideBorderCrossing from "@/content/capsules/guides/guide-border-crossing.json";
import guideAbkhaziaFood from "@/content/capsules/guides/guide-abkhazia-food.json";
import guideWinterTips from "@/content/capsules/guides/guide-winter-tips.json";
import guideSkiComparison from "@/content/capsules/guides/guide-ski-comparison.json";
import guideSochiTransport from "@/content/capsules/guides/guide-sochi-transport.json";
import guidePhotoSpots from "@/content/capsules/guides/guide-photo-spots.json";
import guidePackingList from "@/content/capsules/guides/guide-packing-list.json";
import guideWeatherSeasons from "@/content/capsules/guides/guide-weather-seasons.json";
import guideLocalCustoms from "@/content/capsules/guides/guide-local-customs.json";

/**
 * All capsules indexed by slug
 * Prioritize v2 capsules over legacy ones when slugs match
 */
const capsulesBySlug: Record<string, Capsule> = {
  // ── Tours (Tier 1 Catalog) ──
  "lake-ritsa-winter": tourRitsaWinter as unknown as TourCapsule,
  "sochi-city-tour": tourSochiCity as unknown as TourCapsule,
  "new-athos-cave": tourNewAthos as unknown as TourCapsule,
  "gagra-pitsunda": tourGagraPitsunda as unknown as TourCapsule,
  "krasnaya-polyana-ski": tourKrasnayaPolyana as unknown as TourCapsule,
  "olympic-park-evening": tourOlympicEvening as unknown as TourCapsule,
  "photo-tour-abkhazia": tourPhotoAbkhazia as unknown as TourCapsule,
  "rosa-khutor-panorama": tourRosaPanorama as unknown as TourCapsule,
  "sukhum-heritage": tourSukhum as unknown as TourCapsule,
  "winter-waterfalls": tourWinterWaterfalls as unknown as TourCapsule,
  
  // ── Places (Tier 2) ──
  "lake-ritsa": placeRitsa as unknown as PlaceCapsule,
  "blue-lake": placeBlueLakeV2 as unknown as PlaceCapsule,
  "olympic-park": placeOlympicPark as unknown as PlaceCapsule,
  "33-waterfalls": place33Waterfalls as unknown as PlaceCapsule,
  "gagra-colonnade": placeGagraColonnade as unknown as PlaceCapsule,
  "rosa-khutor": placeRosaKhutor as unknown as PlaceCapsule,
  "new-athos-cave-place": placeNewAthosCave as unknown as PlaceCapsule,
  "sochi-dendrary": placeDendrary as unknown as PlaceCapsule,
  "sochi-sea-port": placeSeaPort as unknown as PlaceCapsule,
  "pitsunda-pine-grove": placePitsundaPine as unknown as PlaceCapsule,
  "gazprom-laura": placeGazprom as unknown as PlaceCapsule,
  "orekhovsky-waterfall": placeOrekhovsky as unknown as PlaceCapsule,
  "sukhum-embankment": placeSukhumEmbankment as unknown as PlaceCapsule,
  "sukhum-botanical-garden": placeBotanicalGarden as unknown as PlaceCapsule,
  "new-athos-monastery": placeNewAthosMonastery as unknown as PlaceCapsule,
  
  // Legacy places (for backwards compatibility)
  "gagra": gagraLegacy as unknown as PlaceCapsule,
  
  // ── Guides (Tier 2) ──
  "border-crossing": guideBorderCrossing as unknown as GuideCapsule,
  "abkhazia-food-guide": guideAbkhaziaFood as unknown as GuideCapsule,
  "winter-travel-tips": guideWinterTips as unknown as GuideCapsule,
  "ski-resorts-comparison": guideSkiComparison as unknown as GuideCapsule,
  "sochi-transport-guide": guideSochiTransport as unknown as GuideCapsule,
  "best-photo-spots": guidePhotoSpots as unknown as GuideCapsule,
  "packing-list": guidePackingList as unknown as GuideCapsule,
  "weather-by-season": guideWeatherSeasons as unknown as GuideCapsule,
  "local-customs-etiquette": guideLocalCustoms as unknown as GuideCapsule,
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
  if (!place.links) return undefined;
  const tourLink = place.links.find((link) => link.rel === "part_of");
  if (!tourLink) return undefined;
  const slug = tourLink.targetSlug || tourLink.target?.replace('tour-', '');
  return slug ? getTourBySlug(slug) : undefined;
}

/**
 * Get nearby places for a place (using "nearby" links)
 */
export function getNearbyPlaces(place: PlaceCapsule): PlaceCapsule[] {
  if (!place.links) return [];
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
