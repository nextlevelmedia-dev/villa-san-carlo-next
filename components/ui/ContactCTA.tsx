import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import Ornament from "@/components/ui/Ornament";
import { reveal } from "@/lib/reveal";
import { whatsappUrl } from "@/lib/site";
import type { Photo } from "@/lib/images";

/**
 * CTA finale delle pagine interne: fotografia con card sovrapposta
 * (stesso linguaggio di FinalCTA della home).
 */
export default function ContactCTA({
  eyebrow,
  title,
  text,
  benefits,
  primary,
  secondary,
  photo,
  whatsappMessage,
}: {
  eyebrow: string;
  title: string;
  text: string;
  benefits: string[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  photo: Photo;
  whatsappMessage?: string;
}) {
  const whatsapp = whatsappUrl(whatsappMessage);

  return (
    <section className="relative w-full overflow-hidden bg-[#F8F5F0] md:min-h-[620px]">
      {/* FOTO */}
      <div className="relative h-[320px] w-full md:absolute md:inset-0 md:h-auto">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/[0.08]" />
      </div>

      {/* CARD */}
      <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-center px-4 pb-10 md:min-h-[620px] md:px-6 md:pb-0 lg:px-12">
        <div
          {...reveal(0)}
          className="-mt-8 w-full max-w-[820px] bg-[#FBF8F4] px-6 py-8 shadow-[0_24px_70px_rgba(35,20,14,0.15)] md:mt-0 md:px-10 md:py-10 lg:px-12"
        >
          <div className="grid gap-8 md:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#7A5F49]">
                {eyebrow}
              </p>

              <Ornament className="mt-5" />

              <h2 className="mt-6 max-w-[460px] text-[34px] leading-[1.05] tracking-[-0.03em] text-[#3B2118] md:text-[42px] md:leading-[1.04]">
                {title}
              </h2>

              <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-[#6D625B]">
                {text}
              </p>
            </div>

            <div>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center border border-[#CDB9A7] text-[10px] text-[#4A281B]"
                    >
                      ✓
                    </span>
                    <span className="text-sm leading-6 text-[#4A281B]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
                <ButtonLink href={primary.href} className="px-6">
                  {primary.label}
                </ButtonLink>

                {secondary && (
                  <ButtonLink href={secondary.href} variant="outline" className="px-6">
                    {secondary.label}
                  </ButtonLink>
                )}

                {whatsapp && (
                  <ButtonLink href={whatsapp} variant="outline" external className="px-6">
                    WhatsApp
                  </ButtonLink>
                )}
              </div>

              <p className="mt-5 max-w-[300px] text-[11px] leading-5 text-[#6F625A]">
                Scrivici senza impegno: ti risponderemo personalmente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
