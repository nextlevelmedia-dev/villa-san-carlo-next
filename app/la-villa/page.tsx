import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import ContactCTA from "@/components/ui/ContactCTA";
import CrossLinks from "@/components/ui/CrossLinks";
import EditorialSection from "@/components/ui/EditorialSection";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Highlights from "@/components/ui/Highlights";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import SpaceCards from "@/components/ui/SpaceCards";
import { photos } from "@/lib/images";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const title = "La Villa — Dimora storica nel territorio cremonese";
const description =
  "Scopri Villa San Carlo: una casa storica in provincia di Cremona con sale d'epoca, portici in mattoni, corte e giardino, da vivere per eventi e soggiorni.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/la-villa",
  ogImage: "/og/la-villa.jpg",
});

export default function LaVillaPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/la-villa", name: title, description })} />

      <PageHero
        crumbs={[{ name: "La Villa", path: "/la-villa" }]}
        eyebrow="Villa San Carlo · Casa Storica"
        titleLines={["Una dimora storica", "da abitare, non solo", "da ammirare."]}
        intro={
          <p>
            Nel territorio cremonese, Villa San Carlo conserva il carattere di
            una vera casa storica: sale d&apos;epoca, portici in mattoni, una
            corte aperta e un giardino che cambia volto con le ore del giorno.
          </p>
        }
        photo={photos.facciata}
        actions={
          <>
            <ButtonLink href="#ambienti">Scopri gli spazi</ButtonLink>
            <ButtonLink href="/contatti?tipo=visita" variant="outline">
              Organizza una visita
            </ButtonLink>
          </>
        }
      />

      {/* STORIA E IDENTITÀ */}
      <EditorialSection
        tone="white"
        eyebrow="Storia e identità"
        title="Una casa che ha attraversato il tempo senza perdere la propria anima."
        photo={photos.corte}
        caption={{ eyebrow: "La corte", text: "Il cuore della dimora" }}
      >
        <p>
          Villa San Carlo è prima di tutto una casa, e come tale continua a
          essere vissuta. Le facciate, la corte e i portici raccontano un
          modo di abitare fatto di spazi ampi, materiali naturali e luce.
        </p>
        <p>
          Oggi la villa apre le sue porte a chi cerca un luogo autentico per
          celebrare, incontrarsi o semplicemente fermarsi qualche giorno,
          rispettandone l&apos;atmosfera e i ritmi.
        </p>
      </EditorialSection>

      {/* AMBIENTI */}
      <div id="ambienti">
        <SpaceCards
          tone="cream"
          columns={4}
          heading={
            <SectionHeading
              align="center"
              eyebrow="Gli ambienti"
              title="Sale, portici, corte e giardino."
              intro={
                <p>
                  Ogni spazio ha un carattere proprio. Insieme compongono una
                  dimora da attraversare, in cui interni ed esterni dialogano
                  continuamente.
                </p>
              }
            />
          }
          items={[
            {
              eyebrow: "Interni",
              title: "Le sale storiche",
              text: "Soffitti decorati, volte e travi in legno: ambienti raccolti ed eleganti, adatti a cene, incontri e momenti conviviali.",
              photo: photos.salaAffrescata,
            },
            {
              eyebrow: "Tra dentro e fuori",
              title: "I portici",
              text: "Archi in mattoni e grandi travi creano uno spazio riparato e luminoso, che si affaccia direttamente sulla corte.",
              photo: photos.porticoArchi,
            },
            {
              eyebrow: "All'aperto",
              title: "La corte",
              text: "Un ampio prato racchiuso dagli edifici della villa: il luogo dell'accoglienza, degli aperitivi e delle giornate all'aria aperta.",
              photo: photos.ricevimentoGiardino,
            },
            {
              eyebrow: "Il verde",
              title: "Il giardino",
              text: "Alberi, aiuole e angoli raccolti che, la sera, si accendono di luci e lanterne.",
              photo: photos.giardinoSera,
            },
          ]}
        />
      </div>

      {/* ESPERIENZA */}
      <Highlights
        tone="white"
        heading={
          <SectionHeading
            eyebrow="Vivere una dimora autentica"
            title="Il valore di un luogo che non è stato costruito per gli eventi."
            intro={
              <p>
                A Villa San Carlo non si entra in una sala anonima: si entra in
                una casa, con la sua storia, le sue proporzioni e i suoi
                silenzi.
              </p>
            }
          />
        }
        items={[
          {
            title: "Un'atmosfera che non si allestisce",
            text: "Mattoni, legno, volte e prato sono già una scenografia: l'allestimento accompagna la villa, non deve inventarla.",
          },
          {
            title: "Spazi che si susseguono",
            text: "Sale, portici, corte e giardino permettono di vivere momenti diversi senza mai lasciare la dimora.",
          },
          {
            title: "Il tempo giusto",
            text: "Con camere e appartamenti in villa, un evento può diventare un soggiorno e un soggiorno un piccolo ritiro.",
          },
        ]}
      />

      {/* GALLERIA */}
      <GalleryGrid
        heading={
          <SectionHeading
            align="center"
            eyebrow="Galleria"
            title="Uno sguardo sugli ambienti della villa."
          />
        }
        photos={[
          photos.porticoTavolata,
          photos.salaMattoni,
          photos.salaMeeting,
          photos.facciata,
          photos.corte,
        ]}
      />

      {/* COLLEGAMENTI */}
      <CrossLinks
        heading={
          <SectionHeading
            align="center"
            eyebrow="Vivere la villa"
            title="Un luogo, molte occasioni."
            intro={
              <p>
                Scopri come Villa San Carlo può accogliere la tua cerimonia,
                un incontro professionale o qualche giorno di soggiorno.
              </p>
            }
          />
        }
        items={[
          {
            href: "/cerimonie",
            eyebrow: "Matrimoni · Ricevimenti",
            title: "Cerimonie & Ricevimenti",
            cta: "Scopri le cerimonie",
            photo: photos.tavoloDolci,
          },
          {
            href: "/eventi-meeting",
            eyebrow: "Aziende · Meeting",
            title: "Eventi & Meeting",
            cta: "Scopri gli spazi",
            photo: photos.porticoMeeting,
          },
          {
            href: "/soggiorni",
            eyebrow: "Camere · Appartamenti",
            title: "Soggiorni in villa",
            cta: "Scopri l'ospitalità",
            photo: photos.camera,
          },
        ]}
      />

      <ContactCTA
        eyebrow="Vieni a conoscerci"
        title="Organizza una visita alla villa."
        text="Nessuna fotografia sostituisce una passeggiata tra le sale e sotto i portici. Fissiamo insieme un appuntamento per conoscere Villa San Carlo dal vivo."
        benefits={[
          "Visita su appuntamento",
          "Tutti gli ambienti, interni ed esterni",
          "Un primo confronto sulla tua idea",
        ]}
        primary={{ label: "Organizza una visita", href: "/contatti?tipo=visita" }}
        photo={photos.giardinoSera}
        whatsappMessage="Buongiorno, vorrei organizzare una visita a Villa San Carlo."
      />
    </>
  );
}
