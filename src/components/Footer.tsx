// file: src/components/Footer.tsx
import Link from "next/link";
import { Mountain } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cloud-warm border-t border-cloud-cream mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href="/tours"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center group-hover:bg-emerald/20 transition-colors">
              <Mountain className="w-4 h-4 text-emerald" />
            </div>
            <span className="text-lg font-semibold text-ink-900">Туры Абхазии</span>
          </Link>

          {/* Copyright & Info */}
          <div className="text-center md:text-right">
            <p className="text-ink-400 text-sm">
              © {currentYear} Каталог туров по Абхазии
            </p>
            <p className="text-ink-300 text-xs mt-1">
              Озеро Рица · Гагра · Новый Афон
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
