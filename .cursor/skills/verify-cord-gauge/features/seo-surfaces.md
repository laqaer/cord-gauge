# SEO surfaces

Robots, the sitemap, and ads.txt are the files a crawler fetches from the site root. Verification fetches them from the local instance. The production hostnames inside those files are content from `lib/site.ts`, not URLs to request.

## Sub-features

- `seo-robots` serves a local robots file that allows `/` and names the www sitemap and host.
- `seo-sitemap` lists the hub, About, Privacy, and every guide on the www host.
- `seo-ads` serves the comment-only ads.txt placeholder unless a publisher id is already configured.

## How to get to it (user POV)

- Fetch `/robots.txt`.
- Fetch `/sitemap.xml`.
- Fetch `/ads.txt`.
- These are not linked from the header. A reader does not navigate to them through `follow`.

## Driving it with cord-gauge

Preconditions:

- CordGauge is healthy at `http://127.0.0.1:4321`.
- `cord-gauge doctor` reports the hub `h1` and this run's pid.
- Do not set `NEXT_PUBLIC_ADSENSE_PUB_ID` or edit `ADSENSE_PUB_ID` to force a seller line.
- Evidence directory: `.cursor/skills/verify-cord-gauge/evidence/seo-surfaces`.

- **Fetch the three files.** Run `cord-gauge seo --dir .cursor/skills/verify-cord-gauge/evidence/seo-surfaces`. The command exits 0 and prints `seo: pass`.
- **Robots.** The saved `robots.txt` contains `User-Agent: *`, `Allow: /`, `Sitemap: https://www.cordgaugeguide.com/sitemap.xml`, and `Host: www.cordgaugeguide.com`.
- **Sitemap.** The saved `sitemap.xml` locs are exactly `https://www.cordgaugeguide.com` plus that host plus each of `/about`, `/privacy`, `/extension-cord-gauge-calculator`, `/extension-cord-gauge-chart`, `/12-vs-14-gauge-extension-cord`, `/10-vs-12-gauge-extension-cord`, `/best-extension-cord-for-circular-saw`, `/best-extension-cord-for-table-saw`, `/best-extension-cord-for-air-compressor`, `/best-extension-cord-for-pressure-washer`, `/100-foot-extension-cord-gauge`, `/daisy-chain-extension-cords`, and `/outdoor-extension-cord-gauge-sjtw`. No extra locs.
- **Ads.** With no publisher id configured, `ads.txt` contains `# CordGauge Guide ads.txt placeholder` and does not contain `pub-`. If a publisher id is already configured in the environment, the body is one `google.com, pub-…, DIRECT, f08c47fec0942fa0` line. Either result is `seo: pass`. A body that still contains `pub-XXXXXXXXXXXXXXXX` fails.
- **Proof.** Leave the saved bodies and `seo.txt` in the evidence directory. `PROOF.txt` names `seo-surfaces` and the `cord-gauge seo` command. Do not add a screenshot requirement.

## Gotchas

- Sitemap and robots mention `www.cordgaugeguide.com`. Requesting those locs hits production. The pass is the local file body.
- Do not fill in an AdSense id so the seller line appears. Comment-only is the repo default and a valid pass.
- `cord-gauge seo` does not crawl the HTML pages. A sitemap pass is not a pass of `guide-pages`.
- `npm run indexnow` and `node scripts/health-check.mjs` are production tools. They are not this feature.
