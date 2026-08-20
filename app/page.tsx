import Hero from "@/components/Hero";
import WhyVilla from "@/components/WhyVilla";
import VillaExperience from "@/components/VillaExperience";
import ValueProposition from "@/components/ValueProposition";
import Differentiators from "@/components/Differentiators";
import HowItWorks from "@/components/HowItWorks";
import AboutVilla from "@/components/AboutVilla";
import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";



export default function Home() {
  return (
    <main>
      <Hero />
      <WhyVilla />
      <VillaExperience />
      <ValueProposition />
      <Differentiators />
      <HowItWorks />
      <AboutVilla />
      <Faq />
      <FinalCTA/>
      
    </main>
  );
}