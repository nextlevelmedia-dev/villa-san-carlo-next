import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import ContactCTA from "@/components/ui/ContactCTA";
import EditorialSection from "@/components/ui/EditorialSection";
import FaqSection from "@/components/ui/FaqSection";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Highlights from "@/components/ui/Highlights";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import PhotoBand from "@/components/ui/PhotoBand";
import SectionHeading from "@/components/ui/SectionHeading";
import SpaceCards from "@/components/ui/SpaceCards";
import { photos } from "@/lib/images";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Location per matrimoni e ricevimenti a Cremona";
const description =
  "Dimora storica in provincia di Cremona per matrimoni, ricevimenti e cerimonie private: sale d'epoca, portici, corte e giardino. Richiedi una visita.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/cerimonie",
  ogImage: "/og/cerimonie.jpg",
});

const faqs = [
  {
    question: "È possibile vivere cerimonia e ricevimento nello stesso luogo?",
    answer:
      "Villa San Carlo offre ambienti diversi — sale interne, portici, corte e giardino — che permettono di vivere i vari momenti della giornata senza spostamenti. In base al tipo di cerimonia che desideri, durante il primo contatto verificheremo insieme come organizzarla al meglio.",
  },
  {
    question: "Si può celebrare un matrimonio civile con valore legale in villa?",
    answer:
      "La celebrazione di un rito civile con valore legale al di fuori della sede comunale dipende dalle autorizzazioni del Comune competente. Contattaci: ti daremo informazioni aggiornate e, in alternativa, potrai valutare un rito simbolico nella villa.",
  },
  {
    question: "Come funzionano catering, allestimenti e fornitori?",
    answer:
      "Catering, allestimenti floreali, musica e gli altri servizi vengono definiti in base al tipo di evento. Durante il primo incontro ti spiegheremo come lavoriamo e quali soluzioni sono possibili per la tua giornata.",
  },
  {
    question: "Cosa succede in caso di maltempo?",
    answer:
      "La villa dispone di sale interne e di portici coperti: è quindi possibile prevedere fin dall'inizio un'alternativa al riparo per i momenti pensati all'aperto.",
  },
  {
    question: "Quanti ospiti può accogliere la villa?",
    answer:
      "Dipende dagli ambienti scelti e dal tipo di allestimento. Indicaci il numero indicativo di invitati nel modulo di contatto e ti consiglieremo la configurazione più adatta.",
  },
  {
    question: "Gli sposi e gli ospiti possono dormire in villa?",
    answer:
      "Sì. Villa San Carlo dispone di cinque camere nella villa principale, di una camera accessibile e di due appartamenti indipendenti, ideali per gli sposi, la famiglia o gli ospiti che arrivano da lontano.",
  },
  {
    question: "Posso visitare la villa prima di decidere?",
    answer:
      "Certo. Le visite si organizzano su appuntamento: è il modo migliore per percorrere gli spazi e immaginare insieme la tua giornata.",
  },
];

