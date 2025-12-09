// file: src/app/contacts/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты — ApsnyTravel",
  description:
    "Свяжитесь с нами для бронирования тура или чтобы задать вопросы. Телефон, WhatsApp, Telegram.",
};

// =====================================================
// ⚠️ PLACEHOLDER CONTACT INFO - REPLACE WITH REAL DATA
// =====================================================
const CONTACT_INFO = {
  // TODO: Replace with real phone number
  phone: "+7 (XXX) XXX-XX-XX",
  phoneClean: "+7XXXXXXXXXX", // For tel: link

  // TODO: Replace with real WhatsApp number
  whatsapp: "+7XXXXXXXXXX",

  // TODO: Replace with real Telegram username
  telegram: "apsnytravel",

  // TODO: Replace with real email (optional)
  email: "hello@apsnytravel.ru",

  // Guide name (optional)
  guideName: "Ваш гид",
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-cloud-dark mb-4">
            Свяжитесь с нами
          </h1>
          <p className="text-cloud-muted text-lg max-w-2xl mx-auto">
            Позвоните или напишите, чтобы забронировать тур, узнать подробности
            или задать любые вопросы. Мы всегда рады помочь.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Phone */}
          <a
            href={`tel:${CONTACT_INFO.phoneClean}`}
            className="block bg-navy-800 rounded-xl p-6 border border-navy-700 hover:border-winter-blue transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-winter-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-winter-blue" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-cloud-dark group-hover:text-winter-blue transition-colors mb-1">
                  Телефон
                </h2>
                <p className="text-xl text-cloud-dark font-medium">
                  {CONTACT_INFO.phone}
                </p>
                <p className="text-cloud-muted text-sm mt-2">
                  Нажмите, чтобы позвонить
                </p>
              </div>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-navy-800 rounded-xl p-6 border border-navy-700 hover:border-winter-teal transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-winter-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-winter-teal" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-cloud-dark group-hover:text-winter-teal transition-colors mb-1">
                  WhatsApp
                </h2>
                <p className="text-cloud-muted">
                  Напишите нам в WhatsApp — это удобно и быстро
                </p>
                <p className="text-winter-teal text-sm mt-2 flex items-center gap-1">
                  Открыть чат <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </div>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/${CONTACT_INFO.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-navy-800 rounded-xl p-6 border border-navy-700 hover:border-winter-blue transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-winter-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-winter-blue" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-cloud-dark group-hover:text-winter-blue transition-colors mb-1">
                  Telegram
                </h2>
                <p className="text-cloud-muted">
                  @{CONTACT_INFO.telegram}
                </p>
                <p className="text-winter-blue text-sm mt-2 flex items-center gap-1">
                  Открыть чат <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="block bg-navy-800 rounded-xl p-6 border border-navy-700 hover:border-cloud-muted transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cloud-muted/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-cloud-muted" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-cloud-dark group-hover:text-cloud-muted transition-colors mb-1">
                  Email
                </h2>
                <p className="text-cloud-muted">{CONTACT_INFO.email}</p>
                <p className="text-cloud-muted text-sm mt-2">
                  Для официальных запросов
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Info Section */}
        <div className="bg-navy-800 rounded-xl p-8 border border-navy-700 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-winter-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-winter-blue" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-cloud-dark mb-3">
                Как мы работаем
              </h2>
              <div className="text-cloud-muted space-y-3">
                <p>
                  Мы — небольшая семейная команда, базирующаяся в Сочи. Туры
                  проводим лично, поэтому можем гибко подстроиться под ваши
                  пожелания.
                </p>
                <p>
                  <strong className="text-cloud-dark">Место встречи:</strong>{" "}
                  забираем гостей из Адлера, Сочи или можем договориться об
                  удобной для вас точке.
                </p>
                <p>
                  <strong className="text-cloud-dark">Время ответа:</strong>{" "}
                  обычно отвечаем в течение нескольких часов. Если не ответили
                  сразу — напишите ещё раз, мы могли быть на маршруте.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder Warning */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
          <p className="text-yellow-200 text-sm">
            ⚠️ <strong>Внимание:</strong> Контактные данные на этой странице
            являются заполнителями. Пожалуйста, замените их реальными данными в
            файле <code className="bg-navy-800 px-2 py-0.5 rounded">src/app/contacts/page.tsx</code>
          </p>
        </div>

        {/* Back to Tours */}
        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-winter-blue hover:text-winter-teal transition-colors"
          >
            ← Посмотреть наши туры
          </Link>
        </div>
      </div>
    </div>
  );
}
