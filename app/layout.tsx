import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Villa San Carlo | Casa Storica",
  description:
    "Villa San Carlo, casa storica per eventi esclusivi, ricevimenti e soggiorni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* HEADER GLOBALE */}
        <Header />

        {/* CONTENUTO DELLA PAGINA */}
        <main className="flex-1">{children}</main>

        {/* FOOTER GLOBALE */}
        <Footer />
      </body>
    </html>
  );
}