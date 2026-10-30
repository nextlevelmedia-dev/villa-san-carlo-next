import Image from "next/image";
import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";
import type { Photo } from "@/lib/images";

export type SpaceCard = {
  eyebrow: string;
  title: string;
  text: string;
  photo: Photo;
};

/** Griglia di ambienti: fotografia, etichetta, titolo H3 e descrizione */
export default function SpaceCards({
  items,
  heading,
  tone = "white",
  columns = 3,
}: {
  items: SpaceCard[];
  heading: ReactNode;
  tone?: "cream" | "white";
  columns?: 2 | 3 | 4;
}) {
  const grid =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section
      className={`relative overflow-hidden ${tone === "white" ? "bg-white" : "bg-[#F8F5F0]"}`}
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        {heading}

        <div className={`mt-14 grid gap-12 md:gap-6 lg:mt-16 lg:gap-7 ${grid}`}>
          {items.map((item, index) => (
            <article key={item.title}>
              <div
                {...reveal(index % columns, "image")}
                className="relative aspect-[4/3.4] overflow-hidden bg-[#E8DED4]"
              >
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  sizes={`(max-width: 768px) 100vw, ${Math.round(100 / columns)}vw`}
                  className="object-cover"
                />
              </div>

              <div {...reveal((index % columns) + 1)} className="pt-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7A5F49]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl leading-tight tracking-[-0.015em] text-[#3B2118] md:text-[26px]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[#6D625B]">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
