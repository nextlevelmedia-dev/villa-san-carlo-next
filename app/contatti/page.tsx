import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactFormWithParams from "@/components/contact/ContactFormWithParams";
import MapEmbed from "@/components/contact/MapEmbed";
import Atmosphere from "@/components/ui/Atmosphere";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ButtonLink from "@/components/ui/ButtonLink";
import JsonLd from "@/components/ui/JsonLd";
import Ornament from "@/components/ui/Ornament";
import { delay, reveal } from "@/lib/reveal";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";
import {
  formatAddress,
  mapsUrl,
  phoneHref,
  site,
  whatsappUrl,
} from "@/lib/site";

const title = "Contatti e richieste di informazioni";
const description =
  "Contatta Villa San Carlo per cerimonie, eventi privati, meeting aziendali e soggiorni in camere e appartamenti in provincia di Cremona. Organizza una visita.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/contatti",
  ogImage: "/og/contatti.jpg",
});

const steps = [
  "Compila il modulo con le informazioni principali.",
  "Ti ricontattiamo per approfondire la tua richiesta.",
  "Se lo desideri, fissiamo una visita della villa.",
];

export default function ContattiPage() {
  const address = formatAddress();
  const maps = mapsUrl();
  const tel = phoneHref();
  const whatsapp = whatsappUrl("Buongiorno, vorrei ricevere informazioni su Villa San Carlo.");
  const { email, phone } = site.contact;
  const mapQuery = site.geo
    ? `${site.geo.latitude},${site.geo.longitude}`
    : address.full
      ? `${site.name}, ${address.full}`
      : null;

  return (
    <>
      <JsonLd
        data={{
          ...webPageJsonLd({ path: "/contatti", name: title, description }),
          "@type": "ContactPage",
        }}
      />

      {/* HERO + MODULO */}
      <section className="relative overflow-hidden bg-[#F8F5F0]">
        <Atmosphere />

        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-14 px-6 pb-20 pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12 lg:pb-28 lg:pt-10">
          {/* INTRO E CONTATTI DIRETTI */}
          <div>
            <div className="hero-rise" {...delay(0)}>
              <Breadcrumbs items={[{ name: "Contatti", path: "/contatti" }]} />
            </div>

            <p
              className="hero-rise mt-10 text-xs font-medium uppercase tracking-[0.22em] text-[#7A5F49] lg:mt-14"
              {...delay(1)}
            >
              Contatti · Informazioni · Visite
            </p>

            <h1
              data-split
              data-split-delay="0.15"
              className="mt-5 text-[38px] leading-[1.06] tracking-[-0.035em] text-[#3B2118] sm:text-5xl lg:text-[56px]"
            >
              <span className="block">Raccontaci</span>
              <span className="block">cosa hai in mente.</span>
            </h1>

            <div
              className="hero-rise mt-7 max-w-lg space-y-4 text-base leading-7 text-[#6D625B] md:text-lg md:leading-8"
              {...delay(3)}
            >
              <p>
                Una cerimonia, una festa, un incontro aziendale o qualche
                giorno in villa: scrivici senza impegno. Ti risponderemo
                personalmente per capire insieme come accoglierti.
              </p>
            </div>

            <ol className="hero-rise mt-10 space-y-4 border-t border-[#D8CABB] pt-8" {...delay(4)}>
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4 text-sm leading-6 text-[#4A281B]">
                  <span className="w-6 shrink-0 text-xs tracking-[0.14em] text-[#7A5F49]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            {/* CONTATTI DIRETTI — solo dati verificati */}
            {(email || phone || whatsapp) && (
              <div className="hero-rise mt-10 border-t border-[#D8CABB] pt-8" {...delay(5)}>
                <h2 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
                  Contatti diretti
                </h2>

                <ul className="mt-5 space-y-4">
                  {phone && tel && (
                    <li>
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6F625A]">Telefono</span>
                      <a href={tel} className="mt-1 inline-block text-lg text-[#3B2118] hover:opacity-60">
                        {phone}
                      </a>
                    </li>
                  )}
                  {email && (
                    <li>
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6F625A]">Email</span>
                      <a href={`mailto:${email}`} className="mt-1 inline-block break-all text-lg text-[#3B2118] hover:opacity-60">
                        {email}
                      </a>
                    </li>
                  )}
                </ul>

                {whatsapp && (
                  <div className="mt-6">
                    <ButtonLink href={whatsapp} variant="outline" external>
                      Scrivici su WhatsApp
                    </ButtonLink>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MODULO */}
          <div className="hero-rise lg:pt-24" {...delay(2)}>
            <div className="bg-[#FBF8F4]/80 p-6 shadow-[0_24px_70px_rgba(35,20,14,0.08)] sm:p-9 lg:p-11">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
                Richiesta di informazioni
              </h2>
              <Ornament className="mb-8 mt-4" />

              <Suspense fallback={<ContactForm />}>
                <ContactFormWithParams />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* DOVE SIAMO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-12 lg:py-28">
          <div>
            <p {...reveal(0)} className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
              Dove siamo
            </p>
            <div {...reveal(1, "fade")}>
              <Ornament className="mt-5" />
            </div>
            <h2 data-split className="mt-6 text-[32px] leading-[1.08] tracking-[-0.025em] text-[#3B2118] sm:text-4xl md:text-5xl">
              Nel territorio cremonese.
            </h2>

            <div {...reveal(2)} className="mt-6 space-y-4 text-base leading-7 text-[#6D625B] md:text-lg md:leading-8">
              {address.full ? (
                <address className="not-italic text-[#3B2118]">
                  {site.name}
                  <br />
                  {address.street}
                  <br />
                  {address.city}
                </address>
              ) : (
                <p>
                  Villa San Carlo si trova in provincia di{" "}
                  {site.address.province}. Contattaci per ricevere
                  l&apos;indirizzo e le indicazioni per raggiungerci.
                </p>
              )}

              {site.accessFromCremona && <p>{site.accessFromCremona}.</p>}
            </div>

            {maps && (
              <div {...reveal(3)} className="mt-8">
                <ButtonLink href={maps} variant="text" external>
                  Apri in Google Maps
                </ButtonLink>
              </div>
            )}
          </div>

          <div {...reveal(0, "image")} className="relative h-[360px] overflow-hidden bg-[#E8DED4] sm:h-[440px]">
            {mapQuery ? (
              <MapEmbed query={mapQuery} label={site.name} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 border border-[#E2D6C9] bg-[#EFE7DD] px-8 text-center">
                <span aria-hidden="true" className="text-[#B69A82]">✦</span>
                <p className="max-w-xs text-sm leading-6 text-[#6D625B]">
                  Provincia di {site.address.province} · {site.address.region}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VISITA */}
      <section className="border-t border-[#D8CABB] bg-[#F3EEE7]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between lg:px-12">
          <div {...reveal(0)} className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
              Organizza una visita
            </p>
            <h2 className="mt-4 text-3xl leading-[1.1] tracking-[-0.025em] text-[#3B2118] md:text-4xl">
              Il modo migliore per scegliere è vedere la villa dal vivo.
            </h2>
          </div>
          <div {...reveal(1)}>
            <ButtonLink href="/contatti?tipo=visita#f-nome">Richiedi una visita</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
