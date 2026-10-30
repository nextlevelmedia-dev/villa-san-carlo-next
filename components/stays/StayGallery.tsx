import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { reveal } from "@/lib/reveal";
import type { Photo } from "@/lib/images";

/**
 * Galleria separata per tipologia: le fotografie di camere e
 * appartamenti non si mescolano. Se le foto sono meno di tre, gli
 * spazi rimanenti mostrano un segnaposto dichiarato.
 */
export default function StayGallery({
  groups,
}: {
  groups: { title: string; photos: Photo[] }[];
}) {
  return (
    <section className="bg-[#F8F5F0]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Galleria"
          title="Camere e appartamenti, da vicino."
        />

        <div className="mt-14 space-y-14 lg:mt-16">
          {groups.map((group) => {
            const slots = Math.max(3, group.photos.length);

            return (
              <div key={group.title}>
                <h3
                  {...reveal(0)}
                  className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]"
                >
                  {group.title}
                </h3>

                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {Array.from({ length: slots }, (_, index) => {
                    const photo = group.photos[index];

                    return (
                      <li
                        key={photo?.src ?? `${group.title}-${index}`}
                        {...reveal(index % 3, "image")}
                        className="relative aspect-[4/5] overflow-hidden bg-[#E8DED4]"
                      >
                        {photo ? (
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <PhotoPlaceholder label={group.title} className="h-full w-full" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
