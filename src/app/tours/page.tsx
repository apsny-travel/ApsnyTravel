// file: src/app/tours/page.tsx
import { Metadata } from "next";
import { getAllTours } from "@/lib/capsules/loader";
import TourCard from "@/components/TourCard";
import { Mountain, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Каталог Туров — Абхазия",
  description: "Каталог туров по Абхазии. Озеро Рица, Гагра и другие красивейшие места.",
};

export default function ToursPage() {
  const tours = getAllTours();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 via-cloud to-cloud py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald/10 text-emerald-dark px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Откройте красоту Кавказа</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-950 mb-4">
              Туры по Абхазии
            </h1>
            
            <p className="text-ink-500 text-lg md:text-xl leading-relaxed mb-8">
              Изумрудные воды озера Рица, величественные горы Кавказа, древние храмы — 
              выберите путешествие, которое запомнится навсегда.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-ink-500">
                <Mountain className="w-4 h-4 text-emerald" />
                <span>Горы до 3500 м</span>
              </div>
              <div className="flex items-center gap-2 text-ink-500">
                <MapPin className="w-4 h-4 text-emerald" />
                <span>Озеро Рица</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-cloud-warm flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-8 h-8 text-stone-400" />
              </div>
              <p className="text-ink-500">Туры скоро появятся...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
