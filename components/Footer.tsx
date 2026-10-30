import Image from "next/image";
import Link from "next/link";
import {
  formatAddress,
  mapsUrl,
  navigation,
  phoneHref,
  site,
  whatsappUrl,
} from "@/lib/site";

const linkClass =
  "text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]";

const socialClass =
  "flex h-11 min-w-11 items-center justify-center border border-[#D8CABB] px-3 text-[10px] uppercase tracking-[0.08em] text-[#4A281B]/70 transition-all duration-300 hover:border-[#4A281B] hover:text-[#4A281B]";

export default function Footer() {
  const address = formatAddress();
  const maps = mapsUrl();
  const tel = phoneHref();
  const whatsapp = whatsappUrl();
  const { email, phone } = site.contact;
  const { instagram, facebook } = site.social;
  const { companyName, vatNumber, registeredOffice, cin } = site.legal;
  const hasSocial = Boolean(instagram || facebook || whatsapp);
  const legalLine = [
    companyName,
    registeredOffice,
    vatNumber && `P.IVA ${vatNumber}`,
    cin && `CIN ${cin}`,
  ].filter(Boolean);

  return (
    <footer className="relative overflow-hidden border-t border-[#D8CABB] bg-[#F8F5F0] text-[#3B2118]">
      {/* BACKGROUND ATMOSFERICO — stesso linguaggio della Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[12%] -top-[30%] h-[620px] w-[620px] rounded-full bg-[#C8AD92]/18 blur-[130px]" />

        <div className="absolute left-[28%] top-[20%] h-[520px] w-[520px] rounded-full bg-[#DCCABC]/16 blur-[145px]" />

        <div className="absolute -right-[10%] bottom-[-35%] h-[620px] w-[620px] rounded-full bg-[#A98C74]/10 blur-[155px]" />
      </div>

      {/* CONTENUTO */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-12 pt-16 md:pt-20 lg:px-12 lg:pb-14 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* BRAND */}
          <div className="max-w-[360px]">
            <Link
              href="/"
              aria-label="Villa San Carlo - Home"
              className="inline-flex"
            >
              <Image
                src="/images/logo-villa-san-carlo.png"
                alt="Villa San Carlo - Casa Storica"
                width={640}
                height={420}
                sizes="150px"
                className="h-auto w-[125px] object-contain md:w-[140px]"
              />
            </Link>

            <p className="mt-7 max-w-[330px] text-sm leading-7 text-[#6D625B]">
              Una dimora storica nel territorio cremonese, cornice di
              cerimonie, ricevimenti, eventi privati, incontri aziendali e
              soggiorni.
            </p>

            {/* DECORAZIONE */}
            <div
              aria-hidden="true"
              className="mt-7 flex items-center gap-3"
            >
              <span className="h-px w-14 bg-[#C8AD92]/60" />
              <span className="text-[9px] text-[#7A5F49]">✦</span>
              <span className="h-px w-7 bg-[#C8AD92]/60" />
            </div>
          </div>

          {/* LINK AREA */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:contents">
            {/* ESPLORA */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
                Esplora
              </p>

              <nav
                aria-label="Esplora"
                className="mt-6 flex flex-col items-start gap-4"
              >
                {navigation.explore.map((item) => (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ESPERIENZE */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
                Esperienze
              </p>

              <nav
                aria-label="Esperienze"
                className="mt-6 flex flex-col items-start gap-4"
              >
                {navigation.experiences.map((item) => (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* SOGGIORNI */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
                Ospitalità
              </p>

              <nav
                aria-label="Soggiorni"
                className="mt-6 flex flex-col items-start gap-4"
              >
                {navigation.stays.map((item) => (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* CONTATTI */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#7A5F49]">
                Contatti
              </p>

              <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#7A5F49]">
                    Dove siamo
                  </p>

                  {address.full ? (
                    <address className="mt-2 text-sm not-italic leading-6 text-[#6D625B]">
                      {address.street}
                      <br />
                      {address.city}
                      {maps && (
                        <>
                          <br />
                          <a
                            href={maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-[11px] uppercase tracking-[0.14em] text-[#4A281B] hover:opacity-60"
                          >
                            Indicazioni →
                          </a>
                        </>
                      )}
                    </address>
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-[#6D625B]">
                      Provincia di {site.address.province}
                    </p>
                  )}
                </div>

                {phone && tel && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#7A5F49]">
                      Telefono
                    </p>

                    <a
                      href={tel}
                      className="mt-2 inline-block text-sm text-[#6D625B] transition-colors duration-300 hover:text-[#4A281B]"
                    >
                      {phone}
                    </a>
                  </div>
                )}

                {email && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#7A5F49]">
                      Email
                    </p>

                    <a
                      href={`mailto:${email}`}
                      className="mt-2 inline-block break-all text-sm text-[#6D625B] transition-colors duration-300 hover:text-[#4A281B]"
                    >
                      {email}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#7A5F49]">
                    Scrivici
                  </p>

                  <Link
                    href="/contatti"
                    className="mt-2 inline-block text-sm text-[#6D625B] transition-colors duration-300 hover:text-[#4A281B]"
                  >
                    Modulo di contatto →
                  </Link>
                </div>

                {/* SOCIAL — solo profili configurati */}
                {hasSocial && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#7A5F49]">
                      Social
                    </p>

                    <div className="mt-3 flex gap-3">
                      {instagram && (
                        <a
                          href={instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className={socialClass}
                        >
                          IG
                        </a>
                      )}

                      {facebook && (
                        <a
                          href={facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className={socialClass}
                        >
                          FB
                        </a>
                      )}

                      {whatsapp && (
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                          className={socialClass}
                        >
                          WA
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LINEA */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="h-px bg-[#D8CABB]" />
      </div>

      {/* FOOTER BOTTOM */}
      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <div className="text-[11px] leading-5 tracking-[0.04em] text-[#6F625A]">
          <p>
            © {new Date().getFullYear()} {site.name}. Tutti i diritti
            riservati.
          </p>
          {legalLine.length > 0 && <p>{legalLine.join(" · ")}</p>}
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/privacy-policy"
            className="py-1 text-[10px] uppercase tracking-[0.12em] text-[#6F625A] transition-colors duration-300 hover:text-[#4A281B]"
          >
            Privacy Policy
          </Link>

          <Link
            href="/cookie-policy"
            className="py-1 text-[10px] uppercase tracking-[0.12em] text-[#6F625A] transition-colors duration-300 hover:text-[#4A281B]"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
