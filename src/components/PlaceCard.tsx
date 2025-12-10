// file: src/components/PlaceCard.tsx
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PlaceCapsule } from "@/lib/capsules/schema";

interface PlaceCardProps {
  place: PlaceCapsule;
  size?: "small" | "medium";
}

export default function PlaceCard({ place, size = "medium" }: PlaceCardProps) {
  const isSmall = size === "small";
  
  // Get visit duration from either format
  const visitDuration = place.visitDuration || place.meta?.duration;

  return (
    <Link href={`/places/${place.slug}`} className="block group">
      <article
        className={`bg-navy-800 rounded-lg overflow-hidden border border-navy-700 card-hover ${
          isSmall ? "" : "md:flex"
        }`}
      >
        {/* Image */}
        <div
          className={`relative bg-navy-700 ${
            isSmall ? "h-32" : "h-40 md:h-auto md:w-48 md:flex-shrink-0"
          }`}
        >
          {place.heroImage ? (
            <Image
              src={place.heroImage}
              alt={place.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-navy-600" />
            </div>
          )}
          {/* Emoji Badge */}
          {place.emoji && (
            <div className="absolute top-2 left-2">
              <span className="text-xl">{place.emoji}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-4 ${isSmall ? "" : "flex-1"}`}>
          <h4
            className={`font-semibold text-cloud-dark group-hover:text-winter-blue transition-colors ${
              isSmall ? "text-base mb-1" : "text-lg mb-2"
            }`}
          >
            {place.title}
          </h4>
          <p
            className={`text-cloud-muted ${
              isSmall ? "text-xs line-clamp-2" : "text-sm line-clamp-2"
            }`}
          >
            {place.summary}
          </p>

          {/* Meta */}
          {!isSmall && visitDuration && (
            <div className="mt-3 pt-3 border-t border-navy-700">
              <span className="text-cloud-muted text-xs">
                Время посещения: {visitDuration}
              </span>
            </div>
          )}
          
          {/* Highlights */}
          {!isSmall && place.highlights && place.highlights.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {place.highlights.slice(0, 3).map((highlight, idx) => (
                <span key={idx} className="text-xs bg-navy-700 text-cloud-muted px-2 py-0.5 rounded">
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
