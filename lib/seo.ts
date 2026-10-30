import type { Metadata } from "next";
import { site } from "@/lib/site";
import { unitHref, type StayUnit } from "@/lib/stays";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Immagine Open Graph 1200×630 in /public/og */
  ogImage?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** Metadata coerenti per ogni pagina: canonical, Open Graph e Twitter Card */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = "/og/home.jpg",
  noIndex,
}: PageSeo): Metadata {
  const image = { url: ogImage, width: 1200, height: 630, alt: site.name };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const villaId = `${site.url}/#villa`;

function postalAddress() {
  const { streetAddress, postalCode, locality, provinceCode, country } =
    site.address;

  return {
    "@type": "PostalAddress",
    ...(streetAddress ? { streetAddress } : {}),
    ...(postalCode ? { postalCode } : {}),
    ...(locality ? { addressLocality: locality } : {}),
    addressRegion: provinceCode,
    addressCountry: country,
  };
}

/**
 * Entità principale: dimora che offre alloggio (LodgingBusiness) e
 * ospita eventi (EventVenue). Solo dati verificati da `site`.
 */
export function villaJsonLd() {
  const { email, phone } = site.contact;
  const sameAs = Object.values(site.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "EventVenue"],
    "@id": villaId,
    name: site.name,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/images/logo-villa-san-carlo.png"),
    image: [absoluteUrl("/og/home.jpg"), absoluteUrl("/og/la-villa.jpg")],
    address: postalAddress(),
    ...(site.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.geo.latitude,
            longitude: site.geo.longitude,
          },
        }
      : {}),
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "it-IT",
    publisher: { "@id": villaId },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      }),
    ),
  };
}

/** Pagina di servizio collegata all'entità principale */
export function webPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "it-IT",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": villaId },
  };
}

/**
 * Alloggi: collega appartamenti (Apartment) e camere (HotelRoom)
 * all'entità principale. Include solo i campi compilati in lib/stays.ts.
 */
export function staysJsonLd(units: StayUnit[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": villaId,
    name: site.name,
    containsPlace: units.map((unit) => ({
      "@type": unit.kind === "apartment" ? "Apartment" : "HotelRoom",
      name: `${unit.name} — ${site.name}`,
      url: absoluteUrl(unitHref(unit)),
      ...(unit.description ? { description: unit.description } : {}),
      ...(unit.photos.length
        ? { image: unit.photos.map((photo) => absoluteUrl(photo.src)) }
        : {}),
      ...(unit.maxGuests
        ? {
            occupancy: {
              "@type": "QuantitativeValue",
              maxValue: unit.maxGuests,
            },
          }
        : {}),
      ...(unit.size
        ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: unit.size,
              unitCode: "MTK",
            },
          }
        : {}),
      ...(unit.beds ? { bed: unit.beds } : {}),
      ...(unit.accessible || unit.amenities.length
        ? {
            amenityFeature: [
              ...(unit.accessible
                ? [
                    {
                      "@type": "LocationFeatureSpecification",
                      name: "Camera accessibile a persone con disabilità",
                      value: true,
                    },
                  ]
                : []),
              ...unit.amenities.map((name) => ({
                "@type": "LocationFeatureSpecification",
                name,
                value: true,
              })),
            ],
          }
        : {}),
    })),
  };
}
