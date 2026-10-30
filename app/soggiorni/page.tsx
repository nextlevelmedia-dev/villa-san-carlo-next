import type { Metadata } from "next";
import StayGallery from "@/components/stays/StayGallery";
import StayInfo from "@/components/stays/StayInfo";
import StayTypeSection from "@/components/stays/StayTypeSection";
import ButtonLink from "@/components/ui/ButtonLink";
import ContactCTA from "@/components/ui/ContactCTA";
import CrossLinks from "@/components/ui/CrossLinks";
import FaqSection from "@/components/ui/FaqSection";
import JsonLd from "@/components/ui/JsonLd";
import Ornament from "@/components/ui/Ornament";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { photos } from "@/lib/images";
import { reveal } from "@/lib/reveal";
import { pageMetadata, staysJsonLd, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { apartments, rooms } from "@/lib/stays";

const title = "Camere e appartamenti in provincia di Cremona";
const description =
  "Soggiorna in una dimora storica nel Cremonese: 5 camere nella villa principale, 1 camera accessibile e 2 appartamenti indipendenti. Richiedi disponibilità.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/soggiorni",
  ogImage: "/og/soggiorni.jpg",
});

const accessibleRoom = rooms.find((room) => room.accessible);
const apartmentPhotos = apartments.flatMap((unit) => unit.photos);
const roomPhotos = rooms.flatMap((unit) => unit.photos);

const faqs = [
  {
    question: "Qual è la differenza tra camere e appartamenti?",
    answer:
      "Cinque camere si trovano nella villa principale e permettono di vivere da vicino gli ambienti della dimora; a queste si aggiunge una camera accessibile. I due appartamenti sono indipendenti e offrono maggiore autonomia e riservatezza, ad esempio per famiglie o soggiorni più lunghi.",
  },
  {
    question: "È disponibile una camera accessibile?",
    answer:
      "Sì, oltre alle cinque camere della villa principale è disponibile una camera accessibile a persone con disabilità. Per conoscerne nel dettaglio le caratteristiche, scrivici: ti daremo tutte le informazioni utili per organizzare il soggiorno.",
  },
  {
    question: "Si può soggiornare anche senza partecipare a un evento?",
    answer:
      "Indicaci date e numero di ospiti nel modulo di richiesta: ti risponderemo con la disponibilità di camere e appartamenti per il periodo che ti interessa.",
  },
  {
    question: "È possibile riservare più camere per un gruppo o per gli ospiti di un evento?",
    answer:
      "Sì. Camere e appartamenti possono essere richiesti insieme, per esempio per gli invitati di un matrimonio o per i partecipanti a un evento aziendale.",
  },
  {
    question: "Come si prenota?",
    answer:
      "Al momento le richieste si gestiscono direttamente con noi: compila il modulo di contatto indicando date, numero di ospiti e tipologia di alloggio, e ti risponderemo con disponibilità e condizioni.",
  },
];

