import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { reveal } from "@/lib/reveal";
import { stayInfo } from "@/lib/stays";

const steps = [
  {
    title: "Indica date e ospiti",
    text: "Nel modulo di contatto scegli «Soggiorno», le date indicative e il numero di persone.",
  },
  {
    title: "Scegli la tipologia",
    text: "Camera, appartamento o entrambi: segnala anche eventuali esigenze di accessibilità.",
  },
  {
    title: "Ricevi la nostra risposta",
    text: "Ti scriveremo con disponibilità e condizioni per il periodo richiesto.",
  },
];

/**
 * Informazioni utili. Le voci pratiche (check-in, colazione, ecc.)
 * provengono da `stayInfo` in lib/stays.ts e compaiono solo se compilate.
 */
export default function StayInfo() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="Informazioni utili"
          title="Come richiedere il tuo soggiorno."
          intro={
            <p>
              Le richieste vengono gestite direttamente da Villa San Carlo,
              senza piattaforme intermediarie.{" "}
              <Link href="/contatti?tipo=soggiorno" className="text-[#4A281B] underline decoration-[#C8AD92] underline-offset-4 hover:decoration-[#4A281B]">
                Vai al modulo di richiesta
              </Link>
              .
            </p>
          }
        />

        <div>
          <ol className="border-t border-[#D8CABB]">
            {steps.map((step, index) => (
              <li
                key={step.title}
                {...reveal(index)}
                className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#D8CABB] py-6"
              >
                <span className="text-xs tracking-[0.14em] text-[#7A5F49]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl text-[#3B2118]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#6D625B]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {stayInfo.length > 0 && (
            <dl {...reveal(0)} className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {stayInfo.map((item) => (
                <div key={item.label} className="border-l border-[#D8CABB] pl-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#7A5F49]">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-7 text-[#4A281B]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
