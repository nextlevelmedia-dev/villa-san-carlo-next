import type { ReactNode } from "react";
import Ornament from "@/components/ui/Ornament";
import { reveal } from "@/lib/reveal";

/** Eyebrow + ornamento + H2 + introduzione, con reveal sfalsato */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  id,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  id?: string;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-[640px]"} ${className}`}>
      <p
        {...reveal(0)}
        className={`text-[11px] font-medium uppercase tracking-[0.24em] ${light ? "text-white/85" : "text-[#7A5F49]"}`}
      >
        {eyebrow}
      </p>

      <div {...reveal(1, "fade")}>
        <Ornament align={align} light={light} className="mt-5" />
      </div>

      <h2
        id={id}
        {...reveal(1)}
        className={`mt-6 text-[32px] leading-[1.08] tracking-[-0.025em] sm:text-4xl md:text-5xl lg:text-[52px] ${centered ? "mx-auto max-w-3xl" : ""} ${light ? "text-white" : "text-[#3B2118]"}`}
      >
        {title}
      </h2>

      {intro && (
        <div
          {...reveal(2)}
          className={`mt-6 space-y-5 text-base leading-7 md:text-lg md:leading-8 ${centered ? "mx-auto max-w-2xl" : "max-w-[600px]"} ${light ? "text-white/90" : "text-[#6D625B]"}`}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
