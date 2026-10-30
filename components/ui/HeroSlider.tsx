"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/lib/images";

export type Slide = { photo: Photo; label: string };

const INTERVAL = 6000;

/**
 * Slider della hero: dissolvenza tra le foto, frecce, indicatori e
 * autoplay. La prima immagine è l'elemento LCP (priorità alta);
 * l'autoplay si sospende al passaggio del mouse e al focus, ed è
 * disattivato con prefers-reduced-motion.
 */
export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const count = slides.length;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hovered || reduced || count < 2) return;

    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % count),
      INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [active, hovered, count]);

  // La navigazione manuale fa ripartire il conteggio dell'autoplay
  const go = (index: number) => setActive((index + count) % count);

  return (
    <div
      role="region"
      aria-roledescription="carosello"
      aria-label="Fotografie degli appartamenti"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className="absolute inset-0"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.photo.src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} di ${count}: ${slide.label}`}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.61,0.24,1)] ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.photo.src}
            alt={slide.photo.alt}
            fill
            loading="eager"
            fetchPriority={index === 0 ? "high" : "low"}
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[#3B2118]/5" />

      {/* ETICHETTA */}
      <div
        aria-live={hovered ? "polite" : "off"}
        className="absolute bottom-5 left-5 bg-[#F8F5F0] px-5 py-4 md:bottom-7 md:left-7 md:px-6"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7A5F49]">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <p className="mt-1.5 text-sm text-[#4A281B]">{slides[active].label}</p>
      </div>

      {/* CONTROLLI */}
      {count > 1 && (
        <div className="absolute bottom-5 right-5 flex items-center gap-2 md:bottom-7 md:right-7">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Foto precedente"
            className="flex h-11 w-11 items-center justify-center bg-[#F8F5F0]/90 text-[#4A281B] transition-colors hover:bg-[#F8F5F0]"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="hidden items-center sm:flex">
            {slides.map((slide, index) => (
              <button
                key={slide.photo.src}
                type="button"
                onClick={() => go(index)}
                aria-label={`Mostra ${slide.label}`}
                aria-current={index === active ? "true" : undefined}
                className="flex h-11 w-7 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-500 ${
                    index === active ? "w-6 bg-white" : "w-3 bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Foto successiva"
            className="flex h-11 w-11 items-center justify-center bg-[#F8F5F0]/90 text-[#4A281B] transition-colors hover:bg-[#F8F5F0]"
          >
            <span aria-hidden="true">→</span>
          </button>

        </div>
      )}
    </div>
  );
}
