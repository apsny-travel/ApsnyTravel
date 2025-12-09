// file: src/components/Footer.tsx
import Link from "next/link";
import { Mountain, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 border-t border-navy-700 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-cloud-dark hover:text-winter-blue transition-colors mb-3"
            >
              <Mountain className="w-6 h-6" />
              <span className="text-lg font-semibold">ApsnyTravel</span>
            </Link>
            <p className="text-cloud-muted text-sm">
              Семейные туры по Абхазии.
              <br />
              Честно, тепло, по-домашнему.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-cloud-dark font-semibold mb-3">Навигация</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-cloud-muted hover:text-cloud-dark transition-colors text-sm"
              >
                Главная
              </Link>
              <Link
                href="/tours"
                className="text-cloud-muted hover:text-cloud-dark transition-colors text-sm"
              >
                Туры
              </Link>
              <Link
                href="/contacts"
                className="text-cloud-muted hover:text-cloud-dark transition-colors text-sm"
              >
                Контакты
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cloud-dark font-semibold mb-3">Связаться</h3>
            <Link
              href="/contacts"
              className="flex items-center gap-2 text-cloud-muted hover:text-winter-blue transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Контактная информация</span>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-navy-700 mt-8 pt-6 text-center">
          <p className="text-cloud-muted text-sm">
            © {currentYear} ApsnyTravel. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
