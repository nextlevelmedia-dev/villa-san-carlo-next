import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/consent/CookieBanner";
import JsonLd from "@/components/ui/JsonLd";
import RevealObserver from "@/components/ui/RevealObserver";
import SplitTitles from "@/components/ui/SplitTitles";
import { headScript } from "@/lib/reveal";
import { villaJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Villa San Carlo | Dimora storica per eventi e soggiorni a Cremona",
    template: "%s | Villa San Carlo",
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#F8F5F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenuto"
          className="sr-only z-[100] bg-[#4A281B] px-5 py-3 text-xs uppercase tracking-[0.16em] text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Vai al contenuto
        </a>

        {/* HEADER GLOBALE */}
        <Header />

        {/* CONTENUTO DELLA PAGINA */}
        <main id="contenuto" className="flex-1">
          {children}
        </main>

        {/* FOOTER GLOBALE */}
        <Footer />

        <CookieBanner />
        <RevealObserver />
        <SplitTitles />
        <JsonLd data={[villaJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
