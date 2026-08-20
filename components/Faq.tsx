"use client";

import { useState } from "react";

const faqs = [
  {
    question: "È possibile visitare la villa prima di prenotare?",
    answer:
      "Sì. È possibile organizzare una visita su appuntamento per conoscere gli spazi, vedere gli ambienti dal vivo e valutare insieme le soluzioni più adatte al tuo evento.",
  },
  {
    question: "Quante persone può ospitare Villa San Carlo?",
    answer:
      "La capienza varia in base alla tipologia di evento, agli spazi utilizzati e all’allestimento scelto. Durante il primo contatto possiamo consigliarti la configurazione più adatta in base al numero di ospiti.",
  },
  {
    question:
      "È possibile organizzare cerimonia e ricevimento nello stesso luogo?",
    answer:
      "Sì. La presenza di ambienti interni ed esterni permette di organizzare diversi momenti della giornata all’interno della stessa dimora, creando un’esperienza più fluida per te e per i tuoi ospiti.",
  },
  {
    question: "La villa dispone di spazi interni in caso di maltempo?",
    answer:
      "Sì. Villa San Carlo dispone di ambienti interni che possono essere utilizzati per accogliere diversi momenti dell’evento anche in caso di condizioni meteo sfavorevoli.",
  },
  {
    question: "È possibile soggiornare direttamente in villa?",
    answer:
      "Sì. È disponibile la possibilità di soggiornare direttamente nella dimora, così da vivere l’esperienza con più tranquillità e prolungare il tempo trascorso a Villa San Carlo.",
  },
  {
    question: "Organizzate anche eventi aziendali e privati?",
    answer:
      "Sì. Oltre a cerimonie e ricevimenti, Villa San Carlo può ospitare meeting, eventi aziendali, feste private, anniversari e altre occasioni speciali.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">
      {/* BACKGROUND ATMOSFERICO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[10%] top-[5%] h-[560px] w-[560px] rounded-full bg-[#C8AD92]/16 blur-[140px]" />

        <div className="absolute -right-[12%] bottom-[-20%] h-[620px] w-[620px] rounded-full bg-[#A98C74]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-20 lg:px-12 lg:py-28">
        {/* INTRO */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#A58B73]">
            Domande frequenti
          </p>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#CDB9A7]" />
            <span className="text-[10px] text-[#B69A82]">✦</span>
            <span className="h-px w-10 bg-[#CDB9A7]" />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl leading-[1.08] tracking-[-0.025em] text-[#3B2118] sm:text-4xl md:text-5xl lg:text-[52px]">
            Tutto quello che potresti voler sapere prima di scegliere la villa.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#6D625B] sm:text-base md:text-lg md:leading-8">
            Abbiamo raccolto alcune delle domande più comuni per aiutarti a
            capire meglio come vivere e organizzare il tuo evento a Villa San
            Carlo.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="mt-14 border-t border-[#D8CABB] lg:mt-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-[#D8CABB]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-8 py-6 text-left sm:py-7"
                >
                  <span className="max-w-3xl text-lg leading-7 text-[#3B2118] sm:text-xl">
                    {faq.question}
                  </span>

                  <span
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center border border-[#C8AD92] text-[#4A281B] transition-transform duration-500 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-7 text-sm leading-7 text-[#6D625B] sm:text-base sm:leading-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}