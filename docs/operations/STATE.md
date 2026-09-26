# CordGauge operating state

Updated: 2026-09-26. Repository `laqaer/cord-gauge`. Mandate run `bc-cbd83719-bb79-44c6-80b9-44f6aba8dcff`.

## Offer

Free extension-cord gauge decision for US shop and DIY buyers who are about to buy a cord for a 120 V tool. The paid outcome is an Amazon Associates commission (tag `laqaer-20`) when they buy a cord we linked. CordGauge does not charge the reader and does not take card payments.

Buyer: someone with a nameplate amp rating and a run length, usually a 15 A saw, compressor, or washer.

Why this offer: the site, domain, and affiliate tag already exist. A second checkout would need a merchant account this project does not have.

## What was true before this mandate

- Production: `https://www.cordgaugeguide.com` on Vercel. Apex 308-redirects to www. DNS nameservers are `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- Stack: Next.js 16 static export. Editorial guides, copper voltage-drop chart, Amazon links, IndexNow key file live.
- A web search for `site:cordgaugeguide.com` on 2026-09-26 returned no results.
- No open GitHub issues. No revenue, order, or analytics records in the repo.
- Gmail connected to this agent had no messages matching Amazon Associates, CordGauge, or `laqaer-20`.

## What changed

- Shop links are limited to two listings checked on 2026-09-26 as in stock and correctly labeled: Southwire 12/3 SJTW 50 ft `B00004SQF4` and 100 ft `B00004SQF5`.
- Three previous ASINs were removed because the live Amazon pages were unavailable or not the cord the label described.
- Tool guides that had no product link now have one. A 10 AWG recommendation does not pretend a 12 AWG cord is that pick.
- `/extension-cord-gauge-calculator` computes the existing chart pick and shows the matching link.
- The site is written to send click counts (page path and ASIN only) to Cloudflare worker `cord-gauge-ops`. The worker source is `ops/cord-gauge-ops.js`. Treat the worker as deployed only after `/status` answers.
- Daily public health check is `.github/workflows/production-health.yml`. Treat the schedule as unattended only after a run that this session did not start by hand.

## Current limits

- New discretionary spend: $0. No owner budget document was found.
- Profit is unverified until an Associates report is visible. See `LEDGER.md`.
- Vercel API access to team `laqaers-projects` returned 403. Production updates depend on the existing GitHub integration.
- This file does not claim the worker cron or the GitHub schedule has already fired. Those checks are recorded after they happen.

## Verified on 2026-09-26

- Pull request #10 merged as `3100aaa`. Vercel published `/extension-cord-gauge-calculator` and the Southwire ASINs. The first request after merge was still 404; the next check was 200.
- `node scripts/health-check.mjs` passed against production after the robots.txt check was narrowed to the IndexNow key file.
- IndexNow accepted 14 URLs with HTTP 200. See experiment 001.

## Unattended runtime

- Worker `cord-gauge-ops` is deployed on `https://cord-gauge-ops.laqaer-products.workers.dev`.
- A scheduled run wrote `health:scheduled` at 2026-09-26T04:59:11Z with `ok: true`. That write was not an HTTP `/health` call. The manual check before it was 2026-09-26T04:56:58Z.
- After that proof, the cron was changed from every minute to `15 13 * * *` so it does not keep fetching the site.
- Click counter accepted two synthetic posts to `/ops-self-test` and rejected a bad ASIN. Those two clicks are not customers.
- GitHub `Production health` is on `main` at the same daily time. `workflow_dispatch` returned 403 for this token, so that schedule has not been observed yet. The worker cron is the run that was actually seen.
- Stop switches are in `INTEGRATIONS.md`. Status JSON is `GET /status` on the worker.

## Next action

Leave experiment 001 alone until 2026-10-10 unless a linked ASIN goes unavailable. Read `/status` for health. Do not add tool pages on a zero-click result. Profit stays unverified until an Associates report exists.
