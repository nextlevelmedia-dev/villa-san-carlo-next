import type { ReactNode } from "react";
import UnitCard from "@/components/stays/UnitCard";
import type { StayUnit } from "@/lib/stays";

export default function UnitGrid({
  units,
  heading,
  tone = "white",
}: {
  units: StayUnit[];
  heading: ReactNode;
  tone?: "cream" | "white";
}) {
  return (
    <section className={tone === "white" ? "bg-white" : "bg-[#F8F5F0]"}>
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        {heading}

        <div
          className={`mt-14 grid gap-6 lg:mt-16 ${units.length === 2 ? "md:grid-cols-2 lg:mx-auto lg:max-w-[1000px]" : "md:grid-cols-2 lg:grid-cols-3"}`}
        >
          {units.map((unit, index) => (
            <UnitCard key={unit.id} unit={unit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
