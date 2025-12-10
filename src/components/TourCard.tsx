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
      <article className="bg-cloud-soft rounded-2xl overflow-hidden border border-cloud-cream shadow-soft card-hover">
        {/* Hero Image */}
        <div className="relative h-48 md:h-56 bg-cloud-warm overflow-hidden">
          {tour.heroImage ? (
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-lake-muted">
              <Mountain className="w-16 h-16 text-emerald/30" />
            </div>
          )}
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Season Badge */}
          {seasons.length > 0 && (
            <div className="absolute top-4 right-4">
              <span className="bg-emerald text-white text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-card">
                <Snowflake className="w-3.5 h-3.5" />
                {seasons.map((s) => seasonLabels[s] || s).join(", ")}
              </span>
            </div>
          )}
          {/* Emoji Badge */}
          {tour.emoji && (
            <div className="absolute top-4 left-4">
              <span className="text-2xl drop-shadow-lg">{tour.emoji}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-semibold text-ink-950 mb-2 group-hover:text-emerald transition-colors">
            {tour.title}
          </h3>
          <p className="text-ink-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {tour.summary}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
            {duration && (
              <span className="flex items-center gap-1.5 text-ink-400 text-sm">
                <Clock className="w-4 h-4 text-stone-400" />
                {duration}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-ink-400 text-sm">
              <Mountain className="w-4 h-4 text-stone-400" />
              {difficultyLabels[difficulty] || difficulty}
            </span>
            {tour.maxGroupSize && (
              <span className="flex items-center gap-1.5 text-ink-400 text-sm">
                <Users className="w-4 h-4 text-stone-400" />
                до {tour.maxGroupSize} чел.
              </span>
            )}
          </div>

          {/* Price */}
          {price && (
            <div className="flex items-center justify-between pt-4 border-t border-cloud-cream">
              <span className="text-ink-400 text-sm">от</span>
              <span className="text-2xl font-bold text-emerald">
                {price.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
