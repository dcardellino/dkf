# DKF-Bikes – Landingpage

One-Pager für DKF-Bikes (Dietmar Klittich Fahrzeuge), KFZ-Meisterbetrieb für Motorrad und PKW in Herrenberg.

- **Stack:** Next.js (App Router, statischer Export), React, TypeScript, Tailwind CSS v4, lucide-react
- **Marktanalyse & USP:** [`docs/marktanalyse.md`](docs/marktanalyse.md)

## Entwicklung

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run format       # Prettier (inkl. Tailwind-Klassensortierung)
npm run build        # statischer Export nach out/
npm start            # out/ lokal ausliefern
```

`out/` kann auf jedem statischen Hosting deployed werden (Vercel, Netlify, Hostinger, …).

## Struktur

| Pfad                                       | Inhalt                                                                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/site.ts`                      | **Alle Texte, Kontaktdaten, Leistungen, Preise, FAQ, Bilder** – zentrale Stelle für Inhaltsänderungen                            |
| `src/components/InquiryButton.tsx`         | Wiederverwendbarer „Anfrage stellen“-Button                                                                                      |
| `src/components/sections/*`                | Eine Datei pro Sektion (Header, Hero, Leistungen, Spezialgebiete, Projekte, Preise, Ablauf, Über uns, FAQ, CTA, Kontakt, Footer) |
| `src/app/impressum`, `src/app/datenschutz` | Rechtliche Seiten (Platzhalter, vor Livegang prüfen)                                                                             |
| `scripts/optimize-images.mjs`              | Wandelt die Originalfotos von dkf-bikes.com in WebP um                                                                           |
| `public/images/`                           | Optimierte Bilder und Logo                                                                                                       |

## Anfrage-Funnel (`/anfrage/`)

Alle Anfrage-Buttons (`data-cta="inquiry"`) lesen ihr Ziel aus `inquiryHref` in `src/content/site.ts` und führen in den mehrstufigen Funnel: Fahrzeug → Anliegen → Details → Kontakt → Bestätigung. Mit `?anliegen=<concern>` (z. B. `umbau`) wird ein Anliegen vorausgewählt (`<InquiryButton concern="umbau" />`).

**Speicherung (Prototyp):** Anfragen werden im **Local Storage des Besucher-Browsers** gespeichert (`src/lib/inquiries/store.ts`, Key `dkf.inquiries.v1`). Das heißt: Der Admin-Bereich zeigt nur Anfragen, die im selben Browser abgeschickt wurden – echte Kundenanfragen erreichen den Betrieb so **nicht**. Für den Livebetrieb ein Backend-Adapter (z. B. Supabase) implementieren, der das `InquiryStore`-Interface erfüllt, und ihn als `inquiryStore` exportieren.

## Admin (`/admin/`)

Liste, Filter, Suche, Detailansicht, Status (Neu / In Bearbeitung / Erledigt), Löschen und CSV-Export (Excel-kompatibel).

Das Passwort wird als SHA-256-Hash über `NEXT_PUBLIC_ADMIN_PASSWORD_HASH` gesetzt (siehe `.env.example`), lokal in `.env.local`, auf Vercel als Environment Variable (Build neu auslösen):

```bash
node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1]).digest('hex'))" 'dein-passwort'
```

> **Kein echter Zugriffsschutz:** Der Login wird nur im Browser geprüft, der Hash ist im ausgelieferten JavaScript enthalten. Das ist für den Local-Storage-Prototyp ausreichend (die Daten liegen ohnehin nur lokal), muss aber mit dem Backend durch serverseitige Authentifizierung (z. B. Supabase Auth) ersetzt werden.

## Offene Inhalte

Im Code mit `TODO(content)` markiert (`grep -rn "TODO(content)" src`):

- Preise und Öffnungszeiten bestätigen (von der alten Seite übernommen)
- E-Mail-Domain (`@dkf-weltweit.de`) prüfen
- FAQ-Antworten und Mehrwertsteuer-Hinweis freigeben
- Teamfoto ergänzen
- Impressum und Datenschutzerklärung rechtlich prüfen bzw. vervollständigen
