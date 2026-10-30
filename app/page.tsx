import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WhyVilla from "@/components/WhyVilla";
import VillaExperience from "@/components/VillaExperience";
import ValueProposition from "@/components/ValueProposition";
import Differentiators from "@/components/Differentiators";
import HowItWorks from "@/components/HowItWorks";
import AboutVilla from "@/components/AboutVilla";
import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Villa San Carlo | Dimora storica per eventi e soggiorni a Cremona",
    description:
      "Dimora storica in provincia di Cremona per matrimoni, ricevimenti, eventi privati e meeting aziendali, con 6 camere e 2 appartamenti per soggiornare in villa.",
    path: "/",
  }),
  title: {
    absolute: "Villa San Carlo | Dimora storica per eventi e soggiorni a Cremona",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhyVilla />
      <VillaExperience />
      <ValueProposition />
      <Differentiators />
      <HowItWorks />
      <AboutVilla />
      <Faq />
      <FinalCTA />
    </>
  );
}
