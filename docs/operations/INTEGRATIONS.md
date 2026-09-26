# Integration inventory

No secret values belong in this file.

| System | What works | Scope | Not available |
| --- | --- | --- | --- |
| GitHub `laqaer/cord-gauge` | Push, Actions, public repo. Rulesets list was empty. Branch-protection API returned 403 | This repository | Admin view of branch protection |
| Vercel project `cord-gauge` | Live site on Hobby. User `laqaer-7370` / `laqaer@pm.me` | Project id `prj_VqJ8pqNy4eILNnR6RWBxvL3FP5CV` | Team `laqaers-projects` API calls (403) |
| Cloudflare Laqaer Products | Account `de80edcd32893f7153e5b793ad8317f9`, workers subdomain `laqaer-products` | Workers and KV for `cord-gauge-ops` | Zone for `cordgaugeguide.com` |
| Amazon Associates | Tag `laqaer-20` on site links | Public product pages only | Earnings, payout, site-approval status |
| Gmail | Connected mailbox, no CordGauge threads found | Do not use it for customer mail until send-as is confirmed | `hello@cordgaugeguide.com` send-as |
| IndexNow | Key file live at `/8601e4edc7ea47dc85f95937f927d93f.txt` | Submit sitemap after deploy | — |
| Stripe | Not authenticated | Not used | Do not connect for this offer |
| OpenSEO | Account connected, 0 credits | Not used | Paid research |
| `laqaer/agent-prompts` | Inspected at `d12e36d0da3bbab36369b05816ba3c7bc03e288d` | Shared procedures. Not installed as a kit in this repo | — |
| `laqaer/junction`, `laqaer/forge` | Repositories exist | Not required to sell the cord decision. Not wired into this site | — |

## Stop switches

- GitHub: disable the `Production health` workflow.
- Cloudflare: delete worker `cord-gauge-ops` or its cron trigger in the Laqaer Products account.
- Vercel: the existing project dashboard for `cord-gauge`.
- Shop links: remove the ASIN from `lib/affiliates.ts` and deploy.

## Click counter

`POST https://cord-gauge-ops.laqaer-products.workers.dev/click` with a text body `{"path":"/...","asin":"B00004SQF4"}`.

`GET https://cord-gauge-ops.laqaer-products.workers.dev/status` is the owner-visible daily snapshot: last health result and today’s click totals. It is not a profit report.
