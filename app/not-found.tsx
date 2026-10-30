import type { Metadata } from "next";
import Image from "next/image";
import Atmosphere from "@/components/ui/Atmosphere";
import ButtonLink from "@/components/ui/ButtonLink";
import Ornament from "@/components/ui/Ornament";
import { photos } from "@/lib/images";
import { navigation } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">
      <Atmosphere />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:px-12 lg:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7A5F49]">
            Errore 404
          </p>
          <Ornament className="mt-5" />
          <h1 className="mt-6 text-4xl leading-[1.06] tracking-[-0.035em] text-[#3B2118] md:text-5xl lg:text-[56px]">
            Questa stanza della villa non esiste.
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#6D625B] md:text-lg md:leading-8">
            La pagina che cerchi potrebbe essere stata spostata o non essere
            più disponibile. Ecco qualche percorso per ritrovare la strada.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Torna alla home</ButtonLink>
            <ButtonLink href="/contatti" variant="outline">
              Contattaci
            </ButtonLink>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-[#D8CABB] pt-8">
            {navigation.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[#4A281B]/80 transition-colors hover:text-[#4A281B]"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden h-[560px] overflow-hidden bg-[#E8DED4] lg:block">
          <Image
            src={photos.porticoArchi.src}
            alt={photos.porticoArchi.alt}
            fill
            sizes="45vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
