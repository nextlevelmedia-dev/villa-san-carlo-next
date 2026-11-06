import Image from "next/image";
import Link from "next/link";
import { delay } from "@/lib/reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">
      {/* BACKGROUND ATMOSFERICO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[12%] -top-[25%] h-[620px] w-[620px] rounded-full bg-[#C8AD92]/22 blur-[120px]" />

        <div className="absolute left-[18%] top-[30%] h-[520px] w-[520px] rounded-full bg-[#DCCABC]/20 blur-[140px]" />

        <div className="absolute -right-[10%] bottom-[-30%] h-[620px] w-[620px] rounded-full bg-[#A98C74]/12 blur-[150px]" />
      </div>

      {/* HERO PRINCIPALE */}
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-12">
        {/* SINISTRA */}
        <div className="max-w-xl">
          <p
            className="hero-rise mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#7A5F49]"
            {...delay(0)}
          >
            Villa San Carlo · Casa Storica
          </p>

          <h1
            data-split
            data-split-delay="0.15"
            className="max-w-[620px] text-4xl leading-[1.06] tracking-[-0.035em] text-[#3B2118] md:text-5xl lg:text-[54px]"
          >
            Vivi un evento indimenticabile nel fascino di un’autentica dimora
            storica.
          </h1>

          <p
            className="hero-rise mt-7 max-w-lg text-base leading-7 text-[#6D625B] md:text-lg md:leading-8"
            {...delay(2)}
          >
            Una villa storica ed esclusiva dove celebrare cerimonie, eventi
            privati e incontri aziendali, con la possibilità di soggiornare e
            vivere ogni momento senza fretta.
          </p>

          <div className="hero-rise mt-9" {...delay(3)}>
            <Link
              href="/la-villa"
              className="inline-flex min-h-14 items-center justify-center bg-[#4A281B] px-8 text-xs font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#5B3325]"
            >
              Scopri Villa San Carlo
            </Link>
          </div>
        </div>

        {/* DESTRA — 4 SERVIZI */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* CERIMONIE */}
          <Link
            href="/cerimonie"
            className="group relative min-h-[250px] overflow-hidden"
          >
            <Image
              src="/images/location-villa-san-carlo.jpg"
              alt="Cerimonie e ricevimenti a Villa San Carlo"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 27vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-white">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/80">
                  Matrimoni · Cerimonie
                </p>

                <h2 className="text-2xl leading-tight">
                  Cerimonie & Ricevimenti
                </h2>

                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em]">
                  Scopri gli spazi →
                </span>
              </div>
            </div>
          </Link>

          {/* EVENTI & MEETING */}
          <Link
            href="/eventi-meeting"
            className="group relative min-h-[250px] overflow-hidden"
          >
            <Image
              src="/images/location-eventi.jpg"
              alt="Eventi e meeting a Villa San Carlo"
              fill
              sizes="(max-width: 1024px) 100vw, 27vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-white">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/80">
                  Aziende · Meeting
                </p>

                <h2 className="text-2xl leading-tight">
                  Eventi & Meeting
                </h2>

                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em]">
                  Scopri le possibilità →
                </span>
              </div>
            </div>
          </Link>

          {/* EVENTI PRIVATI */}
          <Link
            href="/eventi-privati"
            className="group relative min-h-[250px] overflow-hidden"
          >
            <Image
              src="/images/eventi-privati.jpg"
              alt="Eventi privati a Villa San Carlo"
              fill
              sizes="(max-width: 1024px) 100vw, 27vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-white">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/80">
                  Feste · Occasioni speciali
                </p>

                <h2 className="text-2xl leading-tight">
                  Eventi Privati
                </h2>

                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em]">
                  Scopri di più →
                </span>
              </div>
            </div>
          </Link>

          {/* SOGGIORNO */}
          <Link
            href="/soggiorni"
            className="group relative min-h-[250px] overflow-hidden"
          >
            <Image
              src="/images/camera-3-v2.webp"
              alt="Camera della villa con letto in ferro battuto e soffitto con travi in legno"
              fill
              sizes="(max-width: 1024px) 100vw, 27vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-white">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/80">
                  Ospitalità · Relax
                </p>

                <h2 className="text-2xl leading-tight">
                  Soggiorni
                </h2>

                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em]">
                  Scopri l&apos;ospitalità →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* TRUST / VALUE STRIP */}
      <div className="relative z-10 border-t border-[#D8CABB] bg-[#F3EEE7]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-6 py-8 md:grid-cols-[1.1fr_repeat(4,1fr)] md:gap-5 lg:px-12">

          {/* IDENTITÀ */}
          <div className="col-span-2 flex items-center md:col-span-1 md:pr-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#A58B73] text-[#4A281B]">
                <span className="text-sm font-medium">SC</span>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#7A5F49]">
                  Villa San Carlo
                </p>

                <p className="mt-1 text-sm text-[#4A281B]">
                  Dimora storica esclusiva
                </p>
              </div>
            </div>
          </div>

          {/* CARD 1 */}
          <div className="border border-[#D8CABB] bg-[#FBF8F4] p-4 sm:p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A5F49] sm:text-[11px] sm:tracking-[0.18em]">
              Dimora storica
            </p>

            <p className="mt-3 text-xs leading-5 text-[#4A281B] sm:text-sm sm:leading-6">
              Il fascino autentico di una villa ricca di storia.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="border border-[#D8CABB] bg-[#FBF8F4] p-4 sm:p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A5F49] sm:text-[11px] sm:tracking-[0.18em]">
              Spazi versatili
            </p>

            <p className="mt-3 text-xs leading-5 text-[#4A281B] sm:text-sm sm:leading-6">
              Ambienti interni ed esterni per occasioni diverse.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="border border-[#D8CABB] bg-[#FBF8F4] p-4 sm:p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A5F49] sm:text-[11px] sm:tracking-[0.18em]">
              Eventi su misura
            </p>

            <p className="mt-3 text-xs leading-5 text-[#4A281B] sm:text-sm sm:leading-6">
              Cerimonie, eventi privati e incontri aziendali.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="border border-[#D8CABB] bg-[#FBF8F4] p-4 sm:p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A5F49] sm:text-[11px] sm:tracking-[0.18em]">
              Ospitalità
            </p>

            <p className="mt-3 text-xs leading-5 text-[#4A281B] sm:text-sm sm:leading-6">
              La possibilità di soggiornare direttamente in villa.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}