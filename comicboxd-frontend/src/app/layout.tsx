import type { Metadata } from "next";
import "./globals.css";
import Container from "../components/Container";
import Footer from "../components/Footer";
import LatestNew from "../components/LatestNews";
import ToastProvider from "../components/ToastProvider";

export const metadata: Metadata = {
  title: "ComicBoxd",
  description: "Sua biblioteca de quadrinhos online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#14181c] min-h-screen text-white flex flex-col">
        <main className="flex-1">
          <ToastProvider />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
