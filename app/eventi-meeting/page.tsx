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

const title = "Location per meeting ed eventi aziendali a Cremona";
const description =
  "Sale e spazi per meeting, riunioni, workshop ed eventi aziendali in una dimora storica in provincia di Cremona, con possibilità di pernottamento in villa.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/eventi-meeting",
  ogImage: "/og/eventi-meeting.jpg",
});

const faqs = [
  {
    question: "Che tipo di eventi aziendali si possono organizzare?",
    answer:
      "Riunioni, meeting di team, presentazioni, workshop, giornate di formazione ed eventi con clienti o partner. Gli ambienti vengono configurati in base al formato e al numero di partecipanti.",
  },
  {
    question: "Quante persone possono partecipare?",
    answer:
      "La capienza dipende dalla sala o dallo spazio esterno scelto e dalla disposizione dei posti (tavolo unico, ferro di cavallo, platea). Indicaci il numero di partecipanti previsto e ti proporremo la soluzione più adatta.",
  },
  {
    question: "Quali dotazioni tecniche sono disponibili?",
    answer:
      "Le dotazioni disponibili e le eventuali integrazioni (proiezione, audio, connettività) vengono verificate in fase di richiesta in base alle esigenze del vostro evento. Specificale nel modulo di contatto.",
  },
  {
    question: "È possibile organizzare pause caffè, pranzi o cene?",
    answer:
      "I momenti di ristorazione vengono definiti caso per caso insieme all'organizzatore. Descrivi il programma della giornata e ti indicheremo le soluzioni possibili.",
  },
  {
    question: "I partecipanti possono pernottare in villa?",
    answer:
      "Sì. Villa San Carlo dispone di sei camere nella villa principale e di due appartamenti indipendenti, utili per eventi di più giorni o per relatori e ospiti che arrivano da fuori.",
  },
  {
    question: "Si può fare un sopralluogo prima di confermare?",
    answer:
      "Sì, organizziamo sopralluoghi su appuntamento per valutare insieme spazi, allestimento e logistica.",
  },
];

