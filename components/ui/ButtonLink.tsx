import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "text";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex min-h-14 items-center justify-center gap-4 bg-[#4A281B] px-8 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#5B3325]",
  outline:
    "inline-flex min-h-14 items-center justify-center gap-4 border border-[#CDB9A7] px-8 text-[11px] font-medium uppercase tracking-[0.16em] text-[#4A281B] transition-colors duration-300 hover:border-[#4A281B]",
  light:
    "inline-flex min-h-14 items-center justify-center gap-5 bg-[#F8F5F0] px-9 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A281B] transition-colors duration-300 hover:bg-white",
  text: "group inline-flex min-h-11 items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A281B] transition-opacity duration-300 hover:opacity-60",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = variant !== "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${styles[variant]} ${className}`}>
      {content}
    </Link>
  );
}
