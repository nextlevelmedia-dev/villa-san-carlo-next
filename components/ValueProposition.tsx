import Image from "next/image";
import Link from "next/link";

const items = [
  {
    eyebrow: "Un luogo con identità",
    title: "Non una sala da riempire, ma una dimora da vivere.",
    text: "Villa San Carlo non è una semplice location, ma una dimora storica da vivere. Ambienti autentici, sale ricche di fascino e dettagli che raccontano una storia creano una cornice capace di dare carattere a ogni momento. Qui il tuo evento prende vita in un’atmosfera intima ed esclusiva, lontana dagli spazi impersonali, trasformandosi in un’esperienza speciale da condividere con le persone che ami e ricordare nel tempo.",
    cta: "Scopri la villa",
    href: "/la-villa",
    image: "/images/buchirale.jpg",
    alt: "Interni storici di Villa San Carlo",
  },
  {
    eyebrow: "Spazi che si adattano a te",
    title:
      "Dal primo brindisi all’ultimo ballo, ogni momento trova il suo spazio.",
    text: "Sale storiche, corte, portici e giardino ti permettono di costruire ogni fase dell’evento in un ambiente diverso. Dall’accoglienza alla cena, fino ai momenti più intimi, tutto può essere vissuto all’interno della stessa dimora con naturalezza e continuità.",
    cta: "Esplora gli spazi",
    href: "/cerimonie",
    image: "/images/festa.jpg",
    alt: "Ricevimento ed evento a Villa San Carlo",
  },
  {
    eyebrow: "Tutto nella stessa dimora",
    title: "Vivi l’esperienza senza dover cambiare location.",
    text: "Con la possibilità di soggiornare direttamente in villa, tu e i tuoi ospiti potete vivere Villa San Carlo senza fretta. Un’esperienza più intima e completa, dove evento, ospitalità e tempo insieme diventano parte dello stesso ricordo.",
    cta: "Scopri l’ospitalità",
    href: "/soggiorni",
    image: "/images/ospitalita.jpg",
    alt: "Ospitalità e interni di Villa San Carlo",
  },
];

export default function ValueProposition() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">
      {/* BACKGROUND ATMOSFERICO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-[15%] top-[2%] h-[680px] w-[680px] rounded-full bg-[#C8AD92]/20 blur-[140px]" />

        <div className="absolute -left-[8%] top-[36%] h-[620px] w-[620px] rounded-full bg-[#DCCABC]/18 blur-[150px]" />

        <div className="absolute right-[18%] bottom-[-12%] h-[580px] w-[580px] rounded-full bg-[#A98C74]/10 blur-[160px]" />
      </div>

      {/* CONTENUTO */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="space-y-24 lg:space-y-32">
          {items.map((item, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={item.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* IMAGE */}
                <div data-reveal="image" className="relative min-h-[360px] overflow-hidden md:min-h-[460px] lg:min-h-[540px]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* COPY */}
<div className="max-w-[620px]">
  {/* EYEBROW */}
  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
    {item.eyebrow}
  </p>

  {/* DIVISORE */}
  <div
    aria-hidden="true"
    data-reveal="fade" data-delay="1"
            className="mt-6 flex items-center gap-3"
  >
    <span className="h-px w-14 bg-[#CDB9A7]" />
    <span className="text-[10px] text-[#B69A82]">✦</span>
    <span className="h-px w-8 bg-[#CDB9A7]" />
  </div>

  {/* TITOLO */}
  <h2 data-reveal="up" data-delay="1" className="mt-7 text-4xl leading-[1.08] tracking-[-0.025em] text-[#3B2118] md:text-5xl lg:text-[52px]">
    {item.title}
  </h2>

  {/* TESTO */}
  <p data-reveal="up" data-delay="2" className="mt-8 max-w-[590px] text-base leading-7 text-[#6D625B] md:text-lg md:leading-8">
    {item.text}
  </p>

  {/* CTA */}
  <div data-reveal="up" data-delay="3" className="mt-10">
    <Link
      href={item.href}
      className="group inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A281B] transition-opacity hover:opacity-60"
    >
      {item.cta}

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
          })}
        </div>
      </div>
    </section>
  );
}