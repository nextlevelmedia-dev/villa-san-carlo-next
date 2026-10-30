"use server";

import { headers } from "next/headers";
import {
  readContactForm,
  requestTypes,
  validateContact,
  type ContactState,
} from "@/lib/contact";
import { site } from "@/lib/site";

/** Tempo minimo di compilazione: sotto questa soglia è quasi certamente un bot */
const MIN_FILL_MS = 3000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

// Limite di invio per IP (best-effort: in memoria, per istanza server)
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatDate = (value: string) =>
  value ? value.split("-").reverse().join("/") : "";

function fallbackContacts() {
  const { email, phone } = site.contact;
  const direct = [email && `email a ${email}`, phone && `telefono al ${phone}`]
    .filter(Boolean)
    .join(" o ");
  return direct ? ` Puoi contattarci direttamente via ${direct}.` : "";
}

export async function sendContactRequest(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = readContactForm(formData);
  const { privacy: _privacy, ...safeValues } = values;
  void _privacy;

  // ANTISPAM 1 — honeypot: campo invisibile che solo i bot compilano
  const honeypot = formData.get("website");
  // ANTISPAM 2 — tempo di compilazione
  const startedAt = Number(formData.get("startedAt"));
  const tooFast =
    Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;

  if ((typeof honeypot === "string" && honeypot.length > 0) || tooFast) {
    // Risposta neutra per non dare indicazioni ai bot; nessun invio.
    return {
      status: "error",
      message:
        "Non è stato possibile inviare la richiesta. Attendi qualche secondo e riprova.",
      errors: {},
      values: safeValues,
    };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Controlla i campi evidenziati e riprova.",
      errors,
      values: safeValues,
    };
  }

  // ANTISPAM 3 — limite di richieste per IP
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message:
        "Hai inviato diverse richieste in poco tempo. Riprova tra qualche minuto." +
        fallbackContacts(),
      errors: {},
      values: safeValues,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "[contatti] Invio non configurato: impostare RESEND_API_KEY, CONTACT_TO_EMAIL e CONTACT_FROM_EMAIL.",
    );
    return {
      status: "error",
      message:
        "Il servizio di invio non è al momento disponibile e la tua richiesta non è stata inviata." +
        fallbackContacts(),
      errors: {},
      values: safeValues,
    };
  }

  const typeLabel =
    requestTypes.find((type) => type.value === values.tipo)?.label ?? values.tipo;

  const rows: [string, string][] = [
    ["Tipo di richiesta", typeLabel],
    ["Nome", values.nome.trim()],
    ["Email", values.email.trim()],
    ["Telefono", values.telefono.trim()],
    [values.dataFine ? "Arrivo" : "Data indicativa", formatDate(values.data)],
    ["Partenza", formatDate(values.dataFine)],
    ["Numero di ospiti", values.ospiti],
    ["Unità richiesta", values.unita],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Messaggio:",
    values.messaggio.trim(),
  ].join("\n");

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#3B2118">Nuova richiesta dal sito ${escapeHtml(site.name)}</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#3B2118;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#8A7C72">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#3B2118;white-space:pre-wrap;margin-top:16px">${escapeHtml(values.messaggio.trim())}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        reply_to: values.email.trim(),
        subject: `Richiesta dal sito — ${typeLabel} — ${values.nome.trim()}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(
        "[contatti] Errore del provider email:",
        response.status,
        await response.text(),
      );
      throw new Error("Invio non riuscito");
    }
  } catch (error) {
    console.error("[contatti] Invio fallito:", error);
    return {
      status: "error",
      message:
        "Si è verificato un problema durante l'invio e la richiesta non è stata recapitata. Riprova tra poco." +
        fallbackContacts(),
      errors: {},
      values: safeValues,
    };
  }

  return {
    status: "success",
    message:
      "Grazie! La tua richiesta è stata inviata correttamente. Ti risponderemo il prima possibile all'indirizzo email indicato.",
    errors: {},
    values: {},
  };
}
