"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/contact/ContactForm";

/** Preseleziona tipo di richiesta e unità dai link interni (?tipo=…&unita=…) */
export default function ContactFormWithParams() {
  const params = useSearchParams();

  return (
    <ContactForm
      key={params.toString()}
      initialType={params.get("tipo")}
      unit={params.get("unita")}
      accommodation={params.get("alloggio")}
    />
  );
}
