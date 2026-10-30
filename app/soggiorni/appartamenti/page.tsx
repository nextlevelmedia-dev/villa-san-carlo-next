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
import { apartmentSlides, apartments } from "@/lib/stays";

const title = "Appartamenti indipendenti in provincia di Cremona";
const description =
  "Due appartamenti indipendenti a Villa San Carlo, dimora storica nel Cremonese: autonomia e riservatezza per famiglie, gruppi e soggiorni più lunghi.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/soggiorni/appartamenti",
  ogImage: "/og/appartamenti.jpg",
});

const faqs = [
  {
    question: "Cosa significa che gli appartamenti sono indipendenti?",
    answer:
      "Sono unità autonome rispetto alle camere della villa: offrono maggiore riservatezza e la libertà di organizzare il soggiorno secondo i propri tempi.",
  },
  {
    question: "Per chi sono più adatti gli appartamenti?",
    answer:
      "Per famiglie, piccoli gruppi, soggiorni di più notti e per chi partecipa a un evento in villa e desidera uno spazio tutto suo.",
  },
  {
    question: "Si possono prenotare entrambi gli appartamenti insieme?",
    answer:
      "Sì, e possono essere abbinati anche alle camere della villa per gruppi più numerosi. Indicalo nella richiesta.",
  },
  {
    question: "Come ricevo informazioni su dotazioni e posti letto?",
    answer:
      "Scrivici tramite il modulo di contatto indicando date e numero di ospiti: ti invieremo tutte le informazioni sull'appartamento più adatto.",
  },
];

export default function AppartamentiPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path: "/soggiorni/appartamenti", name: title, description }),
          staysJsonLd(apartments),
        ]}
      />

      <PageHero
        crumbs={[
          { name: "Soggiorni", path: "/soggiorni" },
          { name: "Appartamenti", path: "/soggiorni/appartamenti" },
        ]}
        eyebrow="Gli appartamenti indipendenti"
        titleLines={["I tuoi spazi,", "nel contesto di una", "dimora storica."]}
        intro={
          <p>
            Due appartamenti indipendenti a Villa San Carlo, in provincia di
            Cremona: per chi desidera autonomia, riservatezza e il tempo di
            vivere il territorio secondo i propri ritmi.
          </p>
        }
        photo={photos.appartamento}
        slides={apartmentSlides()}
        actions={
          <>
            <ButtonLink href="/contatti?tipo=soggiorno&alloggio=appartamento">
              Richiedi disponibilità
            </ButtonLink>
            <ButtonLink href="#elenco-appartamenti" variant="outline">
              Vedi gli appartamenti
            </ButtonLink>
          </>
        }
      />

      <EditorialSection
        tone="white"
        eyebrow="Indipendenza"
        textFirstOnMobile
        title="La libertà di una casa, il fascino di una villa."
        photo={photos.corteGiardino}
      >
        <p>
          Gli appartamenti sono la scelta di chi vuole sentirsi a casa anche
          in viaggio: spazi propri, orari liberi, la possibilità di fermarsi
          più a lungo.
        </p>
        <p>
          Con la villa, la sua corte e il suo giardino come cornice, e il
          territorio cremonese da scoprire senza fretta.
        </p>
      </EditorialSection>

      <div id="elenco-appartamenti" className="scroll-mt-20">
        <UnitGrid
          tone="cream"
          units={apartments}
          heading={
            <SectionHeading
              align="center"
              eyebrow="Gli appartamenti"
              title="Due appartamenti, due modi di vivere la villa."
              intro={
                <p>
                  Richiedi disponibilità per l&apos;appartamento che
                  preferisci o per entrambi.
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
            title="Gli appartamenti sono pensati per…"
          />
        }
        items={[
          {
            title: "Famiglie e piccoli gruppi",
            text: "Per stare insieme mantenendo la propria autonomia e i propri spazi.",
          },
          {
            title: "Soggiorni più lunghi",
            text: "Per chi resta più notti nel Cremonese, per vacanza o per lavoro.",
          },
          {
            title: "Sposi e famiglie degli eventi",
            text: "Un luogo riservato in cui prepararsi e riposare nei giorni dell'evento.",
          },
        ]}
      />

      <FaqSection title="Domande frequenti sugli appartamenti." items={faqs} />

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-16 text-center lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
            Preferisci dormire nella villa?
          </p>
          <h2 className="max-w-2xl text-3xl leading-[1.1] tracking-[-0.025em] text-[#3B2118] md:text-4xl">
            Scopri le camere della villa.
          </h2>
          <ButtonLink href="/soggiorni/camere" variant="outline">
            Vai alle camere
          </ButtonLink>
        </div>
      </section>

      <ContactCTA
        eyebrow="Gli appartamenti di Villa San Carlo"
        title="Richiedi disponibilità per gli appartamenti."
        text="Indicaci date e numero di ospiti: ti risponderemo con la disponibilità e tutte le informazioni sugli appartamenti."
        benefits={[
          "Due appartamenti indipendenti",
          "Abbinabili alle camere della villa",
          "Prenotazione diretta con la villa",
        ]}
        primary={{ label: "Richiedi disponibilità", href: "/contatti?tipo=soggiorno&alloggio=appartamento" }}
        photo={photos.appartamento}
        whatsappMessage="Buongiorno, vorrei informazioni sulla disponibilità degli appartamenti a Villa San Carlo."
      />
    </>
  );
}
