import type { Metadata } from "next";
import InfiniteGallery from "@/components/InfiniteGallery";

export const metadata: Metadata = {
  title: "Gallery | Villa San Carlo",
  description:
    "Scopri gli ambienti, gli eventi e le atmosfere di Villa San Carlo attraverso la nostra gallery fotografica.",
};

export default function GalleryPage() {
  return (
    <section className="relative w-full bg-[#F8F5F0]">
      <InfiniteGallery />
    </section>
  );
}