# Guide pages

A guide page is one comparison article. The reader opens it from the header, a hub card, the hub body, or the footer, and the page heading is the decision for that cord question. The card title and the `h1` are different strings.

## Sub-features

- `guide-nav` opens each guide that has a header link.
- `guide-card` opens every guide from the hub card title.
- `guide-identity` shows that guide's `h1` and `CordGauge Guide`.
- `guide-body` opens the three short links in the hub's decision cards.

## How to get to it (user POV)

Header `Primary`:

- `Master chart` → `/extension-cord-gauge-chart`
- `12 vs 14` → `/12-vs-14-gauge-extension-cord`
- `15 A saws` → `/best-extension-cord-for-circular-saw`
- `Long runs` → `/100-foot-extension-cord-gauge`
- `Outdoor` → `/outdoor-extension-cord-gauge-sjtw`

Hub body, not the same strings as the header:

- `Full gauge × amps × length chart` → `/extension-cord-gauge-chart`
- `12 vs 14 gauge` → `/12-vs-14-gauge-extension-cord`
- `outdoor / SJTW` → `/outdoor-extension-cord-gauge-sjtw`
- `100-foot gauge guide` → `/100-foot-extension-cord-gauge`

Hub cards and the footer, using `guides[].title`:

- `Extension cord gauge chart` → `/extension-cord-gauge-chart` — `h1` `Extension cord gauge by amps and length`
- `12 vs 14 gauge extension cord` → `/12-vs-14-gauge-extension-cord` — `h1` `When 12 AWG beats 14 AWG`
- `10 vs 12 gauge extension cord` → `/10-vs-12-gauge-extension-cord` — `h1` `When 10 AWG beats 12 AWG`
- `Best extension cord for a circular saw` → `/best-extension-cord-for-circular-saw` — `h1` `Extension cord sizing for a 15 A circular saw`
- `Best extension cord for a table saw` → `/best-extension-cord-for-table-saw` — `h1` `Extension cord sizing for a 15 A table saw`
- `Best extension cord for an air compressor` → `/best-extension-cord-for-air-compressor` — `h1` `Extension cord sizing for a 15 A air compressor`
- `Best extension cord for a pressure washer` → `/best-extension-cord-for-pressure-washer` — `h1` `Extension cord sizing for a 15 A pressure washer`
- `100-foot extension cord gauge` → `/100-foot-extension-cord-gauge` — `h1` `What gauge for a 100-foot extension cord`
- `Can you daisy-chain extension cords?` → `/daisy-chain-extension-cords` — `h1` `Can you daisy-chain extension cords?`
- `Outdoor extension cord gauge and SJTW` → `/outdoor-extension-cord-gauge-sjtw` — `h1` `SJTW is the jacket. AWG is still the wire.`

`10 vs 12`, the table saw, the air compressor, the pressure washer, and the daisy-chain page are not in the header. Their hub card is an entry. The calculator page is covered by `gauge-calculator.md`, not here.

## Driving it with cord-gauge

Preconditions:

- CordGauge is healthy at `http://127.0.0.1:4321`.
- `cord-gauge doctor` reports the hub `h1` and this run's pid.
- Evidence directory: `.cursor/skills/verify-cord-gauge/evidence/guide-pages/<slug>` using the path slug.

- **Header 12 vs 14.** Choose `12 vs 14`. Run `cord-gauge follow --from / --name "12 vs 14" --expect "When 12 AWG beats 14 AWG"`. The href is `/12-vs-14-gauge-extension-cord` and the `h1` is `When 12 AWG beats 14 AWG`.
- **Hub sentence.** Choose `12 vs 14 gauge` in the hub body. Run `cord-gauge follow --from / --name "12 vs 14 gauge" --expect "When 12 AWG beats 14 AWG"`. Same path and `h1`.
- **Hub card.** Choose `12 vs 14 gauge extension cord`. Run `cord-gauge follow --from / --name "12 vs 14 gauge extension cord" --expect "When 12 AWG beats 14 AWG"`. The command prints `matches:` greater than 1 when the footer repeats the title, and the href is still that one path.
- **Repeat the card pattern** for every other title in the list above. Replace `--name` with the card title and `--expect` with that row's `h1`. Do not mark a row passed because a different row was opened.
- **Header shortcuts.** `Master chart`, `15 A saws`, `Long runs`, and `Outdoor` use the header names in the entry list, not the card titles. Example: `cord-gauge follow --from / --name "15 A saws" --expect "Extension cord sizing for a 15 A circular saw"`.
- **Hub body shortcuts.** Example: `cord-gauge follow --from / --name "100-foot gauge guide" --expect "What gauge for a 100-foot extension cord"`.
- **Proof.** For the entry you drove, run `cord-gauge snapshot <path> --dir .cursor/skills/verify-cord-gauge/evidence/guide-pages/<slug> --screenshot --feature guide-pages` and save the `follow` stdout beside it. `PROOF.txt` names `guide-pages` and the entry name.

## Gotchas

- Card title, header label, hub-body label, and `h1` are four different strings on the 12 vs 14 page. Expect the `h1` from the table, and pass the link's own accessible name to `--name`.
- `follow` fails when one accessible name points at two different paths. Card and footer titles currently share a path. If they ever diverge, the command fails and that entry is not passed.
- Related links at the bottom of a guide are another entry only when you start from that guide. Opening them does not cover the hub card.
- Do not follow Amazon names (`View … on Amazon`) from a guide. The article `h1` is the proof, not a product page.
- Unknown URLs render `That run is not on the reel`, not a guide `h1`. A 404 is not a substitute for a missing guide.
- There is no breadcrumb and no on-page TOC. Do not wait for those handles.
