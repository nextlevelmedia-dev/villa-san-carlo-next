import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import ContactCTA from "@/components/ui/ContactCTA";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import { photos } from "@/lib/images";
import { reveal } from "@/lib/reveal";
import { pageMetadata, staysJsonLd, webPageJsonLd } from "@/lib/seo";
import { apartments, unitHref } from "@/lib/stays";

type Props = { params: Promise<{ slug: string }> };

// Solo gli appartamenti configurati in lib/stays.ts: ogni altro slug è 404
export const dynamicParams = false;

export function generateStaticParams() {
  return apartments.map((unit) => ({ slug: unit.id }));
}

const findApartment = (slug: string) =>
  apartments.find((unit) => unit.id === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unit = findApartment((await params).slug);
  if (!unit) return {};

  const ogImage = `/og/${unit.id}.jpg`;

  return pageMetadata({
    title: `${unit.name} — Appartamento indipendente nel Cremonese`,
    description: `${unit.description ?? "Appartamento indipendente"} A Villa San Carlo, dimora storica in provincia di Cremona. Richiedi disponibilità.`,
    path: unitHref(unit),
    ogImage,
  });
}

export default async function AppartamentoPage({ params }: Props) {
  const unit = findApartment((await params).slug);
  if (!unit) notFound();

  const path = unitHref(unit);
  const others = apartments.filter((other) => other.id !== unit.id);
  const details = [
    unit.maxGuests && { label: "Ospiti", value: `Fino a ${unit.maxGuests}` },
    unit.size && { label: "Superficie", value: `${unit.size} m²` },
    unit.beds && { label: "Letti", value: unit.beds },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path,
            name: `${unit.name} — Villa San Carlo`,
            description: unit.description ?? "Appartamento indipendente a Villa San Carlo.",
          }),
          staysJsonLd([unit]),
        ]}
      />

      <PageHero
        crumbs={[
          { name: "Soggiorni", path: "/soggiorni" },
          { name: "Appartamenti", path: "/soggiorni/appartamenti" },
          { name: unit.name, path },
        ]}
        eyebrow="Appartamento indipendente · Villa San Carlo"
        titleLines={[unit.name, "nella cornice di", "una dimora storica."]}
        intro={
          <p>
            {unit.description ??
              "Un appartamento indipendente per vivere Villa San Carlo con autonomia e riservatezza."}
          </p>
        }
        photo={unit.photos[0] ?? photos.corte}
        slides={unit.photos.map((photo) => ({ photo, label: unit.name }))}
        actions={
          <>
            <ButtonLink href={`/contatti?tipo=soggiorno&unita=${unit.id}`}>
              Richiedi disponibilità
            </ButtonLink>
            <ButtonLink href="#foto" variant="outline">
              Guarda le foto
            </ButtonLink>
          </>
        }
      />

      {/* L'APPARTAMENTO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-12 lg:py-28">
          <SectionHeading
            eyebrow="L'appartamento"
            title="Spazi tuoi, con i ritmi che preferisci."
            intro={
              <>
                <p>
                  {unit.name} è uno dei due appartamenti indipendenti di Villa
                  San Carlo: una soluzione pensata per chi desidera autonomia e
                  riservatezza, per famiglie, piccoli gruppi o soggiorni di più
                  notti nel territorio cremonese.
                </p>
                <p>
                  È ideale anche per chi partecipa a un evento in villa e
                  vuole un luogo tutto suo in cui prepararsi e riposare.
                </p>
              </>
            }
          />

          <div {...reveal(1)} className="self-end">
            {details.length > 0 && (
              <dl className="grid grid-cols-2 border-t border-[#D8CABB]">
                {details.map((detail) => (
                  <div key={detail.label} className="border-b border-[#D8CABB] py-5">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#7A5F49]">
                      {detail.label}
                    </dt>
                    <dd className="mt-2 text-lg text-[#3B2118]">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {unit.amenities.length > 0 && (
              <ul className="mt-8 grid gap-3 text-[15px] text-[#4A281B] sm:grid-cols-2">
                {unit.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-start gap-3">
                    <span aria-hidden="true" className="text-[#B69A82]">✦</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            )}

            {details.length === 0 && unit.amenities.length === 0 && (
              <div className="border border-[#E2D6C9] bg-[#FBF8F4] p-7">
                <p className="text-[15px] leading-7 text-[#6D625B]">
                  Per posti letto, dotazioni e condizioni del soggiorno
                  scrivici indicando date e numero di ospiti: ti invieremo
                  tutte le informazioni su {unit.name}.
                </p>
                <div className="mt-5">
                  <ButtonLink href={`/contatti?tipo=soggiorno&unita=${unit.id}`} variant="text">
                    Chiedi informazioni
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOTO */}
      <section id="foto" className="scroll-mt-20 bg-[#F8F5F0]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <SectionHeading align="center" eyebrow="Fotografie" title={`${unit.name} in immagini.`} />

          <ul
            className={`mt-14 grid gap-4 lg:mt-16 ${
              unit.photos.length % 3 === 0
                ? "md:grid-cols-3"
                : unit.photos.length > 1
                  ? "md:grid-cols-2"
                  : "mx-auto max-w-4xl"
            }`}
          >
            {unit.photos.length > 0 ? (
              unit.photos.map((photo, index) => (
                <li
                  key={photo.src}
                  {...reveal(index % 3, "image")}
                  className="relative aspect-[4/5] overflow-hidden bg-[#E8DED4]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      unit.photos.length % 3 === 0
                        ? "(max-width: 768px) 100vw, 33vw"
                        : unit.photos.length > 1
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 1024px) 100vw, 900px"
                    }
                    className="object-cover"
                  />
                </li>
              ))
            ) : (
              <li className="aspect-[4/3]">
                <PhotoPlaceholder label={unit.name} className="h-full w-full" />
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* ALTRI APPARTAMENTI */}
      {others.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-24">
            <SectionHeading eyebrow="Scopri anche" title="Gli altri alloggi della villa." />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={unitHref(other)}
                  {...reveal(0, "image")}
                  className="group relative block min-h-[320px] overflow-hidden bg-[#3B2118]"
                >
                  {other.photos[0] && (
                    <Image
                      src={other.photos[0].src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-6 text-white">
                    <div>
                      <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/85">
                        Appartamento indipendente
                      </p>
                      <h3 className="text-2xl leading-tight">{other.name}</h3>
                      <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em]">
                        Scopri l&apos;appartamento →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              <Link
                href="/soggiorni/camere"
                {...reveal(1, "image")}
                className="group relative block min-h-[320px] overflow-hidden bg-[#3B2118]"
              >
                <Image
                  src={photos.camera.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6 text-white">
                  <div>
                    <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/85">
                      5 nella villa principale + 1 accessibile
                    </p>
                    <h3 className="text-2xl leading-tight">Le sei camere</h3>
                    <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em]">
                      Scopri le camere →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        eyebrow={unit.name}
        title={`Richiedi disponibilità per ${unit.name}.`}
        text="Indicaci le date e il numero di ospiti: ti risponderemo direttamente con disponibilità e condizioni."
        benefits={[
          "Appartamento indipendente",
          "Abbinabile alle camere della villa",
          "Prenotazione diretta con la villa",
        ]}
        primary={{ label: "Richiedi disponibilità", href: `/contatti?tipo=soggiorno&unita=${unit.id}` }}
        secondary={{ label: "Tutti gli appartamenti", href: "/soggiorni/appartamenti" }}
        photo={unit.photos[0] ?? photos.appartamento}
        whatsappMessage={`Buongiorno, vorrei informazioni sulla disponibilità di ${unit.name} a Villa San Carlo.`}
      />
    </>
  );
}
