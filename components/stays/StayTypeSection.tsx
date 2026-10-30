import Image from "next/image";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import { reveal } from "@/lib/reveal";
import type { Photo } from "@/lib/images";

/**
 * Presentazione di una tipologia di alloggio (camere / appartamenti):
 * numero di unità in evidenza, testo, fotografia o segnaposto.
 */
export default function StayTypeSection({
  id,
  count,
  countLabel,
  eyebrow,
  title,
  children,
  photo,
  placeholderLabel,
  href,
  linkLabel,
  reverse = false,
  tone = "white",
}: {
  id: string;
  count: number;
  countLabel: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  photo?: Photo;
  placeholderLabel: string;
  href: string;
  linkLabel: string;
  reverse?: boolean;
  tone?: "cream" | "white";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${tone === "white" ? "bg-white" : "bg-[#F8F5F0]"}`}
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
        <div
          {...reveal(0, "image")}
          className={`relative h-[400px] overflow-hidden bg-[#E8DED4] sm:h-[500px] lg:h-[600px] ${reverse ? "lg:order-2" : ""}`}
        >
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <PhotoPlaceholder label={placeholderLabel} className="h-full w-full" />
          )}

          <div className="absolute bottom-5 left-5 flex items-baseline gap-3 bg-[#F8F5F0] px-5 py-4 md:bottom-7 md:left-7 md:px-6 md:py-5">
            <span className="text-4xl leading-none tracking-[-0.03em] text-[#3B2118]">
              {count}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7A5F49]">
              {countLabel}
            </span>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow={eyebrow} title={title} intro={children} />

          <div {...reveal(3)} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={href} variant="outline">
              {linkLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
