// file: src/app/places/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Mountain as MountainIcon, Compass } from "lucide-react";
import {
  getAllPlaceSlugs,
  getPlaceBySlug,
  getParentTourForPlace,
  getNearbyPlaces,
} from "@/lib/capsules/loader";
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
      title: "Место не найдено — ApsnyTravel",
    };
  }

  return {
    title: `${place.title} — ApsnyTravel`,
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

  return (
    <article>
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-end">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-800">
          {place.heroImage && (
            <Image
              src={place.heroImage}
              alt={place.title}
              fill
              className="object-cover opacity-50"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 w-full">
          {/* Back Link */}
          {parentTour && (
            <Link
              href={`/tours/${parentTour.slug}`}
              className="inline-flex items-center gap-2 text-cloud-muted hover:text-cloud-dark transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {parentTour.title}
            </Link>
          )}

          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-winter-blue" />
            <span className="text-cloud-muted">
              {place.region === "abkhazia" ? "Абхазия" : place.region}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cloud-dark mb-4">
            {place.title}
          </h1>
          <p className="text-xl text-cloud-muted max-w-3xl">{place.summary}</p>
        </div>
      </section>

      {/* Info Panel */}
      <section className="bg-navy-800 border-y border-navy-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {place.visitDuration && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-winter-blue" />
                <div>
                  <div className="text-xs text-cloud-muted">Время посещения</div>
                  <div className="text-cloud-dark font-medium">
                    {place.visitDuration}
                  </div>
                </div>
              </div>
            )}
            {place.altitude && (
              <div className="flex items-center gap-3">
                <MountainIcon className="w-5 h-5 text-winter-blue" />
                <div>
                  <div className="text-xs text-cloud-muted">Высота</div>
                  <div className="text-cloud-dark font-medium">
                    {place.altitude} м
                  </div>
                </div>
              </div>
            )}
            {place.bestTime && (
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-winter-blue" />
                <div>
                  <div className="text-xs text-cloud-muted">Лучшее время</div>
                  <div className="text-cloud-dark font-medium">{place.bestTime}</div>
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
              <MarkdownContent content={place.content.body} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Part of Tour */}
              {parentTour && (
                <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
                  <h3 className="text-lg font-semibold text-cloud-dark mb-3">
                    Часть тура
                  </h3>
                  <Link
                    href={`/tours/${parentTour.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-navy-700 rounded-lg overflow-hidden flex-shrink-0 relative">
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
                        <div className="text-cloud-dark font-medium group-hover:text-winter-blue transition-colors">
                          {parentTour.title}
                        </div>
                        <div className="text-cloud-muted text-sm mt-1">
                          {parentTour.duration} · от{" "}
                          {parentTour.priceFrom.toLocaleString("ru-RU")} ₽
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* CTA */}
              <div className="bg-winter-blue/10 rounded-xl p-6 border border-winter-blue/30">
                <h3 className="text-lg font-semibold text-cloud-dark mb-2">
                  Хотите посетить?
                </h3>
                <p className="text-cloud-muted text-sm mb-4">
                  Это место входит в наш тур. Свяжитесь с нами для бронирования.
                </p>
                <Link
                  href="/contacts"
                  className="block text-center bg-winter-blue text-navy-900 font-semibold px-6 py-3 rounded-lg hover:bg-winter-teal transition-colors"
                >
                  Связаться с нами
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      {nearbyPlaces.length > 0 && (
        <section className="py-12 md:py-16 bg-navy-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Compass className="w-6 h-6 text-winter-blue" />
              <h2 className="text-2xl font-bold text-cloud-dark">Рядом</h2>
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
