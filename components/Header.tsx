import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-[#D8CABB] bg-[#F8F5F0]">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">

        {/* LOGO */}
        <Link
          href="/"
          aria-label="Villa San Carlo - Home"
          className="flex items-center"
        >
          <Image
  src="/image/logo.png"
  alt="Villa San Carlo - Casa Storica"
  width={160}
  height={70}
  priority
  className="h-auto w-[115px] object-contain md:w-[125px]"
/>
        </Link>

        {/* NAVIGAZIONE DESKTOP */}
        <nav
          aria-label="Navigazione principale"
          className="hidden items-center gap-8 lg:flex"
        >
          <Link
            href="/"
            className="text-sm text-[#4A281B] transition-opacity hover:opacity-60"
          >
            Home
          </Link>

          <Link
            href="/la-villa"
            className="text-sm text-[#4A281B] transition-opacity hover:opacity-60"
          >
            La Villa
          </Link>

          <Link
            href="/cerimonie"
            className="text-sm text-[#4A281B] transition-opacity hover:opacity-60"
          >
            Cerimonie
          </Link>

          <Link
            href="/eventi-meeting"
            className="text-sm text-[#4A281B] transition-opacity hover:opacity-60"
          >
            Eventi & Meeting
          </Link>

          <Link
            href="/soggiorni"
            className="text-sm text-[#4A281B] transition-opacity hover:opacity-60"
          >
            Soggiorni
          </Link>

          <Link
            href="/gallery"
            className="text-sm text-[#4A281B] transition-opacity hover:opacity-60"
          >
            Gallery
          </Link>
        </nav>

        {/* CTA DESKTOP */}
        <Link
          href="/contatti"
          className="hidden min-h-11 items-center justify-center border border-[#4A281B] px-6 text-xs font-medium uppercase tracking-[0.16em] text-[#4A281B] transition-colors hover:bg-[#4A281B] hover:text-white lg:inline-flex"
        >
          Contatti
        </Link>

        {/* MENU MOBILE */}
        <button
          type="button"
          aria-label="Apri menu"
          className="flex h-11 w-11 items-center justify-center border border-[#D8CABB] text-[#4A281B] lg:hidden"
        >
          <span className="flex flex-col gap-[6px]">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </span>
        </button>

      </div>
    </header>
  );
}