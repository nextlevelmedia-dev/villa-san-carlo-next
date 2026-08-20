import Image from "next/image";
import Link from "next/link";

export default function VillaExperience() {
  return (
    <section className="relative min-h-[560px] overflow-hidden lg:min-h-[650px]">
      {/* FOTO FULL WIDTH */}
      <Image
        src="/image/giardino.png"
        alt="Villa San Carlo al tramonto"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* OVERLAY PIÙ LEGGERO */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

      {/* CONTENUTO */}
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1440px] items-center px-6 py-20 lg:min-h-[650px] lg:px-12">
        <div className="max-w-xl text-white">
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/85">
            Esperienze indimenticabili
          </p>

          {/* DIVISORE */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-16 bg-white/55" />
            <span className="text-xs text-white/75">✦</span>
            <span className="h-px w-8 bg-white/55" />
          </div>

          <h2 className="mt-6 max-w-lg text-4xl leading-[1.08] tracking-[-0.025em] md:text-5xl lg:text-[54px]">
            Atmosfere senza tempo, emozioni che restano.
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-white/90 md:text-lg md:leading-8">
            Ogni dettaglio, ogni ambiente e ogni scorcio di Villa San Carlo
            contribuisce a trasformare il tuo evento in un ricordo prezioso.
          </p>

          {/* CTA */}
          <div className="mt-9">
            <Link
              href="/la-villa"
              className="inline-flex min-h-14 items-center justify-center gap-5 bg-[#F8F5F0] px-9 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A281B] transition-colors duration-300 hover:bg-white"
            >
              Scopri la villa
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}