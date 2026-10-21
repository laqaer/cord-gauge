# Home hub

The home hub is the CordGauge front page. A reader sees the amps-then-length-then-AWG decision, three pick steps, the gauge calculator's default result, a 15 A preview, and a card for every guide.

## Sub-features

- `home-identity` shows CordGauge Guide and the hub heading.
- `home-steps` shows the three how-to-pick steps from the header link.
- `home-default-pick` shows the calculator before any select is changed: 15 A, 50 ft, shop pick 12 AWG.
- `home-guides` lists every guide card under Guides.

## How to get to it (user POV)

- Open `/`.
- From any other page, choose the header brand link `CordGauge Guide`.
- There is no footer link back to the hub. The footer host link is the production site and is not an entry point.

## Driving it with cord-gauge

Preconditions:

- CordGauge is healthy at `http://127.0.0.1:4321`.
- `cord-gauge doctor` reports the hub `h1` and this run's pid.
- Evidence directory: `.cursor/skills/verify-cord-gauge/evidence/home-hub`.

- **Open the hub.** Request `/`. Run `cord-gauge get / --expect "Pick an extension cord by amps, then length, then AWG" --expect "How to pick a cord" --expect "Gauge calculator" --expect "Shop pick:" --expect "12 AWG" --expect "Guides" --expect "Affiliate disclosure." --expect "Electrical caveat."`. Status is 200, the `h1` is `Pick an extension cord by amps, then length, then AWG`, and `<title>` contains `CordGauge Guide`.
- **How to pick.** Choose `How to pick` in the header. Run `cord-gauge follow --from / --name "How to pick" --expect "Read the tool amps" --expect "Measure the run" --expect "Pick AWG for drop, then check the mark"`. The href contains `#how-to-pick` and the page still has the hub `h1`.
- **Brand returns home.** From About, choose `CordGauge Guide`. Run `cord-gauge follow --from /about --name "CordGauge Guide" --expect "Pick an extension cord by amps, then length, then AWG"`. The arrived `h1` is the hub heading.
- **Default calculator reading.** On the hub, read the form without changing it. The `get /` text includes `Shop pick:` and `12 AWG drop at 15 A · 50 ft: 2.9 V (2.4%)`. This is the untouched control, not a pass of `gauge-calculator`.
- **Proof.** Run `cord-gauge snapshot / --dir .cursor/skills/verify-cord-gauge/evidence/home-hub --screenshot --feature home-hub`. The snapshot names the hub `h1`, the `Primary` nav, and `CordGauge Guide`.

## Gotchas

- The header brand's accessible name is `CordGauge Guide` (the word CordGauge plus the word Guide). Matching only `CordGauge` fails.
- `Shop pick: 12 AWG` on a fresh load is the default for 15 A and 50 ft. It does not show that the selects work.
- The footer link whose href is `https://www.cordgaugeguide.com` is production. `follow` refuses it. Do not request that host.
- Guide cards and the footer repeat the same titles. `follow` uses the first match when every match has the same path, and fails when one name points at two paths.
- Amazon links on the hub use accessible names that start with `View ` and end with ` on Amazon`. Do not follow them.
