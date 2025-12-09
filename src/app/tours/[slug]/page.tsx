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
} from "lucide-react";
import {
  getAllTourSlugs,
  getTourBySlug,
  getRelatedPlacesForTour,
} from "@/lib/capsules/loader";
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
      title: "Тур не найден — ApsnyTravel",
    };
  }

  return {
    title: `${tour.title} — ApsnyTravel`,
    description: tour.summary,
  };
}

export default function TourDetailPage({ params }: PageProps) {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  const places = getRelatedPlacesForTour(tour);

  const seasonLabels: Record<string, string> = {
    winter: "Зима",
    spring: "Весна",
    summer: "Лето",
    autumn: "Осень",
  };

  const difficultyLabels: Record<string, string> = {
    easy: "Лёгкий",
    moderate: "Средний",
    hard: "Сложный",
  };

  return (
    <article>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-end">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-800">
          {tour.heroImage && (
            <Image
              src={tour.heroImage}
              alt={tour.title}
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
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-cloud-muted hover:text-cloud-dark transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Все туры
          </Link>

          {/* Season Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-winter-blue/90 text-navy-900 text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2">
              <Snowflake className="w-4 h-4" />
              {tour.season.map((s) => seasonLabels[s] || s).join(", ")}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cloud-dark mb-4">
            {tour.title}
          </h1>
          <p className="text-xl text-cloud-muted max-w-3xl">{tour.summary}</p>
        </div>
      </section>

      {/* Info Panel */}
      <section className="bg-navy-800 border-y border-navy-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-winter-blue" />
              <div>
                <div className="text-xs text-cloud-muted">Длительность</div>
                <div className="text-cloud-dark font-medium">{tour.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mountain className="w-5 h-5 text-winter-blue" />
              <div>
                <div className="text-xs text-cloud-muted">Сложность</div>
                <div className="text-cloud-dark font-medium">
                  {difficultyLabels[tour.difficulty] || tour.difficulty}
                </div>
              </div>
            </div>
            {tour.maxGroupSize && (
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-winter-blue" />
                <div>
                  <div className="text-xs text-cloud-muted">Группа</div>
                  <div className="text-cloud-dark font-medium">
                    до {tour.maxGroupSize} чел.
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-winter-blue" />
              <div>
                <div className="text-xs text-cloud-muted">Регион</div>
                <div className="text-cloud-dark font-medium">
                  {tour.region === "abkhazia" ? "Абхазия" : tour.region}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <div className="text-xs text-cloud-muted">Стоимость от</div>
                <div className="text-2xl font-bold text-winter-blue">
                  {tour.priceFrom.toLocaleString("ru-RU")} ₽
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Body Content */}
            <div className="lg:col-span-2">
              <MarkdownContent content={tour.content.body} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Includes */}
              {tour.includes && tour.includes.length > 0 && (
                <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
                  <h3 className="text-lg font-semibold text-cloud-dark mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-winter-teal" />
                    Включено в стоимость
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-cloud-muted text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-winter-teal flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Excludes */}
              {tour.excludes && tour.excludes.length > 0 && (
                <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
                  <h3 className="text-lg font-semibold text-cloud-dark mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-cloud-muted" />
                    Не включено
                  </h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-cloud-muted text-sm"
                      >
                        <XCircle className="w-4 h-4 text-cloud-muted flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Meeting Point */}
              {tour.meetingPoint && (
                <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
                  <h3 className="text-lg font-semibold text-cloud-dark mb-2">
                    Место встречи
                  </h3>
                  <p className="text-cloud-muted text-sm">{tour.meetingPoint}</p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-winter-blue/10 rounded-xl p-6 border border-winter-blue/30">
                <h3 className="text-lg font-semibold text-cloud-dark mb-2">
                  Забронировать тур
                </h3>
                <p className="text-cloud-muted text-sm mb-4">
                  Свяжитесь с нами, чтобы выбрать удобную дату и задать вопросы.
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

      {/* Places Section */}
      {places.length > 0 && (
        <section className="py-12 md:py-16 bg-navy-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-winter-blue" />
              <h2 className="text-2xl font-bold text-cloud-dark">
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
