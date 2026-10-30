import { photos, type Photo } from "@/lib/images";

/**
 * CONFIGURAZIONE UNITÀ DI SOGGIORNO
 *
 * 2 appartamenti indipendenti + 6 camere: 5 nella villa principale
 * e 1 camera accessibile a persone con disabilità.
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
    description:
      "Un ampio open space sotto le travi in legno a vista con zona living, cucina e tavolo da pranzo, una camera da letto e un bagno con doccia.",
    photos: [photos.appartamento, photos.appartamento1Camera, photos.appartamento1Bagno],
  },
  {
    id: "appartamento-2",
    kind: "apartment",
    name: "Appartamento 2",
    accessible: false,
    ...emptyDetails,
    description:
      "Cucina con zona pranzo, una camera da letto raccolta e un bagno luminoso, tra pavimenti in cotto e soffitti con travi in legno.",
    photos: [photos.appartamento2, photos.appartamento2Camera, photos.appartamento2Bagno],
  },
];

export const rooms: StayUnit[] = [
  {
    id: "camera-1",
    kind: "room",
    name: "Camera 1",
    accessible: false,
    ...emptyDetails,
    photos: [photos.camera1],
  },
  {
    id: "camera-2",
    kind: "room",
    name: "Camera 2",
    accessible: false,
    ...emptyDetails,
    photos: [photos.camera2],
  },
  {
    id: "camera-3",
    kind: "room",
    name: "Camera 3",
    accessible: false,
    ...emptyDetails,
    photos: [photos.camera3],
  },
  {
    id: "camera-4",
    kind: "room",
    name: "Camera 4",
    accessible: false,
    ...emptyDetails,
    photos: [photos.camera4],
  },
  {
    id: "camera-5",
    kind: "room",
    name: "Camera 5",
    accessible: false,
    ...emptyDetails,
    photos: [photos.camera5],
  },
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

/** Pagina dedicata dell'unità (solo gli appartamenti hanno una pagina propria) */
export function unitHref(unit: StayUnit) {
  return unit.kind === "apartment"
    ? `/soggiorni/appartamenti/${unit.id}`
    : `/soggiorni/camere#${unit.id}`;
}

/**
 * Foto degli appartamenti per lo slider della pagina Appartamenti, in un
 * ordine che alterna unità e ambienti (living, camera, bagno, cucina…).
 * Le foto aggiunte in seguito alle unità vengono accodate automaticamente.
 */
const sliderOrder: Photo[] = [
  photos.appartamento,
  photos.appartamento2Camera,
  photos.appartamento1Bagno,
  photos.appartamento2,
  photos.appartamento1Camera,
  photos.appartamento2Bagno,
];

export function apartmentSlides() {
  const all = apartments.flatMap((unit) =>
    unit.photos.map((photo) => ({ photo, label: unit.name })),
  );
  const rank = (src: string) => {
    const index = sliderOrder.findIndex((photo) => photo.src === src);
    return index === -1 ? sliderOrder.length : index;
  };

  return [...all].sort((a, b) => rank(a.photo.src) - rank(b.photo.src));
}
