// file: src/app/tours/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Mountain,
  Users,
  Snowflake,
  MapPin,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Star,
} from "lucide-react";
import {
  getAllTourSlugs,
  getTourBySlug,
  getRelatedPlacesForTour,
  getCapsuleDuration,
  getCapsulePrice,
  getCapsuleRegion,
} from "@/lib/capsules/loader";
import { getCapsuleBody } from "@/lib/capsules/schema";
import MarkdownContent from "@/components/MarkdownContent";
import PlaceCard from "@/components/PlaceCard";

interface PageProps {
  params: { slug: string };
}

// Generate static params for all tours
export async function generateStaticParams() {
  const slugs = getAllTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each tour
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    return {
      title: "Тур не найден — Каталог Туров",
    };
  }

  return {
    title: `${tour.title} — Каталог Туров`,
    description: tour.summary,
  };
}

export default function TourDetailPage({ params }: PageProps) {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  const places = getRelatedPlacesForTour(tour);

  // Handle both v1 and v2 formats
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
  const duration = getCapsuleDuration(tour) || tour.duration || "";
  const price = getCapsulePrice(tour) || tour.priceFrom;
  const region = getCapsuleRegion(tour) || tour.region;
  const difficulty = tour.difficulty || tour.meta?.difficulty || "moderate";
  const contentBody = getCapsuleBody(tour);

  // Get includes/excludes from both formats
  const includes = tour.includes || tour.included || [];
  const excludes = tour.excludes || tour.notIncluded || [];
  const highlights = tour.highlights || [];

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

  const regionLabels: Record<string, string> = {
    abkhazia: "Абхазия",
    sochi: "Сочи",
    "krasnaya-polyana": "Красная Поляна",
  };

  return (
    <article>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end">
        {/* Background */}
        <div className="absolute inset-0 bg-stone-800">
          {tour.heroImage && (
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              className="object-cover opacity-80"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 w-full">
          {/* Back Link */}
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Все туры
          </Link>

          {/* Season Badge */}
          {seasons.length > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald text-white text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2 shadow-card">
                <Snowflake className="w-4 h-4" />
                {seasons.map((s) => seasonLabels[s] || s).join(", ")}
              </span>
              {tour.emoji && <span className="text-2xl drop-shadow-lg">{tour.emoji}</span>}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {tour.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">{tour.summary}</p>
        </div>
      </section>

      {/* Info Panel */}
      <section className="bg-cloud-soft border-y border-cloud-cream">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {duration && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide">Длительность</div>
                  <div className="text-ink-900 font-semibold">{duration}</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <div className="text-xs text-ink-400 uppercase tracking-wide">Сложность</div>
                <div className="text-ink-900 font-semibold">
                  {difficultyLabels[difficulty] || difficulty}
                </div>
              </div>
            </div>
            {tour.maxGroupSize && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide">Группа</div>
                  <div className="text-ink-900 font-semibold">
                    до {tour.maxGroupSize} чел.
                  </div>
                </div>
              </div>
            )}
            {region && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide">Регион</div>
                  <div className="text-ink-900 font-semibold">
                    {regionLabels[region] || region}
                  </div>
                </div>
              </div>
            )}
            {price && (
              <div className="flex items-center gap-3 ml-auto">
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide text-right">Цена от</div>
                  <div className="text-2xl font-bold text-emerald">
                    {price.toLocaleString("ru-RU")} ₽
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Body Content */}
            <div className="lg:col-span-2">
              <MarkdownContent content={contentBody} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="bg-cloud-soft rounded-2xl p-6 border border-cloud-cream shadow-soft">
                  <h3 className="text-lg font-semibold text-ink-950 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-terracotta" />
                    Основные моменты
                  </h3>
                  <ul className="space-y-3">
                    {highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-ink-700 text-sm"
                      >
                        <Star className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Includes */}
              {includes.length > 0 && (
                <div className="bg-cloud-soft rounded-2xl p-6 border border-cloud-cream shadow-soft">
                  <h3 className="text-lg font-semibold text-ink-950 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald" />
                    Включено в стоимость
                  </h3>
                  <ul className="space-y-3">
                    {includes.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-ink-700 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Excludes */}
              {excludes.length > 0 && (
                <div className="bg-cloud-soft rounded-2xl p-6 border border-cloud-cream shadow-soft">
                  <h3 className="text-lg font-semibold text-ink-950 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-stone-500" />
                    Не включено
                  </h3>
                  <ul className="space-y-3">
                    {excludes.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-ink-500 text-sm"
                      >
                        <XCircle className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Meeting Point */}
              {tour.meetingPoint && (
                <div className="bg-cloud-soft rounded-2xl p-6 border border-cloud-cream shadow-soft">
                  <h3 className="text-lg font-semibold text-ink-950 mb-2">
                    Место встречи
                  </h3>
                  <p className="text-ink-600 text-sm leading-relaxed">{tour.meetingPoint}</p>
                </div>
              )}

              {/* Price Card */}
              {price && (
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald/20 shadow-soft">
                  <h3 className="text-lg font-semibold text-ink-950 mb-2">
                    Стоимость тура
                  </h3>
                  <p className="text-3xl font-bold text-emerald mb-2">
                    от {price.toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-ink-500 text-sm">
                    Свяжитесь с нами для уточнения деталей
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Places Section */}
      {places.length > 0 && (
        <section className="py-12 md:py-16 bg-cloud-warm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-lake/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-lake" />
              </div>
              <h2 className="text-2xl font-bold text-ink-950">
                Места на маршруте
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {places.map((place) => (
                <PlaceCard key={place.slug} place={place} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
