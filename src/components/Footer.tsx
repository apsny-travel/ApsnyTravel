// file: src/components/Footer.tsx
import Link from "next/link";
import { Mountain } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 border-t border-navy-700 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/tours"
            className="flex items-center gap-2 text-cloud-dark hover:text-winter-blue transition-colors"
          >
            <Mountain className="w-6 h-6" />
            <span className="text-lg font-semibold">Каталог Туров</span>
          </Link>

          {/* Copyright */}
          <p className="text-cloud-muted text-sm">
            © {currentYear} Каталог Туров по Абхазии
          </p>
        </div>
      </div>
    </footer>
  );
}
