/**
 * CATALOGO FOTOGRAFICO
 *
 * Ogni fotografia è descritta una sola volta (percorso, dimensioni, alt).
 * Le pagine richiamano le immagini per chiave, così sostituirle o
 * aggiungerne di nuove richiede una sola modifica.
 *
 * Gli alt descrivono solo ciò che è visibile nella fotografia.
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const photos = {
  facciata: {
    src: "/images/about-villa.jpg",
    width: 1800,
    height: 2400,
    alt: "Facciata di Villa San Carlo immersa nel verde",
  },
  salaAffrescata: {
    src: "/images/buchirale.jpg",
    width: 1448,
    height: 1086,
    alt: "Sala storica con soffitto a volta decorato e tavolate imperiali apparecchiate",
  },
  porticoTavolata: {
    src: "/images/portico.jpg",
    width: 1086,
    height: 1448,
    alt: "Tavolata apparecchiata sotto il portico con archi in mattoni e tende chiare",
  },
  porticoArchi: {
    src: "/images/final-cta.jpg",
    width: 1800,
    height: 2400,
    alt: "Lunghe tavolate sotto il portico in mattoni, con vista sulla corte",
  },
  salaMattoni: {
    src: "/images/eventi-privati.jpg",
    width: 1448,
    height: 1086,
    alt: "Sala con pareti in mattoni a vista illuminata per una festa privata",
  },
  corte: {
    src: "/images/evento01.jpg",
    width: 1800,
    height: 2400,
    alt: "La corte di Villa San Carlo con il prato e la facciata della dimora",
  },
  tavoloDolci: {
    src: "/images/festa.jpg",
    width: 1800,
    height: 2400,
    alt: "Tavolo rotondo allestito con dolci e fiori sotto il portico",
  },
  giardinoSera: {
    src: "/images/giardino.jpg",
    width: 1448,
    height: 1086,
    alt: "Giardino della villa allestito per una cena serale, con lanterne e tavoli apparecchiati",
  },
  salaMeeting: {
    src: "/images/location-eventi.jpg",
    width: 1448,
    height: 1086,
    alt: "Sala con travi in legno allestita a ferro di cavallo per un meeting, con schermo per proiezioni",
  },
  ricevimentoGiardino: {
    src: "/images/location-villa-san-carlo.jpg",
    width: 1448,
    height: 1086,
    alt: "Ricevimento nel giardino della villa con tavoli rotondi apparecchiati davanti al portico",
  },
  corteConvegno: {
    src: "/images/ospitalita.jpg",
    width: 1086,
    height: 1448,
    alt: "La corte allestita per un evento con sedute, schermo e tavoli d'appoggio",
  },
  camera: {
    src: "/images/soggiorno.jpg",
    width: 1800,
    height: 2400,
    alt: "Camera della villa con soffitto a travi in legno, arredi d'epoca e finestra luminosa",
  },
  appartamento: {
    src: "/images/appartamento-soggiorno.webp",
    width: 1536,
    height: 1024,
    alt: "Appartamento con travi in legno a vista, zona living con divano, cucina e tavolo da pranzo",
  },
  porticoMeeting: {
    src: "/images/value-event.jpg",
    width: 1089,
    height: 1445,
    alt: "Tavolo da riunione allestito sotto il portico in mattoni, con schermo per proiezioni",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