export default function SoggiorniPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path: "/soggiorni", name: title, description }),
          staysJsonLd([...apartments, ...rooms]),
        ]}
      />

      <PageHero
        crumbs={[{ name: "Soggiorni", path: "/soggiorni" }]}
        eyebrow="Ospitalità · Camere · Appartamenti"
        titleLines={["Dormire in una", "dimora storica", "nel Cremonese."]}
        intro={
          <p>
            Cinque camere nella villa principale, una camera accessibile e
            due appartamenti indipendenti, per un soggiorno tranquillo in provincia di
            Cremona: per una vacanza, un viaggio di lavoro o qualche notte
            legata a un evento in villa.
          </p>
        }
        photo={photos.camera1}
        slides={[
          { photo: photos.camera1, label: "Camera 1" },
          { photo: photos.appartamento, label: "Appartamento 1" },
          { photo: photos.camera3, label: "Camera 3" },
          { photo: photos.appartamento2, label: "Appartamento 2" },
          { photo: photos.camera5, label: "Camera 5" },
          { photo: photos.appartamento2Camera, label: "Appartamento 2" },
        ]}
        actions={
          <>
            <ButtonLink href="/contatti?tipo=soggiorno">Richiedi disponibilità</ButtonLink>
            <ButtonLink href="#tipologie" variant="outline">
              Camere e appartamenti
            </ButtonLink>
          </>
        }
        note={
          <dl className="grid max-w-md grid-cols-3 border-y border-[#D8CABB] py-5 text-center">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.18em] text-[#7A5F49]">Camere</dt>
              <dd className="mt-1 text-2xl text-[#3B2118]">{rooms.filter((r) => !r.accessible).length}</dd>
            </div>
            <div className="border-x border-[#D8CABB]">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-[#7A5F49]">Appartamenti</dt>
              <dd className="mt-1 text-2xl text-[#3B2118]">{apartments.length}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.18em] text-[#7A5F49]">Accessibili</dt>
              <dd className="mt-1 text-2xl text-[#3B2118]">{rooms.filter((r) => r.accessible).length}</dd>
            </div>
          </dl>
        }
      />

      {/* INTRODUZIONE */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <SectionHeading
            align="center"
            eyebrow="Soggiornare in villa"
            title="La quiete di una casa storica nel territorio cremonese."
            intro={
              <>
                <p>
                  Soggiornare a Villa San Carlo significa svegliarsi in una
                  dimora con una propria storia, tra ambienti dal carattere
                  autentico, la corte e il verde del giardino.
                </p>
                <p>
                  Il territorio cremonese, con la città di Cremona e i
                  borghi della provincia, diventa così la meta di un viaggio
                  lento, da vivere con calma.
                  {site.accessFromCremona && <> La villa si trova {site.accessFromCremona}.</>}
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* TIPOLOGIE */}
      <div id="tipologie" className="scroll-mt-20">
        <StayTypeSection
          id="appartamenti"
          tone="cream"
          count={apartments.length}
          countLabel="Appartamenti indipendenti"
          eyebrow="Gli appartamenti"
          title="Autonomia e riservatezza, con la villa come cornice."
          photo={apartmentPhotos[0]}
          placeholderLabel="Appartamenti di Villa San Carlo"
          href="/soggiorni/appartamenti"
          linkLabel="Scopri gli appartamenti"
        >
          <p>
            Due appartamenti indipendenti per chi desidera i propri spazi:
            famiglie, piccoli gruppi di amici o soggiorni più lunghi, con la
            libertà di organizzare le giornate secondo i propri ritmi.
          </p>
          <p>
            Ideali anche per gli sposi o per chi partecipa a un evento in villa
            e vuole un luogo tutto suo per prepararsi e riposare.
          </p>
        </StayTypeSection>

        <StayTypeSection
          id="camere"
          tone="white"
          reverse
          count={rooms.filter((room) => !room.accessible).length}
          countLabel="Camere nella villa principale + 1 accessibile"
          eyebrow="Le camere"
          title="Dormire nel cuore della villa."
          photo={photos.camera4}
          placeholderLabel="Camere di Villa San Carlo"
          href="/soggiorni/camere"
          linkLabel="Scopri le camere"
        >
          <p>
            Cinque camere nello stabile principale della dimora, per vivere la
            villa anche di notte, e una camera accessibile a persone con
            disabilità.
          </p>
          <p>
            Una soluzione naturale per coppie, viaggiatori e ospiti di
            eventi che desiderano restare in villa.
          </p>
        </StayTypeSection>
      </div>

      {/* CAMERA ACCESSIBILE */}
      {accessibleRoom && (
        <section className="bg-[#F3EEE7]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-12 lg:py-20">
            <div {...reveal(0)}>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
                Accessibilità
              </p>
              <Ornament className="mt-5" />
              <h2 className="mt-6 text-[30px] leading-[1.1] tracking-[-0.025em] text-[#3B2118] md:text-4xl">
                Una camera accessibile a persone con disabilità.
              </h2>
            </div>

            <div {...reveal(1)} className="space-y-5 text-base leading-7 text-[#6D625B] md:text-lg md:leading-8">
              <p>
                Oltre alle cinque camere della villa principale, Villa San
                Carlo dispone di una camera accessibile a persone con disabilità, perché l&apos;ospitalità di una
                dimora storica possa essere vissuta da tutti.
              </p>
              <p>
                Ogni esigenza è diversa: scrivici per ricevere informazioni
                precise su accessi, spazi e servizi della camera, così da
                organizzare il soggiorno con serenità.
              </p>
              <div className="pt-2">
                <ButtonLink
                  href={`/contatti?tipo=soggiorno&unita=${accessibleRoom.id}`}
                  variant="text"
                >
                  Chiedi informazioni sulla camera accessibile
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GALLERIA DISTINTA */}
      <StayGallery
        groups={[
          { title: "Camere", photos: roomPhotos },
          { title: "Appartamenti", photos: apartmentPhotos },
        ]}
      />

      {/* INFORMAZIONI UTILI */}
      <StayInfo />

      <FaqSection title="Domande frequenti sul soggiorno in villa." items={faqs} />

      <CrossLinks
        tone="white"
        heading={
          <SectionHeading
            align="center"
            eyebrow="Soggiorno ed eventi"
            title="Un evento in villa, una notte in villa."
            intro={
              <p>
                Camere e appartamenti sono il complemento naturale di
                cerimonie, feste ed eventi aziendali.
              </p>
            }
          />
        }
        items={[
          {
            href: "/cerimonie",
            eyebrow: "Matrimoni · Ricevimenti",
            title: "Cerimonie & Ricevimenti",
            cta: "Scopri di più",
            photo: photos.ricevimentoGiardino,
          },
          {
            href: "/eventi-meeting",
            eyebrow: "Aziende",
            title: "Eventi & Meeting",
            cta: "Scopri di più",
            photo: photos.salaMeeting,
          },
          {
            href: "/la-villa",
            eyebrow: "La dimora",
            title: "La Villa",
            cta: "Scopri la villa",
            photo: photos.facciata,
          },
        ]}
      />

      <ContactCTA
        eyebrow="Il tuo soggiorno"
        title="Richiedi disponibilità per camere e appartamenti."
        text="Indicaci le date, il numero di ospiti e la tipologia di alloggio che preferisci: ti risponderemo con disponibilità e condizioni."
        benefits={[
          "Risposta diretta, senza intermediari",
          "Camere e appartamenti, anche insieme",
          "Informazioni sulla camera accessibile",
        ]}
        primary={{ label: "Richiedi disponibilità", href: "/contatti?tipo=soggiorno" }}
        photo={photos.camera2}
        whatsappMessage="Buongiorno, vorrei informazioni sulla disponibilità di camere/appartamenti a Villa San Carlo."
      />
    </>
  );
}
