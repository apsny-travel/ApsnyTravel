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
        className={`bg-cloud-soft rounded-xl overflow-hidden border border-cloud-cream shadow-soft card-hover ${
          isSmall ? "" : "md:flex"
        }`}
      >
        {/* Image */}
        <div
          className={`relative bg-cloud-warm overflow-hidden ${
            isSmall ? "h-32" : "h-40 md:h-auto md:w-48 md:flex-shrink-0"
          }`}
        >
          {place.heroImage ? (
            <Image
              src={place.heroImage}
              alt={place.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lake-muted to-emerald-50">
              <MapPin className="w-10 h-10 text-lake/30" />
            </div>
          )}
          {/* Emoji Badge */}
          {place.emoji && (
            <div className="absolute top-2 left-2">
              <span className="text-xl drop-shadow-lg">{place.emoji}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-4 ${isSmall ? "" : "flex-1"}`}>
          <h4
            className={`font-semibold text-ink-950 group-hover:text-emerald transition-colors ${
              isSmall ? "text-base mb-1" : "text-lg mb-2"
            }`}
          >
            {place.title}
          </h4>
          <p
            className={`text-ink-500 leading-relaxed ${
              isSmall ? "text-xs line-clamp-2" : "text-sm line-clamp-2"
            }`}
          >
            {place.summary}
          </p>

          {/* Meta */}
          {!isSmall && visitDuration && (
            <div className="mt-3 pt-3 border-t border-cloud-cream">
              <span className="text-ink-400 text-xs">
                Время посещения: {visitDuration}
              </span>
            </div>
          )}
          
          {/* Highlights */}
          {!isSmall && place.highlights && place.highlights.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {place.highlights.slice(0, 3).map((highlight, idx) => (
                <span key={idx} className="text-xs bg-emerald-50 text-emerald-dark px-2 py-0.5 rounded-full">
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
