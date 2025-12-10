// file: src/app/tours/page.tsx
import { Metadata } from "next";
import { getAllTours } from "@/lib/capsules/loader";
import TourCard from "@/components/TourCard";
import { Mountain } from "lucide-react";

export const metadata: Metadata = {
  title: "Каталог Туров — Абхазия",
  description: "Каталог туров по Абхазии. Озеро Рица, Гагра и другие красивейшие места.",
};

export default function ToursPage() {
  const tours = getAllTours();

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mountain className="w-8 h-8 text-winter-blue" />
            <h1 className="text-3xl md:text-4xl font-bold text-cloud-dark">
              Каталог туров
            </h1>
          </div>
          <p className="text-cloud-muted text-lg max-w-2xl mx-auto">
            Выберите путешествие, которое подходит именно вам. Туры по самым красивым местам Абхазии.
          </p>
        </div>

        {/* Tours Grid */}
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-cloud-muted">Туры скоро появятся...</p>
          </div>
        )}
      </div>
    </div>
  );
}
