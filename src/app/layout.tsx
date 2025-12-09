// file: src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ApsnyTravel — Зимние туры в Абхазию",
  description:
    "Семейные туры к озеру Рица и другим красивейшим местам Абхазии. Честно, тепло, по-домашнему.",
  keywords: ["Абхазия", "озеро Рица", "зимние туры", "Гагра", "экскурсии"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
