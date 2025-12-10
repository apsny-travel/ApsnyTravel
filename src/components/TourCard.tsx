// file: src/components/TourCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Clock, Mountain, Snowflake, Users } from "lucide-react";
import { TourCapsule } from "@/lib/capsules/schema";
import { getCapsuleDuration, getCapsulePrice } from "@/lib/capsules/loader";

interface TourCardProps {
  tour: TourCapsule;
}

export default function TourCard({ tour }: TourCardProps) {
  const seasonLabels: Record<string, string> = {
    winter: "Зима",
    spring: "Весна",
    summer: "Лето",
    autumn: "Осень",
    all: "Весь год",
  };

  const difficultyLabels: Record<string, string> = {
    easy: "Лёгкий",
    moderate: "Средний",
    hard: "Сложный",
  };

  // Handle both v1 and v2 season formats
  const getSeasons = (): string[] => {
    if (Array.isArray(tour.season)) {
      return tour.season;
    }
    if (typeof tour.season === "string") {
      return [tour.season];
    }
    if (tour.meta?.season) {
      return Array.isArray(tour.meta.season) ? tour.meta.season : [tour.meta.season];
    }
    return [];
  };

  const seasons = getSeasons();
  const duration = getCapsuleDuration(tour) || tour.duration;
  const price = getCapsulePrice(tour) || tour.priceFrom;
  const difficulty = tour.difficulty || tour.meta?.difficulty || "moderate";

  return (
    <Link href={`/tours/${tour.slug}`} className="block group">
      <article className="bg-navy-800 rounded-xl overflow-hidden border border-navy-700 card-hover">
        {/* Hero Image */}
        <div className="relative h-48 md:h-56 bg-navy-700">
          {tour.heroImage ? (
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Mountain className="w-16 h-16 text-navy-600" />
            </div>
          )}
          {/* Season Badge */}
          {seasons.length > 0 && (
            <div className="absolute top-4 right-4">
              <span className="bg-winter-blue/90 text-navy-900 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Snowflake className="w-4 h-4" />
                {seasons.map((s) => seasonLabels[s] || s).join(", ")}
              </span>
            </div>
          )}
          {/* Emoji Badge */}
          {tour.emoji && (
            <div className="absolute top-4 left-4">
              <span className="text-2xl">{tour.emoji}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-semibold text-cloud-dark mb-2 group-hover:text-winter-blue transition-colors">
            {tour.title}
          </h3>
          <p className="text-cloud-muted text-sm mb-4 line-clamp-2">
            {tour.summary}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 mb-4">
            {duration && (
              <span className="flex items-center gap-1 text-cloud-muted text-sm">
                <Clock className="w-4 h-4" />
                {duration}
              </span>
            )}
            <span className="flex items-center gap-1 text-cloud-muted text-sm">
              <Mountain className="w-4 h-4" />
              {difficultyLabels[difficulty] || difficulty}
            </span>
            {tour.maxGroupSize && (
              <span className="flex items-center gap-1 text-cloud-muted text-sm">
                <Users className="w-4 h-4" />
                до {tour.maxGroupSize} чел.
              </span>
            )}
          </div>

          {/* Price */}
          {price && (
            <div className="flex items-center justify-between pt-4 border-t border-navy-700">
              <span className="text-cloud-muted text-sm">от</span>
              <span className="text-2xl font-bold text-winter-blue">
                {price.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
