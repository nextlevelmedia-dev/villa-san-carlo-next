import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";
import type { Photo } from "@/lib/images";

export type CrossLink = {
  href: string;
  eyebrow: string;
  title: string;
  cta: string;
  photo: Photo;
};

/** Collegamenti alle altre esperienze (stile delle card della Hero home) */
export default function CrossLinks({
  items,
  heading,
  tone = "white",
}: {
  items: CrossLink[];
  heading: ReactNode;
  tone?: "cream" | "white";
}) {
  return (
    <section
      className={`relative overflow-hidden ${tone === "white" ? "bg-white" : "bg-[#F8F5F0]"}`}
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        {heading}

        <div
          className={`mt-14 grid gap-4 lg:mt-16 ${items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}
        >
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              {...reveal(index, "image")}
              className="group relative block min-h-[300px] overflow-hidden bg-[#3B2118] lg:min-h-[380px]"
            >
              <Image
                src={item.photo.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

              <div className="absolute inset-0 flex items-end p-6">
                <div className="text-white">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/85">
                    {item.eyebrow}
                  </p>
                  <h3 className="text-2xl leading-tight">{item.title}</h3>
                  <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em]">
                    {item.cta} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
