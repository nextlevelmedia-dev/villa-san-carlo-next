import Image from "next/image";
import type { ReactNode } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { reveal } from "@/lib/reveal";
import type { Photo } from "@/lib/images";

/** Fotografia a tutta larghezza con testo, come VillaExperience della home */
export default function PhotoBand({
  photo,
  eyebrow,
  title,
  children,
  action,
}: {
  photo: Photo;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-[#3B2118] lg:min-h-[650px]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/5" />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1440px] items-center px-6 py-20 lg:min-h-[650px] lg:px-12">
        <div className="max-w-xl">
          <SectionHeading eyebrow={eyebrow} title={title} intro={children} light />

          {action && (
            <div {...reveal(3)} className="mt-9">
              {action}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
