import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/site";

export default function FinalCTA() {
  const whatsapp = whatsappUrl(
    "Buongiorno, vorrei ricevere informazioni su Villa San Carlo.",
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#F8F5F0]">
      {/* =========================================================
          DESKTOP / TABLET
      ========================================================= */}
      <div className="relative hidden min-h-[620px] md:block">
        {/* FOTO FULL WIDTH */}
        <Image
          src="/images/final-cta.jpg"
          alt="Evento serale nel cortile di Villa San Carlo"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* OVERLAY LEGGERISSIMO */}
        <div className="absolute inset-0 bg-black/[0.06]" />

        {/* CONTENITORE CENTRATO */}
        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1440px] items-center justify-center px-6 lg:px-12">
          {/* CARD ORIZZONTALE */}
          <div data-reveal="up" className="w-full max-w-[820px] bg-[#FBF8F4] px-10 py-10 shadow-[0_24px_70px_rgba(35,20,14,0.15)] lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              {/* SINISTRA */}
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#7A5F49]">
                  Il tuo evento inizia da qui
                </p>

                {/* DIVISORE */}
                <div
                  aria-hidden="true"
                  className="mt-5 flex items-center gap-3"
                >
                  <span className="h-px w-14 bg-[#CDB9A7]" />
                  <span className="text-[10px] text-[#B69A82]">✦</span>
                  <span className="h-px w-8 bg-[#CDB9A7]" />
                </div>

                <h2 className="mt-6 max-w-[460px] text-[42px] leading-[1.04] tracking-[-0.03em] text-[#3B2118]">
                  Raccontaci cosa hai in mente.
                </h2>

                <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-[#6D625B]">
                  Che si tratti di una cerimonia, una festa privata o un
                  incontro aziendale, raccontaci la tua idea. Ti aiuteremo a
                  capire quali spazi e soluzioni di Villa San Carlo sono più
                  adatti alla tua occasione.
                </p>
              </div>

              {/* DESTRA */}
              <div>
                {/* BENEFIT */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#CDB9A7] text-[10px] text-[#4A281B]">
                      ✓
                    </span>

                    <span className="text-sm leading-6 text-[#4A281B]">
                      Scopri la disponibilità della villa
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#CDB9A7] text-[10px] text-[#4A281B]">
                      ✓
                    </span>

                    <span className="text-sm leading-6 text-[#4A281B]">
                      Ricevi informazioni sugli spazi
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#CDB9A7] text-[10px] text-[#4A281B]">
                      ✓
                    </span>

                    <span className="text-sm leading-6 text-[#4A281B]">
                      Organizza una visita a Villa San Carlo
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-7 flex flex-wrap gap-3">
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#4A281B] px-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#5B3325]"
                    >
                      WhatsApp
                    </a>
                  )}

                  <Link
                    href="/contatti"
                    className={`inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[10px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                      whatsapp
                        ? "border border-[#CDB9A7] text-[#4A281B] hover:border-[#4A281B]"
                        : "bg-[#4A281B] text-white hover:bg-[#5B3325]"
                    }`}
                  >
                    Contatti
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* MICROCOPY */}
                <p className="mt-5 max-w-[300px] text-[11px] leading-5 text-[#6F625A]">
                  Scrivici senza impegno. Ti aiuteremo a capire se Villa San
                  Carlo è il luogo giusto per il tuo evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE
      ========================================================= */}
      <div className="md:hidden">
        {/* FOTO */}
        <div className="relative h-[320px] w-full">
          <Image
            src="/images/matrimonio-cortile.jpg"
            alt="Evento serale nel cortile di Villa San Carlo"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/[0.04]" />
        </div>

        {/* CARD MOBILE */}
        <div data-reveal="up" className="relative z-10 mx-4 -mt-8 bg-[#FBF8F4] px-6 py-8 shadow-[0_18px_50px_rgba(35,20,14,0.12)]">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
            Il tuo evento inizia da qui
          </p>

          <div
            aria-hidden="true"
            className="mt-5 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-[#CDB9A7]" />
            <span className="text-[9px] text-[#B69A82]">✦</span>
            <span className="h-px w-7 bg-[#CDB9A7]" />
          </div>

          <h2 className="mt-5 text-[34px] leading-[1.05] tracking-[-0.03em] text-[#3B2118]">
            Raccontaci cosa hai in mente.
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-[#6D625B]">
            Raccontaci il tuo evento. Ti aiuteremo a capire quali spazi e
            soluzioni di Villa San Carlo sono più adatti alla tua occasione.
          </p>

          {/* BENEFIT */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center border border-[#CDB9A7] text-[10px] text-[#4A281B]">
                ✓
              </span>

              <span className="text-sm leading-5 text-[#4A281B]">
                Scopri la disponibilità della villa
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center border border-[#CDB9A7] text-[10px] text-[#4A281B]">
                ✓
              </span>

              <span className="text-sm leading-5 text-[#4A281B]">
                Ricevi informazioni sugli spazi
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center border border-[#CDB9A7] text-[10px] text-[#4A281B]">
                ✓
              </span>

              <span className="text-sm leading-5 text-[#4A281B]">
                Organizza una visita a Villa San Carlo
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex flex-col gap-3">
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 w-full items-center justify-center bg-[#4A281B] px-5 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-white"
              >
                Parla con noi su WhatsApp
              </a>
            )}

            <Link
              href="/contatti"
              className={`flex min-h-14 w-full items-center justify-center gap-4 px-5 text-[10px] font-medium uppercase tracking-[0.15em] ${
                whatsapp
                  ? "border border-[#CDB9A7] text-[#4A281B]"
                  : "bg-[#4A281B] text-white"
              }`}
            >
              Contatti
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="mt-5 text-[11px] leading-5 text-[#6F625A]">
            Scrivici senza impegno. Ti aiuteremo a capire se Villa San Carlo è
            il luogo giusto per il tuo evento.
          </p>
        </div>

        <div className="h-10 bg-[#F8F5F0]" />
      </div>
    </section>
  );
}