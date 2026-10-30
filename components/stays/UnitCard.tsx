import Image from "next/image";
import Link from "next/link";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { reveal } from "@/lib/reveal";
import type { StayUnit } from "@/lib/stays";

/**
 * Scheda di una singola unità. Mostra solo i dati compilati in
 * lib/stays.ts: nessun valore di esempio viene mai esposto.
 */
export default function UnitCard({
  unit,
  index,
}: {
  unit: StayUnit;
  index: number;
}) {
  const cover = unit.photos[0];
  const details = [
    unit.maxGuests && `Fino a ${unit.maxGuests} ospiti`,
    unit.size && `${unit.size} m²`,
    unit.beds,
  ].filter(Boolean) as string[];
  const kindLabel = unit.kind === "apartment" ? "Appartamento indipendente" : "Camera in villa";

  return (
    <article
      id={unit.id}
      {...reveal(index % 3)}
      className="flex scroll-mt-28 flex-col border border-[#E2D6C9] bg-[#FBF8F4]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <PhotoPlaceholder label={unit.name} className="h-full w-full border-0" />
        )}

        {unit.accessible && (
          <span className="absolute left-4 top-4 bg-[#4A281B] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
            Accessibile
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7A5F49]">
          {kindLabel}
        </p>

        <h3 className="mt-3 text-2xl leading-tight tracking-[-0.015em] text-[#3B2118]">
          {unit.name}
        </h3>

        {unit.description && (
          <p className="mt-4 text-[15px] leading-7 text-[#6D625B]">
            {unit.description}
          </p>
        )}

        {unit.accessible && !unit.description && (
          <p className="mt-4 text-[15px] leading-7 text-[#6D625B]">
            Camera pensata per l&apos;accoglienza di ospiti con disabilità.
            Contattaci per ricevere i dettagli sull&apos;accessibilità.
          </p>
        )}

        {details.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {details.map((detail) => (
              <li
                key={detail}
                className="border border-[#D8CABB] px-3 py-1.5 text-xs text-[#4A281B]"
              >
                {detail}
              </li>
            ))}
          </ul>
        )}

        {unit.amenities.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm text-[#6D625B]">
            {unit.amenities.map((amenity) => (
              <li key={amenity} className="flex items-start gap-2">
                <span aria-hidden="true" className="text-[#B69A82]">
                  ✦
                </span>
                {amenity}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-7">
          <Link
            href={`/contatti?tipo=soggiorno&unita=${unit.id}`}
            className="group inline-flex min-h-11 items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A281B] transition-opacity duration-300 hover:opacity-60"
          >
            Richiedi disponibilità
            <span className="sr-only"> per {unit.name}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
