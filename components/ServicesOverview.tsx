import Link from "next/link";

const services = [
  {
    number: "01",
    eyebrow: "Cerimonie",
    title: "Cerimonie & Ricevimenti",
    text: "Celebra il tuo giorno in una dimora che diventa parte del ricordo, tra sale storiche, corte e giardino.",
    href: "/cerimonie",
  },
  {
    number: "02",
    eyebrow: "Aziende",
    title: "Eventi & Meeting",
    text: "Dai carattere ai tuoi incontri aziendali con ambienti riservati, eleganti e lontani dalle solite sale meeting.",
    href: "/eventi-meeting",
  },
  {
    number: "03",
    eyebrow: "Occasioni speciali",
    title: "Eventi Privati",
    text: "Trasforma compleanni, anniversari e momenti importanti in esperienze da condividere in un luogo tutto da vivere.",
    href: "/eventi-privati",
  },
  {
    number: "04",
    eyebrow: "Ospitalità",
    title: "Soggiorni",
    text: "Prolunga il piacere di essere insieme e vivi la villa senza fretta, soggiornando direttamente nella dimora.",
    href: "/soggiorno",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-[#3B2118] text-[#F8F5F0]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">

        {/* INTRO */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#C8AD92]">
            Vivi Villa San Carlo
          </p>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#8F6F5D]" />
            <span className="text-[10px] text-[#C8AD92]">✦</span>
            <span className="h-px w-10 bg-[#8F6F5D]" />
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.08] tracking-[-0.025em] md:text-5xl lg:text-[54px]">
            Un luogo, quattro modi di renderlo tuo.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#E2D5CB] md:text-lg md:leading-8">
            Dalle occasioni più importanti ai momenti da vivere senza fretta,
            scopri le esperienze che Villa San Carlo può accogliere.
          </p>
        </div>

        {/* GRID SERVIZI */}
        <div className="mt-16 grid border-t border-[#6B4B3D] md:grid-cols-2">

          {services.map((service, index) => {
            const rightColumn = index % 2 === 1;
            const bottomRow = index >= 2;

            return (
              <article
                key={service.title}
                className={`relative py-10 md:p-12 ${
                  rightColumn ? "md:border-l md:border-[#6B4B3D]" : ""
                } ${
                  bottomRow ? "border-t border-[#6B4B3D]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-8">
                  <span className="text-sm tracking-[0.14em] text-[#C8AD92]">
                    {service.number}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A98C74]">
                    {service.eyebrow}
                  </span>
                </div>

                <h3 className="mt-8 max-w-md text-3xl leading-tight tracking-[-0.02em] md:text-4xl">
                  {service.title}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[#D7C7BC] md:text-base">
                  {service.text}
                </p>

                <div className="mt-8">
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F8F5F0] transition-opacity hover:opacity-70"
                  >
                    Scopri di più
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}