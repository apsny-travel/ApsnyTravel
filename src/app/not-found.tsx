// file: src/app/not-found.tsx
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-navy-700 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-cloud-dark mb-4">
          Страница не найдена
        </h2>
        <p className="text-cloud-muted mb-8 max-w-md mx-auto">
          Возможно, вы перешли по устаревшей ссылке или страница была перемещена.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-winter-blue text-navy-900 font-semibold px-6 py-3 rounded-lg hover:bg-winter-teal transition-colors"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 border border-cloud-muted text-cloud-dark font-semibold px-6 py-3 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Посмотреть туры
          </Link>
        </div>
      </div>
    </div>
  );
}
