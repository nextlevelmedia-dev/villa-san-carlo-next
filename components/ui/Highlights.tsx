import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";

export type Highlight = { title: string; text: string };

/** Punti numerati (stile WhyVilla / HowItWorks della home) */
export default function Highlights({
  items,
  heading,
  tone = "cream",
}: {
  items: Highlight[];
  heading: ReactNode;
  tone?: "cream" | "white" | "sand";
}) {
  const bg =
    tone === "white" ? "bg-white" : tone === "sand" ? "bg-[#F3EEE7]" : "bg-[#F8F5F0]";
  const cols = items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className={`relative overflow-hidden ${bg}`}>
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        {heading}

        <ol className={`mt-14 grid gap-px bg-[#D8CABB] sm:grid-cols-2 lg:mt-16 ${cols} border border-[#D8CABB]`}>
          {items.map((item, index) => (
            <li
              key={item.title}
              {...reveal(index)}
              className="bg-[#FBF8F4] p-7 sm:p-8 lg:p-9"
            >
              <span className="block text-xs tracking-[0.14em] text-[#7A5F49]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl leading-snug tracking-[-0.01em] text-[#3B2118] md:text-[22px]">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#6D625B]">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
