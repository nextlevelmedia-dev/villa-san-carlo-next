import Image from "next/image";
import type { ReactNode } from "react";
import Atmosphere from "@/components/ui/Atmosphere";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSlider, { type Slide } from "@/components/ui/HeroSlider";
import { delay } from "@/lib/reveal";
import type { Photo } from "@/lib/images";
import type { Crumb } from "@/lib/seo";

/**
 * Hero editoriale delle pagine interne: testo a sinistra, fotografia a
 * destra (come la Hero della home). La foto è l'elemento LCP: viene
 * precaricata e non è animata. Il titolo usa un reveal per riga in CSS.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  titleLines,
  intro,
  photo,
  slides,
  actions,
  note,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  titleLines: string[];
  intro: ReactNode;
  photo: Photo;
  /** Se presenti (2+), al posto della foto singola compare uno slider */
  slides?: Slide[];
  actions?: ReactNode;
  note?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">
      <Atmosphere />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 px-6 pb-14 pt-8 lg:min-h-[calc(88svh-80px)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-12 lg:pb-16 lg:pt-10">
        {/* TESTO */}
        <div className="max-w-xl">
          <div className="hero-rise" {...delay(0)}>
            <Breadcrumbs items={crumbs} />
          </div>

          <p
            className="hero-rise mt-10 text-xs font-medium uppercase tracking-[0.22em] text-[#7A5F49] lg:mt-14"
            {...delay(1)}
          >
            {eyebrow}
          </p>

          <h1 className="mt-5 text-[38px] leading-[1.06] tracking-[-0.035em] text-[#3B2118] sm:text-5xl lg:text-[56px]">
            {titleLines.map((line, index) => (
              <span key={line} className="line-mask" {...delay(index)}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <div
            className="hero-rise mt-7 max-w-lg space-y-4 text-base leading-7 text-[#6D625B] md:text-lg md:leading-8"
            {...delay(3)}
          >
            {intro}
          </div>

          {actions && (
            <div
              className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              {...delay(4)}
            >
              {actions}
            </div>
          )}

          {note && (
            <div className="hero-rise mt-8" {...delay(5)}>
              {note}
            </div>
          )}
        </div>

        {/* FOTO — LCP */}
        <div className="relative h-[380px] overflow-hidden bg-[#E8DED4] sm:h-[480px] lg:h-[min(640px,calc(88svh-140px))]">
          {slides && slides.length > 1 ? (
            <HeroSlider slides={slides} />
          ) : (
            <>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#3B2118]/5" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
