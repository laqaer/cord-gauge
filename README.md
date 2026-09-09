# CordGauge Guide

Independent comparison directory for **extension cord gauge (AWG × amps × length)**. Helps shop and DIY users pick 12 AWG vs 14 AWG without treating the jacket color as a spec.

**Brand:** CordGauge Guide  
**Domain:** cordgaugeguide.com (intended; not wired yet)  
**Contact:** [hello@cordgaugeguide.com](mailto:hello@cordgaugeguide.com)  
**Publisher:** Laqaer Products

## Mogul factory Site #3

This repo is **Mogul factory Site #3** — the portable-cord / AWG vertical in the Laqaer Products comparison line.

Mogul ships small, useful buying-guide sites (circuit-honest electrical planning here: nameplate amps and run length win; “heavy duty” on a hang tag is not enough). Do not mix other Laqaer consumer brands into this codebase. No invented traffic, revenue, or fake review scores.

## Stack

- Next.js App Router (16) + TypeScript
- Tailwind CSS v4
- Static editorial pages, JSON-LD (`WebSite` on every page, `Article` on guides, `Organization` on About)
- Vercel-ready (`npm run build` / `npm run start`; no env vars required)

## Local setup

Requires Node.js 20+ (22 is fine).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy on Vercel

1. Import `laqaer/cord-gauge`.
2. Framework preset: **Next.js**. Leave build/output commands at defaults (`next build`).
3. No environment variables are required for the editorial site.
4. Production domain `cordgaugeguide.com` is the intended name and is **not purchased / not wired** in this ship.
5. Replace `public/ads.txt` and add real retailer links before serving ads or affiliate clicks.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Hub: amps → length → AWG; links every guide |
| `/extension-cord-gauge-chart` | Master gauge × amps × length chart |
| `/12-vs-14-gauge-extension-cord` | When 12 AWG beats 14 |
| `/best-extension-cord-for-circular-saw` | 15 A saw cord sizing |
| `/100-foot-extension-cord-gauge` | Long-run voltage drop |
| `/outdoor-extension-cord-gauge-sjtw` | Outdoor jacket / SJTW |
| `/about` | CordGauge / Laqaer Products, editorial standards, hello@cordgaugeguide.com |
| `/privacy` | Privacy policy for a content + affiliate site |
| `/robots.txt` | Generated |
| `/sitemap.xml` | Generated |
| `/ads.txt` | Placeholder seller file |

Affiliate disclosure and the electrical caveat appear in the footer on every page.

## Editorial rules

- No composite review scores.
- Voltage-drop figures are copper planning estimates (NEC Chapter 9, Table 8 resistances), not SKU lab tests.
- Ampacity is the marked cord and plug, not AWG alone.
- SJTW is a jacket rating, not a thicker wire.
- This is not electrical-code advice. Hire a licensed electrician for new circuits.
