import type { ReactNode } from "react";
import Atmosphere from "@/components/ui/Atmosphere";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import SectionHeading from "@/components/ui/SectionHeading";
import { reveal } from "@/lib/reveal";

export default function FaqSection({
  items,
  eyebrow = "Domande frequenti",
  title,
  intro,
}: {
  items: FaqItem[];
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0]">
      <Atmosphere variant="b" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-20 lg:px-12 lg:py-28">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align="center" />

        <div {...reveal(0, "fade")} className="mt-14 lg:mt-16">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
