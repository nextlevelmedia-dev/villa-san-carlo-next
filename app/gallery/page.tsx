import type { Metadata } from "next";
import InfiniteGallery from "@/components/InfiniteGallery";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery fotografica",
  description:
    "Scopri gli ambienti, gli eventi e le atmosfere di Villa San Carlo, dimora storica in provincia di Cremona, attraverso la nostra gallery fotografica.",
  path: "/gallery",
  ogImage: "/og/gallery.jpg",
});

export default function GalleryPage() {
  return (
    <section className="relative w-full bg-[#F8F5F0]">
      <h1 className="sr-only">Gallery fotografica di Villa San Carlo</h1>
      <JsonLd data={breadcrumbJsonLd([{ name: "Gallery", path: "/gallery" }])} />
      <InfiniteGallery />
    </section>
  );
}
