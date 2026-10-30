/**
 * CONFIGURAZIONE CENTRALE — DATI AZIENDALI
 *
 * Tutti i dati di contatto e aziendali del sito passano da qui.
 * Un valore `null` significa "dato non ancora verificato": il componente
 * corrispondente semplicemente non viene mostrato (nessun dato fittizio).
 *
 * Prima della pubblicazione compilare i campi segnati con TODO.
 */

export const site = {
  name: "Villa San Carlo",
  tagline: "Casa Storica",
  description:
    "Dimora storica nel territorio cremonese per cerimonie, ricevimenti, eventi privati, meeting aziendali e soggiorni in camere e appartamenti.",
  locale: "it_IT",

  /**
   * URL pubblico del sito, senza slash finale (es. https://www.dominio.it).
   * TODO: impostare NEXT_PUBLIC_SITE_URL nell'ambiente di produzione.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),

  contact: {
    /** TODO: email pubblica verificata, es. "info@dominio.it" */
    email: null as string | null,
    /** TODO: telefono in formato internazionale, es. "+39 0372 000000" */
    phone: null as string | null,
    /** TODO: numero WhatsApp solo cifre con prefisso, es. "393330000000" */
    whatsapp: null as string | null,
  },

  address: {
    /** TODO: via e numero civico */
    streetAddress: null as string | null,
    /** TODO: CAP */
    postalCode: null as string | null,
    /** TODO: comune effettivo in cui si trova la villa */
    locality: null as string | null,
    province: "Cremona",
    provinceCode: "CR",
    region: "Lombardia",
    country: "IT",
  },

  /**
   * TODO: coordinate verificate (es. da Google Maps). Se assenti, la mappa
   * non viene mostrata e i dati strutturati non includono `geo`.
   */
  geo: null as { latitude: number; longitude: number } | null,

  /**
   * TODO: distanza e tempo di percorrenza verificati da Cremona centro,
   * es. "circa 15 minuti in auto dal centro di Cremona".
   */
  accessFromCremona: null as string | null,

  social: {
    /** TODO: URL profili ufficiali */
    instagram: null as string | null,
    facebook: null as string | null,
  },

  legal: {
    /** TODO: ragione sociale del titolare del sito / del trattamento dati */
    companyName: null as string | null,
    /** TODO: Partita IVA */
    vatNumber: null as string | null,
    /** TODO: sede legale */
    registeredOffice: null as string | null,
    /** TODO: CIN (Codice Identificativo Nazionale) della struttura ricettiva */
    cin: null as string | null,
  },
};

export function formatAddress() {
  const { streetAddress, postalCode, locality, provinceCode } = site.address;
  const cityLine = [postalCode, locality].filter(Boolean).join(" ");

  return {
    street: streetAddress,
    city: locality ? `${cityLine} (${provinceCode})` : null,
    full:
      streetAddress && locality
        ? `${streetAddress}, ${cityLine} (${provinceCode})`
        : null,
  };
}

export function whatsappUrl(message?: string) {
  if (!site.contact.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${text}`;
}

export function phoneHref() {
  return site.contact.phone
    ? `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`
    : null;
}

export function mapsUrl() {
  const { full } = formatAddress();
  if (site.geo) {
    return `https://www.google.com/maps/search/?api=1&query=${site.geo.latitude},${site.geo.longitude}`;
  }
  return full
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${full}`)}`
    : null;
}

/** Navigazione principale — unica fonte per header, menu mobile e footer */
export const navigation = {
  main: [
    { href: "/la-villa", label: "La Villa" },
    { href: "/cerimonie", label: "Cerimonie" },
    { href: "/eventi-meeting", label: "Eventi & Meeting" },
    { href: "/eventi-privati", label: "Eventi privati" },
    { href: "/soggiorni", label: "Soggiorni" },
    { href: "/gallery", label: "Gallery" },
  ],
  experiences: [
    { href: "/cerimonie", label: "Cerimonie & Ricevimenti" },
    { href: "/eventi-meeting", label: "Eventi & Meeting" },
    { href: "/eventi-privati", label: "Eventi privati" },
  ],
  stays: [
    { href: "/soggiorni", label: "Soggiorni" },
    { href: "/soggiorni/camere", label: "Camere" },
    { href: "/soggiorni/appartamenti", label: "Appartamenti" },
  ],
  explore: [
    { href: "/", label: "Home" },
    { href: "/la-villa", label: "La Villa" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contatti", label: "Contatti" },
  ],
};
