---
name: verify-cord-gauge
description: Drive the CordGauge Guide web site (extension-cord AWG × amps × length pages) locally and prove content, navigation, the gauge calculator, and SEO surfaces the way a reader or crawler would. Use when verifying the homepage, the gauge calculator, a comparison guide, About, Privacy, sitemap/robots/ads.txt, or after editorial or route changes.
---

# Verify CordGauge Guide

CordGauge Guide (www.cordgaugeguide.com) is a static editorial Next.js App Router site. A reader picks extension-cord gauge from nameplate amps and run length, and follows guide links. There is no account, search box, or checkout. Drive the **local** instance this run started. Do not request production, do not follow Amazon or the click beacon, and do not invent traffic or review scores.

Read `features/README.md`, then the feature file you are proving. One convenient deep-link is not coverage when the map lists other entry points.

## Interview (what this skill is built on)

- **Surface:** browser web UI. Secondary crawler files: `/robots.txt`, `/sitemap.xml`, `/ads.txt`. The gauge calculator is a client form on the hub, the calculator guide, and the master chart. There is no CLI a reader uses.
- **Run:** `npm install` then `npm run dev` (`next dev`). README local setup. No app env vars. Node 20+ (CI uses 22). `next.config.ts` sets `output: "export"`. `npm run build` writes `out/`. `next start` does **not** serve that export: Next.js exits with `"next start" does not work with "output: export"`. This skill does not invent a second static server.
- **Drive:** no Playwright, Cypress, or expect harness in the repo. Use `helpers/cord-gauge` (HTTP of real routes, named-link follow, Chrome for screenshots and for changing the calculator `<select>`s). Follow named links. Do not only GET the destination when the map names an entry link.
- **Observe:** status, `<title>`, `h1`, nav link names, JSON-LD top-level `@type`, sitemap locs, screenshots, form text before and after a select change, request hosts during `pick`.
- **Isolate:** bind `127.0.0.1:4321` by default. Two runs need two `CORDGAUGE_PORT` values. No database and no auth. **Port 3000 is refused** even when nothing is listening. `next dev` defaults to `0.0.0.0:3000`, which is a human `npm run dev`. Never attach to a listener this run did not start. Refusing a shared or foreign instance beats driving someone else's server.

## Launch

From the repo root, after `npm install`:

```bash
chmod +x .cursor/skills/verify-cord-gauge/helpers/cord-gauge
CORDGAUGE_PORT=4321 CORDGAUGE_HOST=127.0.0.1 \
  .cursor/skills/verify-cord-gauge/helpers/cord-gauge launch
```

The helper runs `next dev --hostname 127.0.0.1 --port 4321` with `BROWSER=none` and `NEXT_TELEMETRY_DISABLED=1`. It does not open a browser and does not send Next telemetry.

Ready when the helper prints `launched pid=… http://127.0.0.1:4321` and that process has already completed a `GET /` that is HTTP 200, `<title>` contains `CordGauge Guide`, and `h1` is `Pick an extension cord by amps, then length, then AWG`. A listening socket is not enough: the first compile must have produced the hub. The Next log is `/tmp/cord-gauge-verify-4321/next.log`. Instance metadata is `/tmp/cord-gauge-verify-4321/instance.json`.

There is no database, migration, or seed. An empty checkout plus `npm install` is the usable state.

