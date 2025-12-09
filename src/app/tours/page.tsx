// file: src/app/tours/page.tsx
import { Metadata } from "next";
import { getAllTours } from "@/lib/capsules/loader";
import TourCard from "@/components/TourCard";
import { Mountain } from "lucide-react";

export const metadata: Metadata = {
  title: "Туры — ApsnyTravel",
  description: "Зимние туры по Абхазии. Озеро Рица, Гагра и другие красивейшие места.",
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
              Наши туры
            </h1>
          </div>
          <p className="text-cloud-muted text-lg max-w-2xl mx-auto">
            Выберите путешествие, которое подходит именно вам. Мы проведём вас по
            самым красивым местам Абхазии.
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

        {/* Info Note */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
            <h3 className="text-lg font-semibold text-cloud-dark mb-2">
              Хотите индивидуальный тур?
            </h3>
            <p className="text-cloud-muted text-sm mb-4">
              Мы можем организовать поездку по вашему маршруту или адаптировать
              существующий тур под ваши пожелания.
            </p>
            <a
              href="/contacts"
              className="text-winter-blue hover:text-winter-teal font-medium transition-colors"
            >
              Свяжитесь с нами →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
