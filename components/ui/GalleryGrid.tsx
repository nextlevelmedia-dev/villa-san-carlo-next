import Image from "next/image";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import { reveal } from "@/lib/reveal";
import type { Photo } from "@/lib/images";

/**
 * Mosaico fotografico editoriale. Il primo scatto è più grande;
 * le altre foto si dispongono in una griglia regolare (nessun CLS:
 * ogni cella ha proporzioni fisse).
 */
export default function GalleryGrid({
  photos,
  heading,
  tone = "cream",
  galleryLink = true,
}: {
  photos: Photo[];
  heading: ReactNode;
  tone?: "cream" | "white";
  galleryLink?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden ${tone === "white" ? "bg-white" : "bg-[#F8F5F0]"}`}
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        {heading}

        <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:mt-16">
          {photos.map((photo, index) => (
            <li
              key={photo.src}
              {...reveal(index % 4, "image")}
              className={`relative overflow-hidden bg-[#E8DED4] ${
                index === 0
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                  : "aspect-[4/5]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover"
              />
            </li>
          ))}
        </ul>

        {galleryLink && (
          <div {...reveal(0)} className="mt-12 flex justify-center">
            <ButtonLink href="/gallery" variant="outline">
              Vedi tutta la gallery
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
