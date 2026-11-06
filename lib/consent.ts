/**
 * Consenso cookie — salvato nel browser (localStorage), nessun server.
 * `necessary`: solo strumenti tecnici; `all`: anche contenuti di terze
 * parti (es. Google Maps caricata automaticamente).
 */
export type ConsentChoice = "necessary" | "all";

const KEY = "vsc-consent";
/** Versione dell'informativa: se cambia, il banner viene riproposto */
const VERSION = 1;
export const CONSENT_EVENT = "vsc-consent-change";
export const OPEN_EVENT = "vsc-consent-open";

export function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { v?: number; choice?: ConsentChoice };
    if (data.v !== VERSION) return null;
    return data.choice === "all" || data.choice === "necessary" ? data.choice : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: VERSION, choice, at: new Date().toISOString() }));
  } catch {
    /* storage non disponibile: la scelta vale per la sola pagina */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
