import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Informativa sul trattamento dei dati personali del sito di Villa San Carlo.",
  path: "/privacy-policy",
  noIndex: true,
});

/*
 * Testo base ai sensi degli artt. 13-14 del Regolamento UE 2016/679.
 * TODO: completare i dati del titolare in lib/site.ts e far verificare
 * il testo a un consulente prima della pubblicazione.
 */
export default function PrivacyPolicyPage() {
  const { companyName, registeredOffice, vatNumber } = site.legal;
  const { email } = site.contact;

  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="ottobre 2026">
      <p>
        Questa informativa descrive come vengono trattati i dati personali
        degli utenti che visitano il sito di {site.name} e che utilizzano il
        modulo di contatto, ai sensi degli articoli 13 e 14 del Regolamento
        (UE) 2016/679 (“GDPR”).
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        {companyName ?? site.name}
        {registeredOffice && <>, {registeredOffice}</>}
        {vatNumber && <>, P.IVA {vatNumber}</>}.
        {email ? (
          <>
            {" "}Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </>
        ) : (
          <>
            {" "}Per qualsiasi richiesta relativa ai tuoi dati puoi utilizzare
            il <Link href="/contatti">modulo di contatto</Link>.
          </>
        )}
      </p>

      <h2>Dati raccolti</h2>
      <ul>
        <li>
          <strong>Dati forniti volontariamente</strong> tramite il modulo di
          contatto: nome e cognome, indirizzo email, numero di telefono
          (facoltativo), tipo di richiesta, date indicative, numero di ospiti
          e contenuto del messaggio.
        </li>
        <li>
          <strong>Dati tecnici di navigazione</strong> trattati dai sistemi
          che ospitano il sito (ad esempio indirizzo IP e informazioni sul
          browser), necessari al funzionamento e alla sicurezza del servizio.
        </li>
      </ul>

      <h2>Finalità e base giuridica</h2>
      <p>
        I dati inviati con il modulo vengono utilizzati esclusivamente per
        rispondere alla tua richiesta e, se lo desideri, per organizzare una
        visita o fornirti un preventivo. La base giuridica è l&apos;esecuzione
        di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR).
        I dati tecnici sono trattati sulla base del legittimo interesse a
        garantire la sicurezza del sito e a prevenire abusi, come l&apos;invio
        automatico di messaggi indesiderati (art. 6.1.f GDPR).
      </p>
      <p>I dati non vengono utilizzati per finalità di marketing né ceduti a terzi.</p>

      <h2>Modalità e conservazione</h2>
      <p>
        I dati sono trattati con strumenti elettronici e misure di sicurezza
        adeguate, e conservati per il tempo necessario a gestire la richiesta
        e l&apos;eventuale rapporto che ne deriva, nel rispetto degli obblighi
        di legge.
      </p>

      <h2>Destinatari</h2>
      <p>
        I dati possono essere trattati, in qualità di responsabili del
        trattamento, dai fornitori dei servizi tecnici necessari al
        funzionamento del sito, come il servizio di hosting e il servizio di
        invio delle email. Alcuni fornitori possono trattare i dati anche al
        di fuori dell&apos;Unione Europea, sulla base di garanzie adeguate
        previste dal GDPR (ad esempio decisioni di adeguatezza o Clausole
        Contrattuali Standard).
      </p>

      <h2>I tuoi diritti</h2>
      <p>
        Puoi chiedere in qualsiasi momento l&apos;accesso ai tuoi dati, la
        rettifica, la cancellazione, la limitazione del trattamento, la
        portabilità e opporti al trattamento (artt. 15-22 GDPR). Hai inoltre
        il diritto di proporre reclamo al Garante per la protezione dei dati
        personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).
      </p>

      <h2>Cookie</h2>
      <p>
        Per le informazioni sull&apos;uso di cookie e tecnologie simili consulta
        la <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
    </LegalPage>
  );
}
