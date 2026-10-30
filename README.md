# Villa San Carlo — sito web

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP (solo pagina Gallery).

```bash
npm run dev     # sviluppo
npm run build   # build di produzione
npm run start   # server di produzione
npm run lint
```

## Configurazione prima della pubblicazione

### 1. Variabili d'ambiente (vedi `.env.example`)

| Variabile | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico: canonical, sitemap, robots, Open Graph. Senza questa variabile (e fuori da Vercel) gli URL puntano a `localhost`. |
| `RESEND_API_KEY` | Chiave API Resend per l'invio del modulo contatti (solo server). |
| `CONTACT_TO_EMAIL` | Indirizzo che riceve le richieste. |
| `CONTACT_FROM_EMAIL` | Mittente su un dominio verificato in Resend. |

Finché le tre variabili email non sono impostate, il modulo **non simula l'invio**:
mostra all'utente un messaggio di errore esplicito e registra l'avviso nei log del server.

### 2. Dati aziendali — `lib/site.ts`

Tutti i campi `null` (email, telefono, WhatsApp, indirizzo e comune, coordinate,
distanza da Cremona, social, ragione sociale, P.IVA, CIN) non vengono mostrati
finché non sono compilati. Una volta inseriti compaiono automaticamente in header,
footer, pagina Contatti (con mappa a caricamento su consenso), CTA WhatsApp e
dati strutturati Schema.org.

### 3. Camere e appartamenti — `lib/stays.ts`

2 appartamenti + 6 camere (1 accessibile). Per ogni unità si possono aggiungere
nome, descrizione, ospiti, metratura, letti, servizi e fotografie: le schede, le
gallerie e i dati strutturati (`Apartment` / `HotelRoom`) si aggiornano da soli.
`stayInfo` ospita le informazioni pratiche (check-in, colazione, parcheggio…).

### 4. Fotografie — `lib/images.ts` e `public/images/`

Catalogo centralizzato con dimensioni e testi alternativi. Per sostituire o
aggiungere una foto: copiarla in `public/images/` (JPEG, lato lungo ≤ 2400 px)
e aggiungerla al catalogo.

### 5. Testi legali

`/privacy-policy` e `/cookie-policy` contengono un testo base coerente con il
funzionamento attuale del sito (nessun cookie di profilazione o statistica).
Vanno completati con i dati del titolare e verificati da un consulente. Se si
aggiungono analytics o pixel, serve anche un banner di consenso.

## Architettura

- `lib/` — configurazione (sito, immagini, alloggi, rotte), SEO, reveal, modulo contatti.
- `components/ui/` — componenti condivisi (PageHero, SectionHeading, EditorialSection,
  SpaceCards, GalleryGrid, FaqSection, ContactCTA, Breadcrumbs, JsonLd…).
- `components/stays/`, `components/contact/` — sezioni specifiche.
- Animazioni: un solo IntersectionObserver (`RevealObserver`) + transizioni CSS;
  attributo `data-reveal` sugli elementi. Rispetta `prefers-reduced-motion` e
  non nasconde nulla se JavaScript non è attivo.
- Intro del logo: animazione CSS sull'header, una volta per sessione, non bloccante.
