# Beatrice Komba – CV-website

Interactieve persoonlijke CV-website (React + TypeScript + Tailwind CSS + Framer Motion, gebouwd met Vite).

## Starten

```bash
npm install
npm run dev          # lokale ontwikkelserver
npm run build        # productiebuild in dist/
npm run build:single # één zelfstandig HTML-bestand in dist-single/
```

## Gegevens aanpassen

Alle inhoud staat in `src/data/profile.ts`. Deze velden zijn nog leeg en tonen nu een zichtbare placeholder:

- `email` – e-mailadres voor de contactsectie
- `cvPdf` – pad naar het cv, bijv. `/cv-beatrice-komba.pdf` (zet het bestand in `public/`)
- `about` – persoonlijke introductie (sectie "Over mij")
- `motivation` – motivatie voor sociaal werk
- `description` per werkervaring – taakomschrijving

De portretfoto staat in `src/assets/beatrice-komba.webp`.
