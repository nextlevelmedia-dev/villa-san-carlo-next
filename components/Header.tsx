"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site, whatsappUrl } from "@/lib/site";
import { delay } from "@/lib/reveal";

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const whatsapp = whatsappUrl();

  // Chiude il menu al cambio pagina
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  /* SMART STICKY: nasconde scorrendo in basso, mostra scorrendo in alto */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      setScrolled(y > 8);

      if (y < 120) {
        setHidden(false);
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* MENU MOBILE: blocco scroll + chiusura con Esc */
  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isHidden = hidden && !menuOpen;

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-50 w-full bg-[#F8F5F0] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.24,1)] ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled && !menuOpen ? "shadow-[0_10px_30px_rgba(59,33,24,0.06)]" : ""}`}
    >
      <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Villa San Carlo - Home"
          className="flex items-center"
        >
          <Image
            src="/images/logo-villa-san-carlo.png"
            alt="Villa San Carlo - Casa Storica"
            width={640}
            height={420}
            loading="eager"
            sizes="110px"
            data-intro-logo
            className="h-auto w-[92px] object-contain md:w-[100px]"
          />
        </Link>

        {/* NAVIGAZIONE DESKTOP */}
        <nav
          aria-label="Navigazione principale"
          data-intro-nav
          className="hidden items-center gap-7 lg:flex xl:gap-9"
        >
          {navigation.main.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              {...delay(index)}
              className={`relative py-2 text-sm text-[#4A281B] transition-opacity hover:opacity-60 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-[#A58B73] after:transition-transform after:duration-500 ${
                isActive(item.href) ? "after:scale-x-100" : "after:scale-x-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA DESKTOP */}
        <Link
          href="/contatti"
          aria-current={pathname === "/contatti" ? "page" : undefined}
          className="hidden min-h-11 items-center justify-center border border-[#4A281B] px-6 text-xs font-medium uppercase tracking-[0.16em] text-[#4A281B] transition-colors hover:bg-[#4A281B] hover:text-white lg:inline-flex"
        >
          Contatti
        </Link>

        {/* MENU MOBILE */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center border border-[#D8CABB] text-[#4A281B] lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "top-1/2 -rotate-45" : "top-full"
              }`}
            />
          </span>
        </button>

        {/* LINEA INFERIORE */}
        <span
          aria-hidden="true"
          data-intro-line
          className="absolute inset-x-0 bottom-0 h-px bg-[#D8CABB]"
        />
      </div>

      {/* PANNELLO MENU MOBILE */}
      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className="h-[calc(100dvh-80px)] overflow-y-auto bg-[#F8F5F0] lg:hidden"
      >
        <nav
          aria-label="Navigazione mobile"
          className="mx-auto flex max-w-[1440px] flex-col px-6 pb-10 pt-6"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="border-b border-[#E6DBCF] py-4 text-2xl tracking-[-0.02em] text-[#3B2118]"
          >
            Home
          </Link>

          {navigation.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="flex items-center justify-between border-b border-[#E6DBCF] py-4 text-2xl tracking-[-0.02em] text-[#3B2118]"
            >
              {item.label}
              {isActive(item.href) && (
                <span aria-hidden="true" className="text-xs text-[#7A5F49]">
                  ✦
                </span>
              )}
            </Link>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contatti"
              className="flex min-h-14 w-full items-center justify-center bg-[#4A281B] px-5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
            >
              Richiedi informazioni
            </Link>

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 w-full items-center justify-center border border-[#CDB9A7] px-5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#4A281B]"
              >
                WhatsApp
              </a>
            )}
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#7A5F49]">
            {site.name} · {site.tagline}
          </p>
        </nav>
      </div>
    </header>
  );
}