export default function CerimoniePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/cerimonie", name: title, description })} />

      <PageHero
        crumbs={[{ name: "Cerimonie & Ricevimenti", path: "/cerimonie" }]}
        eyebrow="Matrimoni · Ricevimenti · Cerimonie private"
        titleLines={["Il giorno che", "ricorderete, nella", "cornice di una villa."]}
        intro={
          <p>
            Una dimora storica in provincia di Cremona per matrimoni,
            ricevimenti e anniversari: sale d&apos;epoca, portici in mattoni,
            una corte verde e un giardino che si accende la sera.
          </p>
        }
        photo={photos.ricevimentoGiardino}
        actions={
          <>
            <ButtonLink href="/contatti?tipo=cerimonia">Richiedi informazioni</ButtonLink>
            <ButtonLink href="/contatti?tipo=visita" variant="outline">
              Organizza una visita
            </ButtonLink>
          </>
        }
      />

      {/* INTRODUZIONE */}
      <EditorialSection
        tone="white"
        eyebrow="Perché una dimora storica"
        title="Un luogo che ha già una storia rende la vostra ancora più personale."
        photo={photos.porticoArchi}
      >
        <p>
          In una villa storica l&apos;atmosfera non va creata da zero: è già
          nei mattoni dei portici, nelle volte delle sale, nella luce che
          attraversa la corte. Gli allestimenti diventano un dialogo con
          l&apos;architettura, non una scenografia da costruire.
        </p>
        <p>
          È la differenza tra organizzare un evento in uno spazio e
          celebrarlo in una casa, con il calore e l&apos;intimità che solo un
          luogo vissuto sa trasmettere.
        </p>
      </EditorialSection>

      {/* AMBIENTI */}
      <SpaceCards
        tone="cream"
        columns={4}
        heading={
          <SectionHeading
            align="center"
            eyebrow="Gli ambienti per la vostra giornata"
            title="Quattro scenari, un'unica dimora."
            intro={
              <p>
                Interni ed esterni si alternano con naturalezza: ogni momento
                della festa può trovare il proprio spazio.
              </p>
            }
          />
        }
        items={[
          {
            eyebrow: "Sale interne",
            title: "La sala storica",
            text: "Volte decorate e lampadari per una cena elegante e raccolta, o come riparo sicuro nelle giornate incerte.",
            photo: photos.salaAffrescata,
          },
          {
            eyebrow: "Portici",
            title: "Sotto gli archi",
            text: "Tavolate imperiali tra archi in mattoni e travi in legno, con tende leggere e vista sulla corte.",
            photo: photos.porticoTavolata,
          },
          {
            eyebrow: "Corte",
            title: "Il prato della villa",
            text: "Uno spazio aperto e luminoso, ideale per l'accoglienza degli ospiti, l'aperitivo e le fotografie.",
            photo: photos.corte,
          },
          {
            eyebrow: "Giardino",
            title: "La sera tra le luci",
            text: "Tavoli tra gli alberi, lanterne e luci sospese: l'atmosfera perfetta per la cena e la festa.",
            photo: photos.giardinoSera,
          },
        ]}
      />

      {/* MOMENTI */}
      <Highlights
        tone="white"
        heading={
          <SectionHeading
            eyebrow="I momenti della giornata"
            title="Ogni fase della festa nel suo ambiente."
            intro={
              <p>
                Spostarsi da uno spazio all&apos;altro, senza mai lasciare la
                villa, dà ritmo alla giornata e regala agli ospiti scorci
                sempre nuovi.
              </p>
            }
          />
        }
        items={[
          {
            title: "L'arrivo degli ospiti",
            text: "Il benvenuto in corte o in giardino, all'aria aperta, mentre gli invitati si ritrovano.",
          },
          {
            title: "Il momento della cerimonia",
            text: "Un angolo della villa scelto insieme, per un rito simbolico o per accogliervi dopo la celebrazione.",
          },
          {
            title: "L'aperitivo e la cena",
            text: "Sotto i portici, nella sala storica o tra i tavoli del giardino, a seconda della stagione e dello stile.",
          },
          {
            title: "La festa e il dopo",
            text: "La serata continua tra le luci del giardino e, per chi lo desidera, prosegue con una notte in villa.",
          },
        ]}
      />

      {/* ESPERIENZA OSPITI */}
      <PhotoBand
        photo={photos.tavoloDolci}
        eyebrow="L'esperienza degli ospiti"
        title="Un ricevimento che si vive con calma."
        action={
          <ButtonLink href="/soggiorni" variant="light">
            Camere e appartamenti
          </ButtonLink>
        }
      >
        <p>
          Spazi ampi, percorsi semplici e la possibilità di soggiornare in
          villa: gli invitati possono godersi la festa senza pensare al
          rientro, e gli sposi ritrovarsi il giorno dopo in un luogo che
          sentono già un po&apos; loro.
        </p>
      </PhotoBand>

      {/* GALLERIA */}
      <GalleryGrid
        heading={
          <SectionHeading
            align="center"
            eyebrow="Galleria cerimonie"
            title="Allestimenti e atmosfere dei ricevimenti in villa."
          />
        }
        photos={[
          photos.giardinoSera,
          photos.porticoArchi,
          photos.tavoloDolci,
          photos.salaAffrescata,
          photos.ricevimentoGiardino,
        ]}
      />

      <FaqSection
        title="Domande frequenti su matrimoni e ricevimenti."
        intro={
          <p>
            Le risposte alle domande più comuni di chi sta scegliendo la
            location per il proprio matrimonio.
          </p>
        }
        items={faqs}
      />

      <ContactCTA
        eyebrow="La vostra giornata inizia da qui"
        title="Raccontateci il ricevimento che immaginate."
        text="Data indicativa, numero di ospiti, atmosfera desiderata: bastano poche informazioni per iniziare a progettare insieme la vostra giornata a Villa San Carlo."
        benefits={[
          "Verifica della disponibilità per la vostra data",
          "Informazioni sugli spazi e sulle possibilità",
          "Visita della villa su appuntamento",
        ]}
        primary={{ label: "Richiedi informazioni", href: "/contatti?tipo=cerimonia" }}
        secondary={{ label: "Organizza una visita", href: "/contatti?tipo=visita" }}
        photo={photos.corte}
        whatsappMessage="Buongiorno, vorrei informazioni su Villa San Carlo per un matrimonio/ricevimento."
      />
    </>
  );
}
