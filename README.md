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

## Anfrage-Button

Alle Anfrage-Buttons (`data-cta="inquiry"`) lesen ihr Ziel aus `inquiryHref` in `src/content/site.ts`. Aktuell `'#'` – sobald das Anfrageformular steht, genügt es, diesen Wert anzupassen.

## Offene Inhalte

Im Code mit `TODO(content)` markiert (`grep -rn "TODO(content)" src`):

- Preise und Öffnungszeiten bestätigen (von der alten Seite übernommen)
- E-Mail-Domain (`@dkf-weltweit.de`) prüfen
- FAQ-Antworten und Mehrwertsteuer-Hinweis freigeben
- Teamfoto ergänzen
- Impressum und Datenschutzerklärung rechtlich prüfen bzw. vervollständigen
