import Image from "next/image";
import Link from "next/link";

export default function AboutVilla() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* BACKGROUND ATMOSFERICO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-[14%] -top-[18%] h-[620px] w-[620px] rounded-full bg-[#C8AD92]/18 blur-[140px]" />

        <div className="absolute -left-[10%] bottom-[-20%] h-[560px] w-[560px] rounded-full bg-[#DCCABC]/16 blur-[150px]" />
      </div>

      {/* CONTENUTO */}
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-12 lg:py-28">
        {/* FOTO */}
        <div className="relative h-[440px] overflow-hidden sm:h-[520px] lg:h-[650px]">
          <Image
            src="/image/about-villa.PNG"
            alt="Villa San Carlo, dimora storica"
            fill
            priority={false}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />

          {/* VELO LEGGERO */}
          <div className="pointer-events-none absolute inset-0 bg-[#3B2118]/5" />

          {/* LABEL FOTO */}
          <div className="absolute bottom-5 left-5 bg-[#F8F5F0] px-5 py-4 md:bottom-7 md:left-7 md:px-6 md:py-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A58B73]">
              Villa San Carlo
            </p>

            <p className="mt-1.5 text-sm text-[#4A281B]">
              Casa storica
            </p>
          </div>
        </div>

        {/* TESTO */}
        <div className="max-w-[600px]">
          {/* EYEBROW */}
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#A58B73]">
            Una storia da vivere
          </p>

          {/* DIVISORE */}
          <div
            aria-hidden="true"
            className="mt-6 flex items-center gap-3"
          >
            <span className="h-px w-14 bg-[#CDB9A7]" />
            <span className="text-[10px] text-[#B69A82]">✦</span>
            <span className="h-px w-8 bg-[#CDB9A7]" />
          </div>

          {/* TITOLO */}
          <h2 className="mt-7 text-4xl leading-[1.08] tracking-[-0.025em] text-[#3B2118] md:text-5xl lg:text-[52px]">
            Una dimora che custodisce il passato e accoglie nuovi ricordi.
          </h2>

          {/* TESTO */}
          <div className="mt-8 space-y-5">
            <p className="text-base leading-7 text-[#6D625B] md:text-lg md:leading-8">
              Villa San Carlo conserva ancora oggi il carattere, i dettagli e
              l&apos;atmosfera di una vera casa storica. Ogni ambiente racconta
              qualcosa del suo passato, ma è attraverso gli eventi, le persone
              e i momenti vissuti qui che la villa continua a scrivere la
              propria storia.
            </p>

            <p className="text-base leading-7 text-[#6D625B] md:text-lg md:leading-8">
              Una dimora pensata per essere vissuta, dove storia e ospitalità
              incontrano nuove occasioni da celebrare e condividere.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-9">
            <Link
              href="/la-villa"
              className="group inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A281B] transition-opacity duration-300 hover:opacity-60"
            >
              Scopri la storia della villa

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}