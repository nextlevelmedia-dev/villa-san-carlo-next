import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "01",
    eyebrow: "Raccontaci",
    title: "Partiamo dall’evento che immagini.",
    text: "Raccontaci l’occasione, il numero di ospiti e l’atmosfera che vorresti creare. Ogni evento nasce da un’idea diversa e Villa San Carlo offre ambienti capaci di accoglierla con naturalezza.",
    image: "/images/evento01.jpg",
    alt: "Dettaglio di un evento a Villa San Carlo",
  },
  {
    number: "02",
    eyebrow: "Scopri gli spazi",
    title: "Trova l’ambiente giusto per ogni momento.",
    text: "Sale storiche, corte, portici e giardino permettono di immaginare ogni fase dell’evento in uno spazio diverso, mantenendo tutto all’interno della stessa dimora.",
    image: "/images/matrimonio-giardino.jpg",
    alt: "Spazi interni ed esterni di Villa San Carlo",
  },
  {
    number: "03",
    eyebrow: "Vivi la villa",
    title: "Goditi ogni momento, senza fretta.",
    text: "Dall’arrivo degli ospiti fino alla fine della giornata, tutto può essere vissuto a Villa San Carlo. E con la possibilità di soggiornare, l’esperienza può continuare anche oltre l’evento.",
    image: "/images/soggiorno.jpg",
    alt: "Ospitalità a Villa San Carlo",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">
      {/* BACKGROUND ATMOSFERICO — stesso della Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[12%] -top-[25%] h-[620px] w-[620px] rounded-full bg-[#C8AD92]/22 blur-[120px]" />

        <div className="absolute left-[18%] top-[30%] h-[520px] w-[520px] rounded-full bg-[#DCCABC]/20 blur-[140px]" />

        <div className="absolute -right-[10%] bottom-[-30%] h-[620px] w-[620px] rounded-full bg-[#A98C74]/12 blur-[150px]" />
      </div>

      {/* CONTENUTO */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-20 sm:px-6 lg:px-12 lg:py-28">

        {/* INTRO */}
        <div className="mx-auto max-w-4xl text-center">
          <p data-reveal="up" className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#7A5F49] sm:text-[11px]">
            Come si vive Villa San Carlo
          </p>

          <div data-reveal="fade" data-delay="1" className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#CDB9A7]" />
            <span className="text-[10px] text-[#B69A82]">✦</span>
            <span className="h-px w-10 bg-[#CDB9A7]" />
          </div>

          <h2 data-split className="mx-auto mt-6 max-w-3xl text-3xl leading-[1.08] tracking-[-0.025em] text-[#3B2118] sm:text-4xl md:text-5xl lg:text-[54px]">
            Il tuo evento, dall’idea al ricordo, tutto nello stesso luogo.
          </h2>

          <p data-reveal="up" data-delay="2" className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#6D625B] sm:text-base md:text-lg md:leading-8">
            Immagina il tuo evento, scegli gli spazi che meglio lo rappresentano
            e vivi ogni momento nel fascino di una vera dimora storica.
          </p>
        </div>

        {/* 3 STEP */}
        <div data-reveal-group className="mt-14 grid gap-12 md:grid-cols-3 md:gap-5 lg:mt-16 lg:gap-7">
          {steps.map((step) => (
            <article key={step.number} data-reveal="up" className="group">
              {/* IMAGE */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E8DED4] md:aspect-[4/4.3] lg:aspect-[4/3.6]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-[#3B2118]/5" />

                {/* NUMERO */}
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center bg-[#F8F5F0] text-[11px] font-medium tracking-[0.12em] text-[#4A281B] lg:left-6 lg:top-6">
                  {step.number}
                </div>
              </div>

              {/* COPY */}
              <div className="pt-6 lg:pt-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#7A5F49]">
                  {step.eyebrow}
                </p>

                <h3 className="mt-3 max-w-sm text-[26px] leading-[1.1] tracking-[-0.02em] text-[#3B2118] lg:text-[30px]">
                  {step.title}
                </h3>

                <div className="mt-5 h-px w-full bg-[#D8CABB]" />

                <p className="mt-5 max-w-md text-sm leading-7 text-[#6D625B] lg:text-[15px]">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div data-reveal="up" data-delay="3" className="mt-14 flex flex-col items-center lg:mt-16">
          <p className="mb-5 text-center text-sm leading-6 text-[#6F625A]">
            Hai già in mente il tuo evento?
          </p>

          <Link
            href="/contatti"
            className="group inline-flex min-h-14 w-full items-center justify-center gap-5 bg-[#4A281B] px-9 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#5B3325] sm:w-auto"
          >
            Raccontaci la tua idea

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}