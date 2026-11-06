"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const differentiators = [
  {
    number: "01",
    title: "Una vera dimora storica",
    text: "Non una location costruita per eventi, ma una casa autentica con storia, carattere e dettagli capaci di rendere ogni occasione unica.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M8 39V18L24 10l16 8v21" />
        <path d="M5 39h38" />
        <path d="M15 23h6v7h-6zM27 23h6v7h-6z" />
        <path d="M20 39V31h8v8" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Spazi interni ed esterni",
    text: "Sale storiche, corte, portici e giardino permettono di creare atmosfere diverse e accompagnare ogni fase dell’evento.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M7 39h34" />
        <path d="M11 39V19h26v20" />
        <path d="M8 19h32l-4-7H12l-4 7Z" />
        <path d="M18 39V27h12v12" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Un’esperienza più riservata",
    text: "Ambienti intimi e raccolti per vivere il tuo evento con più libertà, autenticità e attenzione alle persone che hai scelto di avere accanto.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M24 41s14-8 14-20V10L24 6 10 10v11c0 12 14 20 14 20Z" />
        <path d="m18 23 4 4 8-9" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Ospitalità nella stessa villa",
    text: "La possibilità di soggiornare direttamente nella dimora permette a te e ai tuoi ospiti di prolungare l’esperienza senza cambiare luogo.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M7 36h34" />
        <path d="M10 36V24h28v12" />
        <path d="M10 29h28" />
        <path d="M14 24v-6h9c4 0 7 2 7 6" />
        <path d="M10 36v4M38 36v4" />
      </svg>
    ),
  },
];

export default function Differentiators() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#F8F5F0]">
      {/* INTRO */}
      <div className="mx-auto max-w-[1440px] px-6 pb-12 pt-20 text-center lg:px-12 lg:pb-14 lg:pt-28">
        <p data-reveal="up" className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#7A5F49] sm:text-[11px]">
          Perché Villa San Carlo
        </p>

        <div data-reveal="fade" data-delay="1" className="mx-auto mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#CDB9A7]" />
          <span className="text-[10px] text-[#B69A82]">✦</span>
          <span className="h-px w-10 bg-[#CDB9A7]" />
        </div>

        <h2 data-split className="mx-auto mt-6 max-w-4xl text-3xl leading-[1.08] tracking-[-0.025em] text-[#3B2118] sm:text-4xl md:text-5xl lg:text-[54px]">
          Tutto ciò che serve per vivere un evento davvero memorabile.
        </h2>

        <p data-reveal="up" data-delay="2" className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#6D625B] sm:text-base md:text-lg md:leading-8">
          Il carattere di una dimora storica, spazi diversi da vivere e la
          libertà di accogliere ogni momento del tuo evento nello stesso luogo.
        </p>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden pb-28 md:block">
        {/* IMMAGINE */}
        <div className="relative h-[520px] w-full overflow-hidden">
          <Image
            src="/images/cortile-agri.jpg"
            alt="Villa San Carlo, dimora storica per eventi"
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* leggero overlay marrone */}
          <div className="absolute inset-0 bg-[#3B2118]/10" />
        </div>

        {/* CARDS SOVRAPPOSTE */}
        <div data-reveal-group className="relative z-10 mx-auto -mt-32 grid max-w-[1440px] grid-cols-2 gap-4 px-8 lg:grid-cols-4 lg:gap-5 lg:px-12">
          {differentiators.map((item) => (
            <article
              key={item.number}
              data-reveal="up"
              className="min-h-[280px] border border-[#CBB8A7] bg-[#FBF8F4] p-7 text-[#3B2118] lg:min-h-[300px]"
            >
              {/* ICONA */}
              <div className="flex h-12 w-12 items-center justify-center bg-[#A58B73] text-[#F8F5F0]">
                {item.icon}
              </div>

              <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7A5F49]">
                {item.number}
              </p>

              <h3 className="mt-3 text-2xl leading-[1.08] tracking-[-0.02em]">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#6D625B]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {/* CTA DESKTOP */}
        <div data-reveal="up" data-delay="3" className="mt-12 flex justify-center">
          <Link
            href="/la-villa"
            className="group inline-flex min-h-14 items-center justify-center gap-5 bg-[#4A281B] px-10 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#5B3325]"
          >
            Scopri Villa San Carlo

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        {/* FOTO */}
        <div className="relative h-[300px] w-full overflow-hidden">
          <Image
            src="/images/value-evento.jpg"
            alt="Villa San Carlo, dimora storica per eventi"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#3B2118]/10" />
        </div>

        {/* SLIDER */}
        <div className="px-5 pb-16">
          <article className="relative -mt-10 min-h-[310px] border border-[#CBB8A7] bg-[#FBF8F4] p-7 text-[#3B2118]">
            <div className="flex h-12 w-12 items-center justify-center bg-[#A58B73] text-[#F8F5F0]">
              {differentiators[active].icon}
            </div>

            <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7A5F49]">
              {differentiators[active].number}
            </p>

            <h3 className="mt-3 text-[26px] leading-[1.08] tracking-[-0.02em]">
              {differentiators[active].title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-[#6D625B]">
              {differentiators[active].text}
            </p>
          </article>

          {/* DOTS */}
          <div
            className="mt-5 flex items-center justify-center gap-1"
            aria-label="Seleziona caratteristica"
          >
            {differentiators.map((item, index) => (
              <button
                key={item.number}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Mostra caratteristica ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 border border-[#A58B73] transition-colors ${
                    active === index
                      ? "bg-[#A58B73]"
                      : "bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* PREV / NEXT */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              aria-label="Caratteristica precedente"
              onClick={() =>
                setActive(
                  (current) =>
                    (current - 1 + differentiators.length) %
                    differentiators.length
                )
              }
              className="flex h-11 w-11 items-center justify-center border border-[#A58B73] text-[#4A281B]"
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Caratteristica successiva"
              onClick={() =>
                setActive(
                  (current) => (current + 1) % differentiators.length
                )
              }
              className="flex h-11 w-11 items-center justify-center bg-[#4A281B] text-white"
            >
              →
            </button>
          </div>

          {/* CTA MOBILE */}
          <div className="mt-8">
            <Link
              href="/la-villa"
              className="flex min-h-14 w-full items-center justify-center gap-4 bg-[#4A281B] px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
            >
              Scopri Villa San Carlo
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}