`next dev` may create untracked `AGENTS.md` and `CLAUDE.md` at the repo root (Next's agent-rules files). Leave them untracked. A verification run does not commit them.

`CORDGAUGE_MODE=start` is refused. Do not point the helper at `https://www.cordgaugeguide.com`.

Teardown is `cord-gauge cleanup` (see Cleanup). Do not `pkill next`.

If `npm install` or launch fails, stop and report that blocker. Do not invent a different stack.

## Doctor

Read-only. Run this first whenever anything looks off:

```bash
CORDGAUGE_PORT=4321 CORDGAUGE_HOST=127.0.0.1 \
  .cursor/skills/verify-cord-gauge/helpers/cord-gauge doctor
```

Pass means all of:

- `/tmp/cord-gauge-verify-$PORT/instance.json` exists, `state` is `ready`, and its `pid` is alive
- that file's host, port, and `repoRoot` match this checkout and `CORDGAUGE_HOST` / `CORDGAUGE_PORT`
- the pid cmdline is this repo's `next dev` on that port
- `GET /` is 200
- `<title>` contains `CordGauge Guide`
- `h1` is `Pick an extension cord by amps, then length, then AWG`
- a listener on that port is visible, is in that launch pid's process tree, and is bound to loopback (`127.0.0.1`, optionally also `::1`)

If doctor fails, do not drive. Launch this run's instance, or stop. A page that looks like CordGauge on a port you did not start is a foreign instance.

`CORDGAUGE_PORT=3000` fails before any request.

## Drive

Harness: `helpers/cord-gauge`. Stable handles are **accessible names and routes**, not CSS or coordinates. `follow` matches the accessible name: `aria-label` when present, otherwise the link text, with whitespace collapsed. An exact name that points at two different local paths fails instead of picking one.

| Handle | What it is |
| --- | --- |
| Brand link `CordGauge Guide` | header logo/name → `/` |
| `nav` named `Primary` | `How to pick`, `Calculator`, `Master chart`, `12 vs 14`, `15 A saws`, `Long runs`, `Outdoor`, `About` |
| `How to pick` | header link → `/#how-to-pick` |
| `Calculator` | header link → `/extension-cord-gauge-calculator` |
| `Master chart` | header link → `/extension-cord-gauge-chart` |
| `12 vs 14` | header link → `/12-vs-14-gauge-extension-cord` |
| `15 A saws` | header link → `/best-extension-cord-for-circular-saw` |
| `Long runs` | header link → `/100-foot-extension-cord-gauge` |
| `Outdoor` | header link → `/outdoor-extension-cord-gauge-sjtw` |
| `About` | header link → `/about` |
| `Nameplate amps` | calculator `<select name="amps">` values `10`, `13`, `15` |
| `Run length, outlet to tool` | calculator `<select name="length">` values `25`, `50`, `100` |
| Guide cards under `Guides` | each `guides[].title` from `lib/guides.ts` |
| Footer `About & editorial standards` | → `/about` |
| Footer `Privacy` | → `/privacy` |
| Footer guide titles | the same `guides[].title` list |

There is no breadcrumb nav, no "On this page" TOC, and no mobile `<details>` menu. `Primary` is the only nav.

Routes a reader can open:

| Path | Identity `h1` |
| --- | --- |
| `/` | Pick an extension cord by amps, then length, then AWG |
| `/extension-cord-gauge-calculator` | Extension cord gauge from amps and length |
| `/extension-cord-gauge-chart` | Extension cord gauge by amps and length |
| `/12-vs-14-gauge-extension-cord` | When 12 AWG beats 14 AWG |
| `/10-vs-12-gauge-extension-cord` | When 10 AWG beats 12 AWG |
| `/best-extension-cord-for-circular-saw` | Extension cord sizing for a 15 A circular saw |
| `/best-extension-cord-for-table-saw` | Extension cord sizing for a 15 A table saw |
| `/best-extension-cord-for-air-compressor` | Extension cord sizing for a 15 A air compressor |
| `/best-extension-cord-for-pressure-washer` | Extension cord sizing for a 15 A pressure washer |
| `/100-foot-extension-cord-gauge` | What gauge for a 100-foot extension cord |
| `/daisy-chain-extension-cords` | Can you daisy-chain extension cords? |
| `/outdoor-extension-cord-gauge-sjtw` | SJTW is the jacket. AWG is still the wire. |
| `/about` | CordGauge Guide is a directory, not a cord brand |
| `/privacy` | Privacy policy |

Unknown paths render `That run is not on the reel` with link `Back to CordGauge Guide`.

Guide-card link text is `guides[].title` (for example `12 vs 14 gauge extension cord`). That is not the `h1`. The header label `12 vs 14` is a third name for the same route. Home body copy also links `12 vs 14 gauge`, `outdoor / SJTW`, and `100-foot gauge guide`.

Commands (always pass the same `CORDGAUGE_PORT` / `CORDGAUGE_HOST` as launch):

```bash
H=.cursor/skills/verify-cord-gauge/helpers/cord-gauge

$H get /
$H get / --expect "How to pick a cord" --expect "Gauge calculator" --expect "Guides"

$H follow --from / --name "Calculator" \
  --expect "Extension cord gauge from amps and length"

$H follow --from / --name "12 vs 14 gauge" \
  --expect "When 12 AWG beats 14 AWG"

$H pick --path /extension-cord-gauge-calculator --amps 15 --length 100 \
  --feature gauge-calculator \
  --expect "Shop pick: 10 AWG" \
  --expect "10 AWG drop at 15 A · 100 ft: 3.6 V (3.0%)" \
  --dir .cursor/skills/verify-cord-gauge/evidence/gauge-calculator

$H screenshot / --out .cursor/skills/verify-cord-gauge/evidence/home-hub/hub.png
$H snapshot / --dir .cursor/skills/verify-cord-gauge/evidence/home-hub --screenshot --feature home-hub
```

Every feature file repeats this pairing: user action → exact `cord-gauge` command → observable result.

## Evidence

Proof directory (never deleted by cleanup):

`.cursor/skills/verify-cord-gauge/evidence/<feature-id>/`

The helper rejects evidence paths outside that directory, and it rejects paths under `/tmp/cord-gauge-verify-*`, because cleanup deletes the run directory.

Minimum for a navigation feature:

- action: the `follow` stdout (source path, accessible name, href, match count) saved next to the destination snapshot
- result: snapshot of the arrived page (`*.txt` headings/nav/links, `*.html`, `*.meta.json`, `*.png` when Chrome is available)
- identity: visible `CordGauge Guide` plus the page `h1` from the table above

Minimum for the calculator:

- entry: `follow` from `/` via `Calculator` (or the other entry the feature file names)
- action: `pick` stdout and `action.txt` showing the select change
- before and after: `before.txt` / `before.png` and `after.txt` / `after.png`
- `requests.txt`: hosts contacted while the page was open. Fail if any host is `cordgaugeguide.com`, `amazon.com`, or `workers.dev`

Minimum for SEO files: `cord-gauge seo --dir .cursor/skills/verify-cord-gauge/evidence/seo-surfaces` and the saved bodies.

Standards:

- Exercise the real reader path (named link, or the labeled selects). A raw `get` of a guide is a skip of the entry point, not a pass. A `get` that shows the default `Shop pick: 12 AWG` does not prove the calculator control.
- Capture the action and the resulting page, not only the final screenshot.
- Confirm on-page side effects that exist: JSON-LD top-level `@type` (`WebSite` on every page via the root layout; `Article` on guides, including the calculator and the chart; `FAQPage` on the calculator and on `/12-vs-14-gauge-extension-cord`, `/10-vs-12-gauge-extension-cord`, `/extension-cord-gauge-chart`, `/best-extension-cord-for-circular-saw`, and `/best-extension-cord-for-table-saw`; `Organization` on About). Every other route keeps its current top-level types. Footer strings `Affiliate disclosure.` and `Electrical caveat.`. Canonical host `https://www.cordgaugeguide.com`. There is no `BreadcrumbList`.
- Local HTML includes Amazon `/dp/` hrefs with `tag=laqaer-20`. Seeing the href in the saved HTML is the side effect. Do not GET those URLs. `follow` refuses them. Clicking them in a browser fires `navigator.sendBeacon` to `https://cord-gauge-ops.laqaer-products.workers.dev/click`. `pick` must not activate them, and `requests.txt` must not contain that host.
- Do not mock Next. Do not hit retailer sites.
- Do not call this a dry-run of production. Local HTML still embeds production canonicals, sitemap locs, and JSON-LD URLs from `lib/site.ts`. That string is expected content. It is not proof that production was requested. `requests.txt` and the helper's refusal of external hrefs are how you check the network stayed local.
- The calculator does not write a file, row, or message. The observable side effect of changing a select is the new shop-pick text. Reloading restores 15 A and 50 ft.

Record the feature id and entry point on every artifact (`*.meta.json` stores `url`, `capturedAt`, and `featureId` when `--feature` is set; add a `PROOF.txt` naming the feature id, the entry point, and the commands used).

Chrome is `/usr/local/bin/google-chrome` or `CORDGAUGE_CHROME`. Screenshots use `--headless=new --no-sandbox` and a disposable `--user-data-dir` under `/tmp/cord-gauge-chrome-*`. If Chrome exits slowly after writing the PNG, the helper still accepts the file. If Chrome is missing, HTTP snapshots still prove navigation content; say the screenshot step was blocked. `pick` cannot be skipped that way: without Chrome, the calculator feature is blocked, not passed.

## Cleanup

```bash
CORDGAUGE_PORT=4321 CORDGAUGE_HOST=127.0.0.1 \
  .cursor/skills/verify-cord-gauge/helpers/cord-gauge cleanup
```

Kills only the pid in this run's `instance.json` when its cmdline is this repo's `next dev` on that port (process group, then a `next-server` child whose cwd is this repo and that is still listening on that port). Removes `/tmp/cord-gauge-verify-$PORT/` only after the port is free. Does **not** delete `.cursor/skills/verify-cord-gauge/evidence/`. After cleanup, confirm the evidence files still exist before reporting a pass.

If a drive fails, run cleanup before the next launch so port 4321 is not stranded. A failed launch kills the process it started. Cleanup with no `instance.json` does not kill a stranger that happens to be on the port.

## Helpers

`helpers/cord-gauge` is executable. Invocation is from the repo root with the env vars above. Relative `--dir` and `--out` paths are resolved from the repo root and must stay under `evidence/`.

| Command | Purpose |
| --- | --- |
| `cord-gauge launch` | Start `next dev` on `127.0.0.1:$CORDGAUGE_PORT` and wait until the hub `h1` is served |
| `cord-gauge doctor` | Read-only health + identity + ownership |
| `cord-gauge url` | Print `http://127.0.0.1:$PORT` |
| `cord-gauge get <path> [--expect text]...` | GET a path; print status/title/h1/JSON-LD; assert substrings in the raw body or the tag-stripped text |
| `cord-gauge follow --from <path> --name <text>` | Find that accessible name on the source page and GET its local href. Refuses external, `mailto:`, and `javascript:` links |
| `cord-gauge links <path>` | List accessible names and hrefs. External rows are marked `external` and are not requested |
| `cord-gauge snapshot <path> --dir <dir> [--screenshot] [--feature id]` | Save html/txt/meta (and optional png) |
| `cord-gauge screenshot <path> --out <file>` | Chrome headless 1280×900 png |
| `cord-gauge pick --path <path> --amps <n> --length <n> [--expect text]...` | Open the page in Chrome, change the two selects, and require the shop-pick text to update |
| `cord-gauge seo [--dir <dir>]` | Assert robots, sitemap locs, and ads.txt (comment-only, or one `google.com` DIRECT line if a pub id is already configured). Does not edit either |
| `cord-gauge cleanup` | Tear down this instance; keep evidence |

`pick` uses the global `WebSocket` (Node 22, the version in `.github/workflows/cloudflare-static-export.yml`). It sets the `<select>` values through the DOM and dispatches `input`/`change`. It retries until the form text changes, because hydration can reset a change that arrives too early. It does not call React state setters. If the text never changes, the command fails.

## Isolate and concurrency

- Default verification URL: `http://127.0.0.1:4321`
- Second instance: `CORDGAUGE_PORT=4322` (run dir becomes `/tmp/cord-gauge-verify-4322`)
- `CORDGAUGE_HOST` other than `127.0.0.1` is refused, so the server cannot bind `0.0.0.0`
- `CORDGAUGE_PORT=3000` is refused before launch, doctor, or any GET
- Launch fails if the port is already taken. It does not kill the occupant
- No seed data, no auth cookies, no writable content store
- A Bay Heat verification on `:4317` and a human `npm run dev` on `:3000` are other servers. Do not drive them

## Anti-jobs

Do not edit editorial copy, `ADSENSE_PUB_ID`, affiliate ASINs, or `lib/site.ts` as part of a verification run. Do not commit the `AGENTS.md` and `CLAUDE.md` files `next dev` drops at the repo root. Do not invent traffic, revenue, or review scores. Do not run `npm run indexnow`, `node scripts/indexnow.mjs`, or `node scripts/health-check.mjs` — those target `www.cordgaugeguide.com` (IndexNow also calls Bing/Yandex). Do not crawl or warm the production host. Do not send email or social posts. Do not follow Amazon Associates links. Local proof is enough.

## Maintenance

When routes, `h1`s, or calculator results change, update this skill and `features/` with `/maintain-verification-skill`. A proof that still types an old `h1` is a failed proof, not a reason to weaken the expect.
