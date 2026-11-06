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
  countNote,
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
  /** Riga secondaria sotto l'etichetta, es. "+ 1 camera accessibile" */
  countNote?: string;
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

          <div className="absolute bottom-5 left-5 flex max-w-[calc(100%-2.5rem)] items-center gap-4 bg-[#F8F5F0]/95 px-5 py-4 backdrop-blur-sm md:bottom-7 md:left-7 md:gap-5 md:px-6 md:py-5">
            <span className="text-[44px] leading-none tracking-[-0.03em] text-[#3B2118] md:text-5xl">
              {count}
            </span>
            <span className="h-10 w-px shrink-0 bg-[#C8AD92]" aria-hidden="true" />
            <span className="flex flex-col gap-1.5">
              <span className="text-[10px] font-medium uppercase leading-4 tracking-[0.2em] text-[#7A5F49]">
                {countLabel}
              </span>
              {countNote && (
                <span className="text-[13px] leading-5 text-[#6D625B]">
                  {countNote}
                </span>
              )}
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
