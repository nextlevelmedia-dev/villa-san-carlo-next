import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import ContactCTA from "@/components/ui/ContactCTA";
import EditorialSection from "@/components/ui/EditorialSection";
import FaqSection from "@/components/ui/FaqSection";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Highlights from "@/components/ui/Highlights";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import SpaceCards from "@/components/ui/SpaceCards";
import { photos } from "@/lib/images";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "Location per feste private e compleanni a Cremona";
const description =
  "Compleanni, anniversari, cene e ricorrenze in una villa storica in provincia di Cremona: sale, portici e giardino riservati per la tua festa privata.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/eventi-privati",
  ogImage: "/og/eventi-privati.jpg",
});

const faqs = [
  {
    question: "Per quali occasioni è possibile riservare la villa?",
    answer:
      "Compleanni, anniversari, cene private, feste di famiglia, ricorrenze e celebrazioni tra amici. Raccontaci l'occasione e valuteremo insieme gli spazi più adatti.",
  },
  {
    question: "La villa è riservata solo al nostro evento?",
    answer:
      "Le modalità di utilizzo degli spazi vengono concordate in fase di richiesta, in base alla data e al tipo di festa. Ti daremo tutte le indicazioni durante il primo contatto.",
  },
  {
    question: "Possiamo scegliere allestimento, musica e fornitori?",
    answer:
      "Ogni festa viene definita insieme: stile dell'allestimento, momenti della serata e servizi necessari. Indicaci le tue idee e ti spiegheremo cosa è possibile organizzare.",
  },
  {
    question: "Fino a che ora può durare la festa?",
    answer:
      "Orari e durata dipendono dal tipo di evento e dagli spazi utilizzati. Specificali nella richiesta e ti risponderemo con le condizioni per la tua data.",
  },
  {
    question: "Gli invitati possono fermarsi a dormire?",
    answer:
      "Sì. La villa dispone di sei camere e di due appartamenti indipendenti: un'ottima soluzione per parenti e amici che arrivano da fuori.",
  },
];

export default function EventiPrivatiPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/eventi-privati", name: title, description })} />

      <PageHero
        crumbs={[{ name: "Eventi privati", path: "/eventi-privati" }]}
        eyebrow="Compleanni · Anniversari · Ricorrenze"
        titleLines={["Le tue persone,", "una villa storica,", "una festa su misura."]}
        intro={
          <p>
            Per un compleanno importante, un anniversario o una cena tra
            amici: Villa San Carlo accoglie feste private in provincia di
            Cremona, tra sale con mattoni a vista, portici e giardino.
          </p>
        }
        photo={photos.salaMattoni}
        actions={
          <>
            <ButtonLink href="/contatti?tipo=evento-privato">
              Raccontaci il tuo evento
            </ButtonLink>
            <ButtonLink href="#spazi" variant="outline">
              Scopri gli spazi
            </ButtonLink>
          </>
        }
      />

      {/* INTRODUZIONE */}
      <EditorialSection
        tone="white"
        eyebrow="Feste che somigliano a chi le organizza"
        title="Non una sala qualsiasi, ma una casa in cui ritrovarsi."
        photo={photos.tavoloDolci}
      >
        <p>
          Le ricorrenze più belle sono quelle in cui ci si sente a casa. In
          villa la festa ha spazio per respirare: un tavolo dei dolci sotto il
          portico, una cena nel verde, un brindisi in una sala che si accende
          di luci calde.
        </p>
        <p>
          Che si tratti di pochi intimi o di una grande festa di famiglia,
          costruiamo insieme la serata partendo dalle tue idee.
        </p>
      </EditorialSection>

      {/* SPAZI */}
      <div id="spazi">
        <SpaceCards
          tone="cream"
          heading={
            <SectionHeading
              align="center"
              eyebrow="Gli spazi per la tua festa"
              title="Al chiuso, sotto i portici o all'aperto."
              intro={
                <p>
                  Ogni stagione e ogni occasione trovano l&apos;ambiente
                  giusto all&apos;interno della villa.
                </p>
              }
            />
          }
          items={[
            {
              eyebrow: "Interno",
              title: "La sala in mattoni",
              text: "Pareti in mattoni a vista e luci calde: un ambiente accogliente per cene, buffet e feste serali.",
              photo: photos.salaMattoni,
            },
            {
              eyebrow: "Portici",
              title: "Sotto gli archi",
              text: "Lunghe tavolate al riparo, ma con lo sguardo sulla corte: ideali per pranzi e cene in compagnia.",
              photo: photos.porticoArchi,
            },
            {
              eyebrow: "Giardino",
              title: "Tra le luci della sera",
              text: "Tavoli nel verde, lanterne e un'atmosfera rilassata per le feste estive e i brindisi all'aperto.",
              photo: photos.giardinoSera,
            },
          ]}
        />
      </div>

      {/* PERSONALIZZAZIONE */}
      <Highlights
        tone="white"
        heading={
          <SectionHeading
            eyebrow="Atmosfere e personalizzazione"
            title="Ogni festa ha il suo tono."
            intro={
              <p>
                Dall&apos;aperitivo informale alla cena elegante: definiamo
                insieme lo stile della tua occasione.
              </p>
            }
          />
        }
        items={[
          {
            title: "Compleanni importanti",
            text: "Diciotto, cinquanta, novanta: le cifre tonde meritano un luogo all'altezza e un racconto da condividere.",
          },
          {
            title: "Anniversari e ricorrenze",
            text: "Festeggiare un traguardo di coppia o di famiglia in un ambiente intimo, elegante e raccolto.",
          },
          {
            title: "Cene e feste tra amici",
            text: "Una tavolata sotto i portici o una serata in giardino, con il tempo di stare insieme senza fretta.",
          },
        ]}
      />

      {/* GALLERIA */}
      <GalleryGrid
        heading={
          <SectionHeading
            align="center"
            eyebrow="Galleria"
            title="Atmosfere di feste e ricorrenze in villa."
          />
        }
        photos={[
          photos.tavoloDolci,
          photos.salaMattoni,
          photos.giardinoSera,
          photos.porticoTavolata,
          photos.ricevimentoGiardino,
        ]}
      />

      <FaqSection title="Domande frequenti sulle feste private." items={faqs} />

      <ContactCTA
        eyebrow="La tua festa inizia da qui"
        title="Raccontaci il tuo evento."
        text="L'occasione, il numero indicativo di invitati, il periodo che hai in mente: partiamo da qui per capire come accoglierti al meglio."
        benefits={[
          "Disponibilità per la data desiderata",
          "Proposta degli spazi più adatti",
          "Visita della villa su appuntamento",
        ]}
        primary={{ label: "Raccontaci il tuo evento", href: "/contatti?tipo=evento-privato" }}
        photo={photos.ricevimentoGiardino}
        whatsappMessage="Buongiorno, vorrei informazioni su Villa San Carlo per una festa privata."
      />
    </>
  );
}
