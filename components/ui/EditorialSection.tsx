import Image from "next/image";
import type { ReactNode } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { reveal } from "@/lib/reveal";
import type { Photo } from "@/lib/images";

/** Alternanza testo/fotografia, come ValueProposition della home */
export default function EditorialSection({
  eyebrow,
  title,
  children,
  photo,
  reverse = false,
  action,
  tone = "cream",
  caption,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  photo: Photo;
  reverse?: boolean;
  action?: ReactNode;
  tone?: "cream" | "white";
  caption?: { eyebrow: string; text: string };
}) {
  return (
    <section
      className={`relative overflow-hidden ${tone === "white" ? "bg-white" : "bg-[#F8F5F0]"}`}
    >
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
        <div
          {...reveal(0, "image")}
          className={`relative h-[400px] overflow-hidden bg-[#E8DED4] sm:h-[500px] lg:h-[600px] ${reverse ? "lg:order-2" : ""}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {caption && (
            <div className="absolute bottom-5 left-5 bg-[#F8F5F0] px-5 py-4 md:bottom-7 md:left-7 md:px-6 md:py-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7A5F49]">
                {caption.eyebrow}
              </p>
              <p className="mt-1.5 text-sm text-[#4A281B]">{caption.text}</p>
            </div>
          )}
        </div>

        <div>
          <SectionHeading eyebrow={eyebrow} title={title} intro={children} />

          {action && (
            <div {...reveal(3)} className="mt-9 flex flex-wrap gap-3">
              {action}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
