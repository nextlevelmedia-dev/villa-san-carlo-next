import type { Photo } from "@/lib/images";

/**
 * CONFIGURAZIONE UNITÀ DI SOGGIORNO
 *
 * 2 appartamenti indipendenti + 6 camere nella villa principale
 * (di cui 1 accessibile a persone con disabilità).
 *
 * Ogni campo opzionale (`null` o array vuoto) NON viene mostrato al
 * visitatore né inserito nei dati strutturati. Compilare solo con
 * informazioni verificate: nomi, descrizioni, posti letto, metratura,
 * servizi e fotografie.
 */

export type StayUnit = {
  /** Identificativo stabile, usato anche come ancora (#id) */
  id: string;
  kind: "apartment" | "room";
  name: string;
  /** Descrizione specifica dell'unità (se assente si usa solo il nome) */
  description: string | null;
  /** Numero di ospiti massimo — TODO */
  maxGuests: number | null;
  /** Superficie in m² — TODO */
  size: number | null;
  /** Configurazione letti, es. "1 letto matrimoniale" — TODO */
  beds: string | null;
  /** Servizi e dotazioni verificati, es. ["Bagno privato", "Cucina"] — TODO */
  amenities: string[];
  /** Camera accessibile a persone con disabilità */
  accessible: boolean;
  /** Fotografie dell'unità. Se vuoto viene mostrato un segnaposto. */
  photos: Photo[];
};

const emptyDetails = {
  description: null,
  maxGuests: null,
  size: null,
  beds: null,
  amenities: [],
  photos: [],
} satisfies Partial<StayUnit>;

export const apartments: StayUnit[] = [
  {
    id: "appartamento-1",
    kind: "apartment",
    name: "Appartamento 1",
    accessible: false,
    ...emptyDetails,
  },
  {
    id: "appartamento-2",
    kind: "apartment",
    name: "Appartamento 2",
    accessible: false,
    ...emptyDetails,
  },
];

export const rooms: StayUnit[] = [
  { id: "camera-1", kind: "room", name: "Camera 1", accessible: false, ...emptyDetails },
  { id: "camera-2", kind: "room", name: "Camera 2", accessible: false, ...emptyDetails },
  { id: "camera-3", kind: "room", name: "Camera 3", accessible: false, ...emptyDetails },
  { id: "camera-4", kind: "room", name: "Camera 4", accessible: false, ...emptyDetails },
  { id: "camera-5", kind: "room", name: "Camera 5", accessible: false, ...emptyDetails },
  {
    id: "camera-accessibile",
    kind: "room",
    name: "Camera accessibile",
    accessible: true,
    ...emptyDetails,
  },
];

/**
 * Informazioni pratiche sul soggiorno (orari check-in/out, animali,
 * colazione, parcheggio…). Vengono mostrate solo le voci compilate.
 * TODO: compilare con le condizioni reali.
 */
export const stayInfo: { label: string; value: string }[] = [];
