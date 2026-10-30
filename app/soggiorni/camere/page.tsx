import type { Metadata } from "next";
import UnitGrid from "@/components/stays/UnitGrid";
import ButtonLink from "@/components/ui/ButtonLink";
import ContactCTA from "@/components/ui/ContactCTA";
import EditorialSection from "@/components/ui/EditorialSection";
import FaqSection from "@/components/ui/FaqSection";
import Highlights from "@/components/ui/Highlights";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { photos } from "@/lib/images";
import { pageMetadata, staysJsonLd, webPageJsonLd } from "@/lib/seo";
import { rooms } from "@/lib/stays";

const title = "Camere in villa storica nel Cremonese";
const description =
  "Sei camere nella villa principale di Villa San Carlo, dimora storica in provincia di Cremona, tra cui una camera accessibile a persone con disabilità.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/soggiorni/camere",
  ogImage: "/og/camere.jpg",
});

const faqs = [
  {
    question: "Dove si trovano le camere?",
    answer:
      "Tutte e sei le camere si trovano nello stabile principale della villa, la parte storica della dimora.",
  },
  {
    question: "Quali informazioni servono per richiedere una camera?",
    answer:
      "Date di arrivo e partenza, numero di ospiti ed eventuali esigenze particolari, come l'accessibilità. Puoi indicarle direttamente nel modulo di contatto.",
  },
  {
    question: "La camera accessibile può essere richiesta in modo specifico?",
    answer:
      "Sì. Nel modulo di contatto puoi segnalare la necessità di una camera accessibile: ti risponderemo con la disponibilità e con le informazioni di dettaglio sulla camera.",
  },
  {
    question: "Posso riservare più camere per un gruppo?",
    answer:
      "Certo. Più camere possono essere richieste insieme, anche in combinazione con gli appartamenti indipendenti, per famiglie, gruppi o ospiti di un evento in villa.",
  },
];

export default function CamerePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path: "/soggiorni/camere", name: title, description }),
          staysJsonLd(rooms),
        ]}
      />

      <PageHero
        crumbs={[
          { name: "Soggiorni", path: "/soggiorni" },
          { name: "Camere", path: "/soggiorni/camere" },
        ]}
        eyebrow="Le camere della villa"
        titleLines={["Sei camere", "nella villa", "principale."]}
        intro={
          <p>
            Dormire dentro la parte storica della dimora, tra soffitti a travi
            e arredi d&apos;epoca: le camere di Villa San Carlo accolgono
            coppie, viaggiatori e ospiti degli eventi, in provincia di
            Cremona.
          </p>
        }
        photo={photos.camera}
        actions={
          <>
            <ButtonLink href="/contatti?tipo=soggiorno&alloggio=camera">
              Richiedi disponibilità
            </ButtonLink>
            <ButtonLink href="#elenco-camere" variant="outline">
              Vedi le camere
            </ButtonLink>
          </>
        }
      />

      <EditorialSection
        tone="white"
        eyebrow="L'atmosfera"
        title="Una notte nella casa, non accanto alla casa."
        photo={photos.facciata}
      >
        <p>
          Le camere si trovano nello stabile principale: chi le sceglie vive
          la villa in prima persona, dalla quiete del mattino alle luci della
          sera.
        </p>
        <p>
          Una scelta pensata per chi viaggia in coppia o da solo, per chi
          visita il territorio cremonese e per chi partecipa a un evento in
          villa e desidera restare senza doversi spostare.
        </p>
      </EditorialSection>

      <div id="elenco-camere" className="scroll-mt-20">
        <UnitGrid
          tone="cream"
          units={rooms}
          heading={
            <SectionHeading
              align="center"
              eyebrow="Le camere"
              title="Scegli la tua camera."
              intro={
                <p>
                  Per ogni camera puoi richiedere disponibilità direttamente:
                  ti risponderemo con tutte le informazioni.
                </p>
              }
            />
          }
        />
      </div>

      <Highlights
        tone="white"
        heading={
          <SectionHeading
            eyebrow="Per chi"
            title="Le camere sono pensate per…"
          />
        }
        items={[
          {
            title: "Coppie e viaggiatori",
            text: "Una base tranquilla per scoprire Cremona e la sua provincia con calma.",
          },
          {
            title: "Ospiti di eventi",
            text: "Invitati di matrimoni e feste, relatori e partecipanti di meeting che vogliono restare in villa.",
          },
          {
            title: "Ospiti con disabilità",
            text: "Una delle sei camere è accessibile: contattaci per conoscerne le caratteristiche nel dettaglio.",
          },
        ]}
      />

      <FaqSection title="Domande frequenti sulle camere." items={faqs} />

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-16 text-center lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
            Cerchi più autonomia?
          </p>
          <h2 className="max-w-2xl text-3xl leading-[1.1] tracking-[-0.025em] text-[#3B2118] md:text-4xl">
            Scopri anche i due appartamenti indipendenti.
          </h2>
          <ButtonLink href="/soggiorni/appartamenti" variant="outline">
            Vai agli appartamenti
          </ButtonLink>
        </div>
      </section>

      <ContactCTA
        eyebrow="Le camere di Villa San Carlo"
        title="Richiedi disponibilità per le camere."
        text="Indicaci date, numero di ospiti ed eventuali esigenze: ti risponderemo direttamente con disponibilità e condizioni."
        benefits={[
          "Sei camere nella villa principale",
          "Una camera accessibile",
          "Prenotazione diretta con la villa",
        ]}
        primary={{ label: "Richiedi disponibilità", href: "/contatti?tipo=soggiorno&alloggio=camera" }}
        photo={photos.corte}
        whatsappMessage="Buongiorno, vorrei informazioni sulla disponibilità delle camere a Villa San Carlo."
      />
    </>
  );
}
