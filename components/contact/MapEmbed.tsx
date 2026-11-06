"use client";

import { useState, useSyncExternalStore } from "react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

/**
 * Mappa caricata solo con il consenso dell'utente (banner «Accetta tutti»)
 * o su sua richiesta esplicita: prima nessuno script o cookie di terze parti.
 */
function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

export default function MapEmbed({ query, label }: { query: string; label: string }) {
  const [requested, setRequested] = useState(false);
  // Con il consenso «Accetta tutti» la mappa si carica direttamente
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const visible = requested || consent === "all";

  if (visible) {
    return (
      <iframe
        title={`Mappa: ${label}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[#EFE7DD] px-6 text-center">
      <p className="max-w-sm text-sm leading-6 text-[#6D625B]">
        La mappa è fornita da Google Maps. Caricandola, Google potrebbe
        raccogliere dati di navigazione.
      </p>
      <button
        type="button"
        onClick={() => setRequested(true)}
        className="inline-flex min-h-12 items-center justify-center border border-[#4A281B] px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-[#4A281B] transition-colors hover:bg-[#4A281B] hover:text-white"
      >
        Mostra la mappa
      </button>
    </div>
  );
}
