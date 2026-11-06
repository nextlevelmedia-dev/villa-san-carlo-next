"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OPEN_EVENT, readConsent, saveConsent, type ConsentChoice } from "@/lib/consent";

/**
 * Banner privacy/cookie. Compare alla prima visita finché non si sceglie;
 * si riapre dal link «Preferenze cookie» nel footer.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!readConsent()) setOpen(true);
    }, 900);
    const reopen = () => {
      setLeaving(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  function choose(choice: ConsentChoice) {
    saveConsent(choice);
    setLeaving(true);
    window.setTimeout(() => setOpen(false), 450);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className={`cookie-banner fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[440px] ${leaving ? "is-leaving" : ""}`}
    >
      <div className="border border-[#D8CABB] bg-[#FBF8F4]/95 p-6 shadow-[0_24px_60px_-28px_rgba(59,33,24,0.45)] backdrop-blur-md sm:p-7">
        <p
          id="cookie-title"
          className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]"
        >
          Privacy & cookie
        </p>

        <p id="cookie-text" className="mt-4 text-sm leading-6 text-[#5F554F]">
          Utilizziamo solo strumenti tecnici necessari al funzionamento del
          sito. Con il tuo consenso possiamo caricare anche contenuti di terze
          parti, come la mappa di Google Maps, che potrebbero impostare
          cookie propri. Leggi la{" "}
          <Link href="/cookie-policy" className="text-[#4A281B] underline decoration-[#C8AD92] underline-offset-4">
            Cookie Policy
          </Link>{" "}
          e la{" "}
          <Link href="/privacy-policy" className="text-[#4A281B] underline decoration-[#C8AD92] underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="inline-flex min-h-12 items-center justify-center border border-[#4A281B] px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-[#4A281B] transition-colors duration-300 hover:bg-[#4A281B]/5"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="inline-flex min-h-12 items-center justify-center bg-[#4A281B] px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#5B3325]"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
}
