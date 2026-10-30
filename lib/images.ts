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
    src: "/images/appartamento-1.webp",
    width: 1536,
    height: 1024,
    alt: "Appartamento 1: travi in legno a vista, zona living con divano, cucina e tavolo da pranzo",
  },
  appartamento1Camera: {
    src: "/images/appartamento-1-camera.webp",
    width: 1086,
    height: 1448,
    alt: "Appartamento 1: camera da letto con letto matrimoniale, soffitto con travi in legno e pavimento in cotto",
  },
  appartamento1Bagno: {
    src: "/images/appartamento-1-bagno.webp",
    width: 1086,
    height: 1448,
    alt: "Appartamento 1: bagno con doccia in vetro, lavabo e soffitto con travi in legno",
  },
  appartamento2: {
    src: "/images/appartamento-2.webp",
    width: 1086,
    height: 1448,
    alt: "Appartamento 2: cucina con pensili chiari, tavolo da pranzo rotondo e soffitto con travi in legno",
  },
  appartamento2Camera: {
    src: "/images/appartamento-2-camera.webp",
    width: 1086,
    height: 1448,
    alt: "Appartamento 2: camera da letto con letto matrimoniale, parete color acqua e soffitto con travi in legno",
  },
  appartamento2Bagno: {
    src: "/images/appartamento-2-bagno.webp",
    width: 1086,
    height: 1448,
    alt: "Appartamento 2: bagno con finestra, lavabo su mobile in legno e soffitto con travi a vista",
  },
  corteGiardino: {
    src: "/images/corte-giardino.webp",
    width: 1448,
    height: 1086,
    alt: "La corte della villa con prato, portico ad archi e salotto all'aperto all'ombra di un ombrellone",
  },
  camera1: {
    src: "/images/camera-1-v2.webp",
    width: 1086,
    height: 1448,
    alt: "Camera 1: letto matrimoniale in ferro battuto, lampadario d'epoca e soffitto con travi in legno",
  },
  camera2: {
    src: "/images/camera-2.webp",
    width: 1086,
    height: 1448,
    alt: "Camera 2: letto matrimoniale con testiera in legno intarsiato, specchiera d'epoca e pavimento in cotto",
  },
  camera3: {
    src: "/images/camera-3-v2.webp",
    width: 1086,
    height: 1448,
    alt: "Camera 3: letto matrimoniale in ferro battuto bianco, armadio d'epoca e soffitto con travi in legno",
  },
  camera4: {
    src: "/images/camera-4.webp",
    width: 1086,
    height: 1448,
    alt: "Camera 4: letto matrimoniale in legno intagliato, armadio d'epoca con specchio e poltroncine imbottite",
  },
  camera5: {
    src: "/images/camera-5.webp",
    width: 1086,
    height: 1448,
    alt: "Camera 5: letto matrimoniale in ferro battuto, scrittoio d'epoca, soffitto con travi in legno e finestra aperta sul verde",
  },
  saloneSera: {
    src: "/images/salone-sera.webp",
    width: 1448,
    height: 1086,
    alt: "Salone della villa la sera, con lampadari accesi, mobili d'epoca, divano e soffitto con travi in legno",
  },
  porticoMeeting: {
    src: "/images/value-event.jpg",
    width: 1089,
    height: 1445,
    alt: "Tavolo da riunione allestito sotto il portico in mattoni, con schermo per proiezioni",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
