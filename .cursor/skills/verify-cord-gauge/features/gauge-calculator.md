# Gauge calculator

The gauge calculator lets a reader set nameplate amps and run length and read a copper planning AWG pick on the page. Changing the selects updates the shop pick. Nothing is saved, and the Amazon links under the result are not part of the calculation.

## Sub-features

- `calc-open` reaches the form from the header, the hub, and the guide card.
- `calc-default` shows 15 A, 50 ft, and shop pick 12 AWG before a change.
- `calc-change` sets 15 A and 100 ft and shows shop pick 10 AWG.
- `calc-chart` finds the same form on the master chart.

## How to get to it (user POV)

- On `/`, use the form under the heading Gauge calculator.
- Choose header `Calculator`, which opens `/extension-cord-gauge-calculator`.
- Choose the guide card or footer link `Extension cord gauge calculator`.
- Choose header `Master chart`, which opens `/extension-cord-gauge-chart`. That page has the same form.
- Choose the guide card or footer link `Extension cord gauge chart`.

## Driving it with cord-gauge

Preconditions:

- CordGauge is healthy at `http://127.0.0.1:4321`.
- `cord-gauge doctor` reports the hub `h1` and this run's pid.
- Chrome is available (`/usr/local/bin/google-chrome` or `CORDGAUGE_CHROME`). Node provides a global `WebSocket` (Node 22).
- Evidence directory: `.cursor/skills/verify-cord-gauge/evidence/gauge-calculator`.

- **Header entry.** Choose `Calculator`. Run `cord-gauge follow --from / --name "Calculator" --expect "Extension cord gauge from amps and length" --expect "Gauge calculator"`. Status is 200 and the `h1` is `Extension cord gauge from amps and length`.
- **Default, before a change.** The arrived form shows shop pick 12 AWG for 15 A and 50 ft, including `12 AWG drop at 15 A · 50 ft: 2.9 V (2.4%)`. `pick` records this as `before.txt`.
- **Change the run to 100 ft.** Leave nameplate amps at 15 and set run length to 100. Run `cord-gauge pick --path /extension-cord-gauge-calculator --amps 15 --length 100 --feature gauge-calculator --expect "Shop pick: 10 AWG" --expect "10 AWG drop at 15 A · 100 ft: 3.6 V (3.0%)" --dir .cursor/skills/verify-cord-gauge/evidence/gauge-calculator`. The form text changes from the 12 AWG / 50 ft reading to `Shop pick: 10 AWG`. `requests.txt` has no `amazon.com`, `cordgaugeguide.com`, or `workers.dev` host.
- **Guide-card entry.** From the hub, choose `Extension cord gauge calculator`. Run `cord-gauge follow --from / --name "Extension cord gauge calculator" --expect "Extension cord gauge from amps and length"`. The href is `/extension-cord-gauge-calculator`.
- **Chart entry.** Choose `Master chart`. Run `cord-gauge follow --from / --name "Master chart" --expect "Extension cord gauge by amps and length"`. Then run `cord-gauge pick --path /extension-cord-gauge-chart --amps 15 --length 100 --feature gauge-calculator --expect "Shop pick: 10 AWG" --expect "10 AWG drop at 15 A · 100 ft: 3.6 V (3.0%)" --dir .cursor/skills/verify-cord-gauge/evidence/gauge-calculator-chart`. The chart `h1` stays `Extension cord gauge by amps and length` and the form shows 10 AWG.
- **Hub form.** On `/`, run `cord-gauge pick --path / --amps 15 --length 100 --feature gauge-calculator --expect "Shop pick: 10 AWG" --dir .cursor/skills/verify-cord-gauge/evidence/gauge-calculator-hub`. The hub `h1` stays the front-page heading.
- **Proof.** Save the header `follow` stdout beside `before.txt`, `after.txt`, `action.txt`, `requests.txt`, and the screenshots. `PROOF.txt` names `gauge-calculator` and the entry point that was actually driven.

## Gotchas

- A `get` of the calculator page shows only the default 15 A / 50 ft / 12 AWG result. That is not `calc-change`.
- The selects are `Nameplate amps` (`10`, `13`, `15`) and `Run length, outlet to tool` (`25`, `50`, `100`). Other numbers are not in the control. If a journey needs a value the control does not offer, report that failure in this section rather than typing into a different widget.
- Shop picks the form shows: 10 A at 25 ft → 16 AWG; 10 A at 50 ft → 14 AWG; 10 A at 100 ft → 12 AWG; 13 A at 25 ft → 14 AWG; 13 A at 50 ft → 12 AWG; 13 A at 100 ft → 10 AWG; 15 A at 25 ft → 12 AWG; 15 A at 50 ft → 12 AWG; 15 A at 100 ft → 10 AWG. Assert the on-page shop pick, not a hand-written voltage.
- 15 A at 100 ft is 10 AWG. The page may still link a 12 AWG cord and say it is not that pick. Do not treat the Amazon link as the result, and do not follow it.
- Reloading the page restores 15 A and 50 ft. There is no saved calculation to reopen.
- `pick` fails closed when Chrome or `WebSocket` is missing. Do not substitute `node --test lib/planning.test.ts` and call the page verified.
- One entry (header, card, chart, or hub) does not cover the others. Say which entry `PROOF.txt` used.
