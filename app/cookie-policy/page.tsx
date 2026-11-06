import type { Metadata } from "next";
import Link from "next/link";
import CookiePreferencesButton from "@/components/consent/CookiePreferencesButton";
import LegalPage from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Informazioni sull'uso di cookie e tecnologie simili sul sito di Villa San Carlo.",
  path: "/cookie-policy",
  noIndex: true,
});

/*
 * Descrive lo stato attuale del sito: nessun cookie di profilazione o
 * statistica. Se in futuro si aggiungono strumenti di analisi o pixel
 * pubblicitari, aggiornare questa pagina e le categorie del banner
 * (components/consent/CookieBanner.tsx, lib/consent.ts).
 */
export default function CookiePolicyPage() {
  const { companyName } = site.legal;

  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" updated="novembre 2026">
      <p>
        Questa pagina descrive quali cookie e tecnologie simili vengono
        utilizzati sul sito di {site.name}, gestito da{" "}
        {companyName ?? site.name}, ai sensi dell&apos;art. 122 del Codice
        Privacy (D.Lgs. 196/2003), del Regolamento (UE) 2016/679 («GDPR») e
        delle Linee guida del Garante per la protezione dei dati personali
        del 10 giugno 2021.
      </p>

      <h2>Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti visitati salvano nel
        browser, per essere riletti nelle visite successive. Tecnologie
        simili, come il <em>localStorage</em> e il <em>sessionStorage</em>,
        permettono di memorizzare informazioni nel browser in modo analogo.
      </p>

      <h2>Cookie e strumenti utilizzati da questo sito</h2>
      <p>
        Il sito <strong>non utilizza cookie di profilazione, cookie
        pubblicitari né strumenti di statistica</strong>. Vengono utilizzati
        soltanto:
      </p>
      <ul>
        <li>
          <strong>Strumenti tecnici necessari</strong> (non richiedono
          consenso): la memorizzazione della tua scelta sui cookie
          (<em>localStorage</em>, chiave «vsc-consent», conservata fino a
          quando non la cancelli o modifichi) e un&apos;informazione che
          serve a mostrare l&apos;animazione iniziale del logo una sola volta
          per sessione (<em>sessionStorage</em>, chiave «vsc-intro»,
          cancellata alla chiusura della scheda). Questi dati non ti
          identificano e non vengono trasmessi a server.
        </li>
        <li>
          <strong>Contenuti di terze parti</strong> (richiedono consenso):
          la mappa di Google Maps nella pagina{" "}
          <Link href="/contatti">Contatti</Link>. Quando la mappa viene
          caricata, Google può impostare cookie e raccogliere dati di
          navigazione secondo la propria{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            informativa privacy
          </a>{" "}
          e la propria{" "}
          <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">
            policy sui cookie
          </a>
          .
        </li>
      </ul>

      <h2>Il banner e la gestione del consenso</h2>
      <p>
        Alla prima visita un banner ti permette di scegliere:
      </p>
      <ul>
        <li>
          <strong>Solo necessari</strong>: vengono usati soltanto gli
          strumenti tecnici. La mappa di Google non viene caricata, salvo un
          tuo clic esplicito sul pulsante «Mostra la mappa».
        </li>
        <li>
          <strong>Accetta tutti</strong>: oltre agli strumenti tecnici, la
          mappa di Google Maps viene caricata automaticamente.
        </li>
      </ul>
      <p>
        Chiudere o ignorare il banner equivale a non prestare il consenso.
        Puoi modificare la tua scelta in qualsiasi momento:{" "}
        <CookiePreferencesButton className="text-[#4A281B] underline decoration-[#C8AD92] underline-offset-4" />
        {" "}(il link è disponibile anche in fondo a ogni pagina).
      </p>

      <h2>Gestione dalle impostazioni del browser</h2>
      <p>
        Puoi inoltre cancellare o bloccare cookie e dati di navigazione dalle
        impostazioni del tuo browser. Le istruzioni sono disponibili sui
        siti dei principali produttori:{" "}
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>,{" "}
        <a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer">Firefox</a>,{" "}
        <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>,{" "}
        <a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener noreferrer">Edge</a>.
      </p>

      <p>
        Per maggiori informazioni sul trattamento dei dati personali e
        sull&apos;esercizio dei tuoi diritti consulta la{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
