import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          
          {/* BRAND */}
          <div className="max-w-[360px]">
            <Link
              href="/"
              aria-label="Villa San Carlo - Home"
              className="inline-flex"
            >
              <Image
                src="/image/logo.png"
                alt="Villa San Carlo - Casa Storica"
                width={200}
                height={90}
                className="h-auto w-[145px] object-contain md:w-[165px]"
              />
            </Link>

            <p className="mt-7 max-w-[330px] text-sm leading-7 text-[#6D625B]">
              Una dimora storica da vivere, cornice di cerimonie, ricevimenti,
              eventi privati, incontri aziendali e soggiorni speciali.
            </p>

            {/* DECORAZIONE */}
            <div
              aria-hidden="true"
              className="mt-7 flex items-center gap-3"
            >
              <span className="h-px w-14 bg-[#C8AD92]/60" />
              <span className="text-[9px] text-[#A58B73]">✦</span>
              <span className="h-px w-7 bg-[#C8AD92]/60" />
            </div>
          </div>

          {/* LINK AREA */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:contents">
            
            {/* ESPLORA */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#A58B73]">
                Esplora
              </p>

              <nav
                aria-label="Navigazione footer"
                className="mt-6 flex flex-col items-start gap-4"
              >
                <Link
                  href="/"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  Home
                </Link>

                <Link
                  href="/la-villa"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  La Villa
                </Link>

                <Link
                  href="/gallery"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  Gallery
                </Link>

                <Link
                  href="/contatti"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  Contatti
                </Link>
              </nav>
            </div>

            {/* ESPERIENZE */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#A58B73]">
                Esperienze
              </p>

              <nav className="mt-6 flex flex-col items-start gap-4">
                <Link
                  href="/cerimonie"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  Cerimonie & Ricevimenti
                </Link>

                <Link
                  href="/eventi-meeting"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  Eventi & Meeting
                </Link>

                <Link
                  href="/eventi-privati"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  Eventi Privati
                </Link>

                <Link
                  href="/soggiorno"
                  className="text-sm text-[#4A281B]/75 transition-colors duration-300 hover:text-[#4A281B]"
                >
                  Soggiorno
                </Link>
              </nav>
            </div>

            {/* CONTATTI */}
            <div className="col-span-2 lg:col-span-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#A58B73]">
                Contatti
              </p>

              <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58B73]">
                    Dove siamo
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#6D625B]">
                    Inserisci indirizzo
                    <br />
                    Città, Provincia
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58B73]">
                    Telefono
                  </p>

                  <a
                    href="tel:+39XXXXXXXXXX"
                    className="mt-2 inline-block text-sm text-[#6D625B] transition-colors duration-300 hover:text-[#4A281B]"
                  >
                    +39 XXX XXX XXXX
                  </a>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58B73]">
                    Email
                  </p>

                  <a
                    href="mailto:info@villassancarlo.it"
                    className="mt-2 inline-block text-sm text-[#6D625B] transition-colors duration-300 hover:text-[#4A281B]"
                  >
                    info@villassancarlo.it
                  </a>
                </div>

                {/* SOCIAL */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58B73]">
                    Social
                  </p>

                  <div className="mt-3 flex gap-3">
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="flex h-10 w-10 items-center justify-center border border-[#D8CABB] text-[10px] uppercase tracking-[0.08em] text-[#4A281B]/70 transition-all duration-300 hover:border-[#4A281B] hover:text-[#4A281B]"
                    >
                      IG
                    </a>

                    <a
                      href="#"
                      aria-label="Facebook"
                      className="flex h-10 w-10 items-center justify-center border border-[#D8CABB] text-[10px] uppercase tracking-[0.08em] text-[#4A281B]/70 transition-all duration-300 hover:border-[#4A281B] hover:text-[#4A281B]"
                    >
                      FB
                    </a>

                    <a
                      href="https://wa.me/39XXXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="flex h-10 w-10 items-center justify-center border border-[#D8CABB] text-[9px] uppercase tracking-[0.05em] text-[#4A281B]/70 transition-all duration-300 hover:border-[#4A281B] hover:text-[#4A281B]"
                    >
                      WA
                    </a>
                  </div>
                </div>
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
        <p className="text-[10px] leading-5 tracking-[0.04em] text-[#8A7C72]">
          © {new Date().getFullYear()} Villa San Carlo. Tutti i diritti
          riservati.
        </p>

        {/* LINK LEGALI — 2 COLONNE SU MOBILE */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <Link
            href="/privacy-policy"
            className="text-[10px] uppercase tracking-[0.12em] text-[#8A7C72] transition-colors duration-300 hover:text-[#4A281B]"
          >
            Privacy Policy
          </Link>

          <Link
            href="/cookie-policy"
            className="text-[10px] uppercase tracking-[0.12em] text-[#8A7C72] transition-colors duration-300 hover:text-[#4A281B]"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}