import Link from "next/link";

export default function WhyVilla() {
  return (
    <section className="bg-[#F8F5F0]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24">

        {/* INTRO */}
        <div className="mx-auto max-w-4xl text-center">
          <p data-reveal="up" className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#7A5F49]">
            Non una location qualunque
          </p>

          <div data-reveal="fade" data-delay="1" className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#CDB9A7]" />
            <span className="text-sm text-[#B69A82]">✦</span>
            <span className="h-px w-10 bg-[#CDB9A7]" />
          </div>

          <h2 data-split className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.08] tracking-[-0.025em] text-[#3B2118] md:text-5xl lg:text-[54px]">
            Il tuo evento merita un luogo che si faccia ricordare.
          </h2>

          <p data-reveal="up" data-delay="2" className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#6D625B] md:text-lg">
            Non solo uno spazio da allestire, ma un’autentica dimora storica
            da vivere. Ambienti interni ed esterni, atmosfere diverse e tutto
            ciò che serve per accogliere ogni momento dell’evento.
          </p>
        </div>

        {/* 3 BENEFIT */}
        <div data-reveal-group className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-16 lg:grid-cols-3 lg:gap-0">

          {/* 01 */}
          <div data-reveal="up" className="relative px-2 text-center sm:px-5 lg:px-10">
            <span className="block text-xs tracking-[0.14em] text-[#7A5F49] sm:text-sm">
              01
            </span>

            <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center text-[#A98C74] sm:mt-6 sm:h-16 sm:w-16">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path d="M12 52V24L32 14l20 10v28" />
                <path d="M8 52h48" />
                <path d="M19 30h7v8h-7zM38 30h7v8h-7z" />
                <path d="M27 52V41h10v11" />
                <path d="M20 18V10M44 18V10" />
              </svg>
            </div>

            <h3 className="mt-4 text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-[#4A281B] sm:mt-5 sm:text-xs sm:tracking-[0.2em]">
              Un luogo autentico
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-[#6D625B] sm:mt-4 sm:text-sm sm:leading-6">
              Il fascino intramontabile di un’autentica dimora storica.
            </p>
          </div>

          {/* 02 */}
          <div className="relative border-l border-[#DCCFC3] px-2 text-center sm:px-5 lg:border-x lg:px-10">
            <span className="block text-xs tracking-[0.14em] text-[#7A5F49] sm:text-sm">
              02
            </span>

            <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center text-[#A98C74] sm:mt-6 sm:h-16 sm:w-16">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path d="M11 52h42" />
                <path d="M17 52V25h30v27" />
                <path d="M14 25h36l-4-7H18l-4 7Z" />
                <path d="M24 52V35c0-5 3-8 8-8s8 3 8 8v17" />
              </svg>
            </div>

            <h3 className="mt-4 text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-[#4A281B] sm:mt-5 sm:text-xs sm:tracking-[0.2em]">
              Ogni momento, il suo spazio
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-[#6D625B] sm:mt-4 sm:text-sm sm:leading-6">
              Cerimonie, ricevimenti, feste o meeting tra ambienti interni ed
              esterni.
            </p>
          </div>

          {/* 03 */}
          <div className="relative col-span-2 mx-auto max-w-[420px] border-t border-[#DCCFC3] px-6 pt-10 text-center lg:col-span-1 lg:max-w-none lg:border-t-0 lg:px-10 lg:pt-0">
            <span className="block text-xs tracking-[0.14em] text-[#7A5F49] sm:text-sm">
              03
            </span>

            <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center text-[#A98C74] sm:mt-6 sm:h-16 sm:w-16">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path d="M8 48h48" />
                <path d="M13 48V33h38v15" />
                <path d="M18 33v-7h12c4 0 7 3 7 7" />
                <path d="M13 41h38" />
                <path d="M49 26V14M44 14h10M46 14l3-7 3 7" />
              </svg>
            </div>

            <h3 className="mt-4 text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-[#4A281B] sm:mt-5 sm:text-xs sm:tracking-[0.2em]">
              Tutto nella stessa dimora
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-[#6D625B] sm:mt-4 sm:text-sm sm:leading-6">
              Dall’evento al soggiorno, per vivere ogni momento senza cambiare
              location.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div data-reveal="up" data-delay="3" className="mt-12 flex justify-center lg:mt-14">
          <Link
            href="/cerimonie"
            className="inline-flex min-h-14 items-center justify-center gap-5 bg-[#4A281B] px-8 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#5B3325] sm:px-10"
          >
            Scopri gli spazi
            <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}