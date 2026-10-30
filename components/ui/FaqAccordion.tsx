"use client";

import { useId, useState } from "react";

export type FaqItem = { question: string; answer: string };

/** Accordion FAQ (stesso design della home) */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-[#D8CABB]">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;

        return (
          <div key={faq.question} className="border-b border-[#D8CABB]">
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
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
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-500 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "invisible grid-rows-[0fr] opacity-0"
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
  );
}
