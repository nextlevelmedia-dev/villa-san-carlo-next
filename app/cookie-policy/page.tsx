import type { Metadata } from "next";
import Link from "next/link";
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
 * pubblicitari, aggiornare questa pagina e introdurre un banner di consenso.
 */
export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" updated="ottobre 2026">
      <p>
        Il sito di {site.name} non utilizza cookie di profilazione, cookie
        pubblicitari né strumenti di statistica di terze parti. Per questo
        motivo non viene mostrato alcun banner di consenso.
      </p>

      <h2>Archiviazione tecnica</h2>
      <p>
        Il sito memorizza nel browser (tramite <em>sessionStorage</em>) una
        sola informazione tecnica, che serve a mostrare l&apos;animazione
        iniziale del logo una volta per sessione. Il dato non identifica
        l&apos;utente, non viene trasmesso a server e si cancella alla
        chiusura della scheda.
      </p>

      <h2>Contenuti di terze parti</h2>
      <p>
        Nella pagina <Link href="/contatti">Contatti</Link> è possibile
        visualizzare una mappa di Google Maps. La mappa viene caricata
        esclusivamente dopo un tuo clic esplicito sul pulsante «Mostra la
        mappa»: solo in quel momento Google può impostare cookie e
        raccogliere dati secondo la propria{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          informativa privacy
        </a>
        .
      </p>

      <h2>Gestione dalle impostazioni del browser</h2>
      <p>
        Puoi in ogni momento cancellare o bloccare cookie e dati di
        navigazione dalle impostazioni del tuo browser.
      </p>

      <p>
        Per maggiori informazioni sul trattamento dei dati personali consulta
        la <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
