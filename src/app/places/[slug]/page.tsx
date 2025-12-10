// file: src/app/places/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Mountain as MountainIcon, Compass, Star, Info } from "lucide-react";
import {
  getAllPlaceSlugs,
  getPlaceBySlug,
  getParentTourForPlace,
  getNearbyPlaces,
  getCapsuleRegion,
} from "@/lib/capsules/loader";
import { getCapsuleBody } from "@/lib/capsules/schema";
import MarkdownContent from "@/components/MarkdownContent";
import PlaceCard from "@/components/PlaceCard";

interface PageProps {
  params: { slug: string };
}

// Generate static params for all places
export async function generateStaticParams() {
  const slugs = getAllPlaceSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each place
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const place = getPlaceBySlug(params.slug);

  if (!place) {
    return {
      title: "Место не найдено — Каталог Туров",
    };
  }

  return {
    title: `${place.title} — Каталог Туров`,
    description: place.summary,
  };
}

export default function PlaceDetailPage({ params }: PageProps) {
  const place = getPlaceBySlug(params.slug);

  if (!place) {
    notFound();
  }

  const parentTour = getParentTourForPlace(place);
  const nearbyPlaces = getNearbyPlaces(place);
  
  // Handle both v1 and v2 formats
  const region = getCapsuleRegion(place) || place.region;
  const visitDuration = place.visitDuration || place.meta?.duration || place.practicalInfo?.bestTime;
  const bestTime = place.bestTime || place.practicalInfo?.bestTime;
  const contentBody = getCapsuleBody(place);
  const highlights = place.highlights || [];
  const practicalInfo = place.practicalInfo;

  const regionLabels: Record<string, string> = {
    abkhazia: "Абхазия",
    sochi: "Сочи",
    "krasnaya-polyana": "Красная Поляна",
  };

  // Get parent tour price safely
  const getParentTourPrice = () => {
    if (!parentTour) return null;
    return parentTour.priceFrom || parentTour.meta?.price_from;
  };
  
  const parentTourPrice = getParentTourPrice();
  const parentTourDuration = parentTour?.duration || parentTour?.meta?.duration;

  return (
    <article>
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-end">
        {/* Background */}
        <div className="absolute inset-0 bg-stone-800">
          {place.heroImage && (
            <Image
              src={place.heroImage}
              alt={place.title}
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
          {parentTour && (
            <Link
              href={`/tours/${parentTour.slug}`}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {parentTour.title}
            </Link>
          )}

          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-lake-light" />
            <span className="text-white/90">
              {region ? (regionLabels[region] || region) : ""}
            </span>
            {place.emoji && <span className="text-2xl drop-shadow-lg">{place.emoji}</span>}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {place.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">{place.summary}</p>
        </div>
      </section>

      {/* Info Panel */}
      <section className="bg-cloud-soft border-y border-cloud-cream">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {visitDuration && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lake/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-lake" />
                </div>
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide">Время посещения</div>
                  <div className="text-ink-900 font-semibold">
                    {visitDuration}
                  </div>
                </div>
              </div>
            )}
            {place.altitude && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lake/10 flex items-center justify-center">
                  <MountainIcon className="w-5 h-5 text-lake" />
                </div>
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide">Высота</div>
                  <div className="text-ink-900 font-semibold">
                    {place.altitude} м
                  </div>
                </div>
              </div>
            )}
            {bestTime && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lake/10 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-lake" />
                </div>
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide">Лучшее время</div>
                  <div className="text-ink-900 font-semibold">{bestTime}</div>
                </div>
              </div>
            )}
            {practicalInfo?.entryFee && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lake/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-lake" />
                </div>
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-wide">Вход</div>
                  <div className="text-ink-900 font-semibold">{practicalInfo.entryFee}</div>
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
                    Особенности
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

              {/* Practical Info */}
              {practicalInfo && practicalInfo.facilities && practicalInfo.facilities.length > 0 && (
                <div className="bg-cloud-soft rounded-2xl p-6 border border-cloud-cream shadow-soft">
                  <h3 className="text-lg font-semibold text-ink-950 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-emerald" />
                    Инфраструктура
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {practicalInfo.facilities.map((facility, idx) => (
                      <span key={idx} className="text-xs bg-emerald-50 text-emerald-dark px-3 py-1.5 rounded-full">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Part of Tour */}
              {parentTour && (
                <div className="bg-cloud-soft rounded-2xl p-6 border border-cloud-cream shadow-soft">
                  <h3 className="text-lg font-semibold text-ink-950 mb-3">
                    Часть тура
                  </h3>
                  <Link
                    href={`/tours/${parentTour.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-cloud-warm rounded-xl overflow-hidden flex-shrink-0 relative">
                        {parentTour.heroImage && (
                          <Image
                            src={parentTour.heroImage}
                            alt={parentTour.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="text-ink-900 font-medium group-hover:text-emerald transition-colors">
                          {parentTour.title}
                        </div>
                        <div className="text-ink-500 text-sm mt-1">
                          {parentTourDuration && `${parentTourDuration} · `}
                          {parentTourPrice && <span className="text-emerald font-medium">от {parentTourPrice.toLocaleString("ru-RU")} ₽</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Visit Info */}
              <div className="bg-lake-muted rounded-2xl p-6 border border-lake/20">
                <h3 className="text-lg font-semibold text-ink-950 mb-2">
                  Хотите посетить?
                </h3>
                <p className="text-ink-600 text-sm leading-relaxed">
                  Это место входит в наш тур. Посмотрите подробности тура выше.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      {nearbyPlaces.length > 0 && (
        <section className="py-12 md:py-16 bg-cloud-warm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-lake/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-lake" />
              </div>
              <h2 className="text-2xl font-bold text-ink-950">Рядом</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPlaces.map((nearbyPlace) => (
                <PlaceCard key={nearbyPlace.slug} place={nearbyPlace} size="small" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
