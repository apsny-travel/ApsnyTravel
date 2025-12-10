// file: src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Mountain, Snowflake, MapPin } from "lucide-react";
import { getTourBySlug, getRelatedPlacesForTour, getCapsuleDuration, getCapsulePrice, getCapsuleRegion } from "@/lib/capsules/loader";
import { getCapsuleSurface } from "@/lib/capsules/schema";
import PlaceCard from "@/components/PlaceCard";

export default function HomePage() {
  const tour = getTourBySlug("lake-ritsa-winter");
  const places = tour ? getRelatedPlacesForTour(tour) : [];

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cloud-muted">Тур не найден</p>
      </div>
    );
  }

  // Handle both v1 and v2 formats
  const duration = getCapsuleDuration(tour) || tour.duration || "";
  const price = getCapsulePrice(tour) || tour.priceFrom;
  const region = getCapsuleRegion(tour) || tour.region || "";
  const surfaceText = getCapsuleSurface(tour);

  const regionLabels: Record<string, string> = {
    abkhazia: "Абхазия",
    sochi: "Сочи",
    "krasnaya-polyana": "Красная Поляна",
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-navy-800">
          {tour.heroImage && (
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              className="object-cover opacity-40"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-winter-blue/20 text-winter-blue text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2">
                <Snowflake className="w-4 h-4" />
                Зимний сезон 2024/25
              </span>
              {tour.emoji && <span className="text-2xl">{tour.emoji}</span>}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cloud-dark mb-6 leading-tight">
              {tour.title}
            </h1>

            {/* Surface text */}
            <p className="text-xl md:text-2xl text-cloud-muted mb-8 leading-relaxed">
              {surfaceText}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              {duration && (
                <span className="flex items-center gap-2 text-cloud-muted bg-navy-800/80 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-winter-blue" />
                  {duration}
                </span>
              )}
              {region && (
                <span className="flex items-center gap-2 text-cloud-muted bg-navy-800/80 px-4 py-2 rounded-lg">
                  <Mountain className="w-5 h-5 text-winter-blue" />
                  {regionLabels[region] || region}
                </span>
              )}
              {price && (
                <span className="flex items-center gap-2 text-cloud-dark bg-navy-800/80 px-4 py-2 rounded-lg font-semibold">
                  от {price.toLocaleString("ru-RU")} ₽
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/tours/${tour.slug}`}
                className="inline-flex items-center gap-2 bg-winter-blue text-navy-900 font-semibold px-6 py-3 rounded-lg hover:bg-winter-teal transition-colors"
              >
                Подробнее о туре
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 border border-cloud-muted text-cloud-dark font-semibold px-6 py-3 rounded-lg hover:bg-navy-800 transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-navy-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-cloud-dark mb-6">
              Семейные туры по Абхазии
            </h2>
            <p className="text-lg text-cloud-muted leading-relaxed mb-8">
              Мы — небольшая семейная команда, которая искренне любит Абхазию и хочет
              показать её вам. Никакой суеты и толп туристов — только честные
              впечатления, тёплое гостеприимство и красота зимних гор.
            </p>
            <div className="flex justify-center gap-8 text-cloud-muted">
              <div className="text-center">
                <div className="text-3xl font-bold text-winter-blue mb-1">10+</div>
                <div className="text-sm">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-winter-blue mb-1">500+</div>
                <div className="text-sm">довольных гостей</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-winter-blue mb-1">7</div>
                <div className="text-sm">человек макс.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Places Section */}
      {places.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-winter-blue" />
              <h2 className="text-2xl md:text-3xl font-bold text-cloud-dark">
                Места, которые вы увидите
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-navy-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-cloud-dark mb-4">
            Готовы к путешествию?
          </h2>
          <p className="text-cloud-muted mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами, чтобы узнать подробности, выбрать удобную дату или
            задать любые вопросы. Мы всегда рады помочь.
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 bg-winter-blue text-navy-900 font-semibold px-8 py-4 rounded-lg hover:bg-winter-teal transition-colors text-lg"
          >
            Связаться с нами
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
