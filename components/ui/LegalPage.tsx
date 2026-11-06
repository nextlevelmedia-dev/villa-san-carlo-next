import type { ReactNode } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Ornament from "@/components/ui/Ornament";

/** Impaginazione sobria per i testi legali */
export default function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-[#F8F5F0]">
      <div className="mx-auto max-w-[860px] px-6 pb-24 pt-8 lg:pb-32 lg:pt-10">
        <Breadcrumbs items={[{ name: title, path }]} />

        <h1 data-split data-split-delay="0.1" className="mt-12 text-4xl leading-[1.08] tracking-[-0.03em] text-[#3B2118] md:text-5xl">
          {title}
        </h1>
        <Ornament className="mt-6" />
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[#6F625A]">
          Ultimo aggiornamento: {updated}
        </p>

        <div className="mt-12 space-y-6 text-base leading-8 text-[#5F554F] [&_a]:text-[#4A281B] [&_a]:underline [&_a]:decoration-[#C8AD92] [&_a]:underline-offset-4 [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:tracking-[-0.015em] [&_h2]:text-[#3B2118] [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  );
}
