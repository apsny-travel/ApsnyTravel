// file: src/app/guides/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, MapPin, Clock, Star } from "lucide-react";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  getCapsuleRegion,
  getCapsuleDuration,
} from "@/lib/capsules/loader";
import { getCapsuleBody } from "@/lib/capsules/schema";
import MarkdownContent from "@/components/MarkdownContent";

interface PageProps {
  params: { slug: string };
}

// Generate static params for all guides
export async function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each guide
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return {
      title: "Гид не найден — ApsnyTravel",
    };
  }

  return {
    title: `${guide.title} — ApsnyTravel`,
    description: guide.summary,
  };
}

export default function GuideDetailPage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  // Handle both v1 and v2 formats
  const region = getCapsuleRegion(guide) || guide.region;
  const duration = getCapsuleDuration(guide) || guide.meta?.duration;
  const contentBody = getCapsuleBody(guide);
  const highlights = guide.highlights || [];

  const regionLabels: Record<string, string> = {
    abkhazia: "Абхазия",
    sochi: "Сочи",
    "krasnaya-polyana": "Красная Поляна",
  };

  return (
    <article>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-end">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-800">
          {guide.heroImage && (
            <Image
              src={guide.heroImage}
              alt={guide.title}
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
            Назад
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-winter-blue" />
            <span className="bg-winter-blue/20 text-winter-blue text-sm font-medium px-3 py-1 rounded-full">
              Полезный гид
            </span>
            {guide.emoji && <span className="text-2xl">{guide.emoji}</span>}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cloud-dark mb-4">
            {guide.title}
          </h1>
          <p className="text-xl text-cloud-muted max-w-3xl">{guide.summary}</p>
        </div>
      </section>

      {/* Info Panel */}
      <section className="bg-navy-800 border-y border-navy-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {duration && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-winter-blue" />
                <div>
                  <div className="text-xs text-cloud-muted">Время чтения</div>
                  <div className="text-cloud-dark font-medium">{duration}</div>
                </div>
              </div>
            )}
            {region && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-winter-blue" />
                <div>
                  <div className="text-xs text-cloud-muted">Регион</div>
                  <div className="text-cloud-dark font-medium">
                    {regionLabels[region] || region}
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
            <aside className="space-y-8">
              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
                  <h3 className="text-lg font-semibold text-cloud-dark mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-winter-blue" />
                    Ключевые моменты
                  </h3>
                  <ul className="space-y-2">
                    {highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-cloud-muted text-sm"
                      >
                        <Star className="w-4 h-4 text-winter-blue flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="bg-winter-blue/10 rounded-xl p-6 border border-winter-blue/30">
                <h3 className="text-lg font-semibold text-cloud-dark mb-2">
                  Остались вопросы?
                </h3>
                <p className="text-cloud-muted text-sm mb-4">
                  Свяжитесь с нами, мы будем рады помочь с планированием поездки.
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
    </article>
  );
}
