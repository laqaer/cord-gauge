# Owner enablement brief

One-time list from the 2026-09-26 capability audit. Nothing here is a request to approve ordinary product work. Do not send passwords, API keys, or card numbers in chat.

## Needed to collect payment

### Amazon Associates visibility for tag `laqaer-20`

- Missing: proof that `https://www.cordgaugeguide.com` is an approved Associates site, and any earnings or payout record. The tag is already printed on live links. A mailbox search found no Associates mail.
- Blocks: a verified profit number and confirmation that a real purchase would pay Laqaer Products. It does not block leaving the tagged links up.
- Owner action: in the Associates account that owns tracking ID `laqaer-20`, confirm this site is approved and the payout destination is the owner’s bank. Optional: forward the earnings emails to a mailbox this operator can read. Do not paste credentials.
- Verify: an earnings or payment page shows this site, even at $0. This operator can then reconcile `LEDGER.md` from that report.
- Cost: $0. Required for verified profit. Fallback without it: keep the links, label profit unverified.

Stripe is not the payment rail for this offer. It was not authenticated and is not requested.

## Needed for unattended operation

### Vercel team access, only if Git deploys stop

- Missing: this session’s Vercel token can see project `cord-gauge` (`prj_VqJ8pqNy4eILNnR6RWBxvL3FP5CV`) but cannot act as team `laqaers-projects` (`team_iqR4NlUL0GDmg2ea1f5JflsB`). `get_project` returned 403.
- Blocks: deployment management, domain changes, and env vars from this agent. It does not by itself block the existing Git integration.
- Owner action, only if `main` does not publish after a merge: re-authenticate Vercel for team `laqaers-projects`, scoped to project `cord-gauge`.
- Verify: a production deployment id changes when `main` changes, and `https://www.cordgaugeguide.com` serves the new calculator URL.
- Cost: the current Hobby plan. Do not upgrade. Required only if auto-deploy fails. Fallback: production stays on the current Vercel deployment.

### A mailbox that can send as the site

- Missing: no verified send-as for `hello@cordgaugeguide.com`. The connected Gmail store is not identified here as that address, and it had no CordGauge mail.
- Blocks: a daily email summary and customer replies from the published address.
- Owner action: confirm one mailbox this operator may use for CordGauge support, or add `hello@cordgaugeguide.com` as a send-as on the connected Google account through Google’s own flow.
- Verify: a test draft addressed to the owner, not a customer, shows the site address in From.
- Cost: $0. Optional relative to the status page below. Fallback: Cloudflare status URL plus GitHub’s notification when the production-health workflow fails. No customer email will be sent until this is done.

The worker and the GitHub schedule are things this operator can deploy without new credentials. They are not listed as owner tasks unless that deploy fails.

## Optional acceleration

### Search Console or Bing Webmaster

- Missing: no property verification for the domain.
- Blocks: reliable index coverage and query data. IndexNow still works without it.
- Owner action: add `https://www.cordgaugeguide.com` and use HTML-file verification. Send only the verification filename. This operator will add that file in a normal pull request.
- Cost: $0. Optional. Fallback: IndexNow and public site queries.

### OpenSEO credits

- Balance observed: 0. Do not buy credits. Fallback: public product and search pages.

### Cloudflare DNS

- `cordgaugeguide.com` is not a zone in Cloudflare account Laqaer Products (`de80edcd32893f7153e5b793ad8317f9`). Nameservers are Vercel. Leave them there.

## Spending authorization

No discretionary spending limit was found in the repo, Vercel billing notes, or this conversation. New discretionary spend is $0. That includes ads, OpenSEO credits, Vercel plan changes, and Cloudflare paid add-ons.

Recommended cap: keep $0 until an Associates report shows collected commission. This recommendation is not approval to spend later.
