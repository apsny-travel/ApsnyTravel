// file: src/app/not-found.tsx
import Link from "next/link";
import { ArrowLeft, Mountain } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-cloud-warm flex items-center justify-center mx-auto mb-6">
          <Mountain className="w-10 h-10 text-stone-400" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-stone-300 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-ink-950 mb-4">
          Страница не найдена
        </h2>
        <p className="text-ink-500 mb-8 max-w-md mx-auto leading-relaxed">
          Возможно, вы перешли по устаревшей ссылке или страница была перемещена.
        </p>
        <Link
          href="/tours"
          className="btn-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          В каталог туров
        </Link>
      </div>
    </div>
  );
}