export default function EventiMeetingPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/eventi-meeting", name: title, description })} />

      <PageHero
        crumbs={[{ name: "Eventi & Meeting", path: "/eventi-meeting" }]}
        eyebrow="Aziende · Meeting · Eventi corporate"
        titleLines={["Spazi di carattere", "per incontri", "che lasciano il segno."]}
        intro={
          <p>
            Una dimora storica in provincia di Cremona per riunioni,
            presentazioni, workshop ed eventi aziendali: ambienti riservati,
            lontani dalla routine dell&apos;ufficio, con la possibilità di
            pernottare in villa.
          </p>
        }
        photo={photos.salaMeeting}
        actions={
          <>
            <ButtonLink href="/contatti?tipo=meeting">Richiedi disponibilità</ButtonLink>
            <ButtonLink href="#spazi" variant="outline">
              Scopri gli spazi
            </ButtonLink>
          </>
        }
      />

      {/* PRESENTAZIONE */}
      <EditorialSection
        tone="white"
        eyebrow="Un contesto diverso"
        title="Quando il luogo aiuta le persone a concentrarsi e a confrontarsi."
        photo={photos.porticoMeeting}
      >
        <p>
          Uscire dagli spazi abituali cambia la qualità di un incontro. Una
          sala con travi in legno, un portico affacciato sul verde, una corte
          in cui fare una pausa: Villa San Carlo offre a team e organizzatori
          un ambiente tranquillo, riservato e riconoscibile.
        </p>
        <p>
          Ogni evento viene definito insieme al referente aziendale, dalla
          disposizione degli spazi ai tempi della giornata.
        </p>
      </EditorialSection>

      {/* FORMATI */}
      <Highlights
        tone="cream"
        heading={
          <SectionHeading
            eyebrow="Formati"
            title="Dal meeting ristretto all'evento corporate."
            intro={
              <p>
                Gli ambienti si adattano a formati diversi, con allestimenti
                pensati per il tipo di lavoro da svolgere.
              </p>
            }
          />
        }
        items={[
          {
            title: "Meeting e riunioni",
            text: "Consigli di amministrazione, riunioni di direzione e incontri riservati, attorno a un tavolo unico o a ferro di cavallo.",
          },
          {
            title: "Presentazioni",
            text: "Lanci di prodotto, presentazioni a clienti e partner in un contesto che rafforza l'immagine dell'azienda.",
          },
          {
            title: "Workshop e formazione",
            text: "Giornate di lavoro, sessioni creative e percorsi formativi, con la possibilità di alternare interni ed esterni.",
          },
          {
            title: "Eventi aziendali",
            text: "Incontri con la rete commerciale, celebrazioni e momenti conviviali per il team, anche all'aperto.",
          },
        ]}
      />

      {/* SPAZI */}
      <div id="spazi">
        <SpaceCards
          tone="white"
          heading={
            <SectionHeading
              align="center"
              eyebrow="Spazi interni ed esterni"
              title="Ambienti diversi per ogni momento della giornata."
              intro={
                <p>
                  Sessioni di lavoro al chiuso, pause sotto i portici,
                  momenti plenari o conviviali nella corte.
                </p>
              }
            />
          }
          items={[
            {
              eyebrow: "Interno",
              title: "La sala riunioni",
              text: "Un ambiente con soffitto a travi in legno, adatto a riunioni e sessioni di lavoro con allestimento a ferro di cavallo o tavolo unico.",
              photo: photos.salaMeeting,
            },
            {
              eyebrow: "Semi-aperto",
              title: "Il portico",
              text: "Uno spazio coperto tra archi in mattoni, per incontri e workshop a contatto con l'esterno nelle stagioni miti.",
              photo: photos.porticoMeeting,
            },
            {
              eyebrow: "Esterno",
              title: "La corte",
              text: "Il prato della villa può accogliere sedute in platea, momenti di networking e aperitivi a fine giornata.",
              photo: photos.corteConvegno,
            },
          ]}
        />
      </div>

      {/* EVENTO + SOGGIORNO */}
      <EditorialSection
        tone="cream"
        reverse
        eyebrow="Evento e soggiorno"
        title="Lavorare, fermarsi, ripartire il giorno dopo."
        photo={photos.camera}
        action={
          <ButtonLink href="/soggiorni" variant="text">
            Camere e appartamenti
          </ButtonLink>
        }
      >
        <p>
          Per gli eventi di più giorni, o per chi arriva da lontano, la villa
          offre sei camere nello stabile principale e due appartamenti
          indipendenti.
        </p>
        <p>
          Relatori, ospiti e partecipanti possono così restare nello stesso
          luogo dell&apos;evento, senza spostamenti e con più tempo per il
          confronto.
        </p>
      </EditorialSection>

      {/* GALLERIA */}
      <GalleryGrid
        tone="white"
        heading={
          <SectionHeading
            align="center"
            eyebrow="Galleria"
            title="Allestimenti per incontri ed eventi professionali."
          />
        }
        photos={[
          photos.corteConvegno,
          photos.salaMeeting,
          photos.porticoMeeting,
          photos.corte,
          photos.facciata,
        ]}
      />

      <FaqSection
        title="Domande frequenti per aziende e organizzatori."
        items={faqs}
      />

      <ContactCTA
        eyebrow="Per aziende e organizzatori"
        title="Verifica la disponibilità per il tuo evento."
        text="Indicaci data, formato e numero di partecipanti: ti risponderemo con le soluzioni di spazio e allestimento più adatte."
        benefits={[
          "Disponibilità per le date richieste",
          "Proposta di allestimento degli spazi",
          "Sopralluogo su appuntamento",
        ]}
        primary={{ label: "Richiedi disponibilità", href: "/contatti?tipo=meeting" }}
        photo={photos.corteConvegno}
        whatsappMessage="Buongiorno, vorrei informazioni su Villa San Carlo per un evento aziendale."
      />
    </>
  );
}
