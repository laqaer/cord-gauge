# CordGauge Guide verification map

This directory is the maintained source for verifying the reader-facing behavior of CordGauge Guide. Read the index before driving the site, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch CordGauge at `http://127.0.0.1:4321` with `helpers/cord-gauge launch` after `npm install`.
- Leave `CORDGAUGE_PORT` at `4321` unless a second instance is required. The second port is `4322`, not `3000`.
- `cord-gauge doctor` must report the hub `h1` and this checkout's launch pid before any drive.
- Never drive an instance that was not started by this verification run. Port `3000` is refused.
- No login, no seed, and no fixture rows. The calculator's initial state is 15 A and 50 ft.

## Driving conventions

- Start every recipe from the hub unless its preconditions say otherwise.
- Prefer accessible names and route paths over CSS selectors or screen coordinates.
- Treat every command as literal. Keep quoted names and flags unchanged.
- Run browser and HTTP actions through `helpers/cord-gauge`.
- `follow` is the reader path for a link. `get` alone does not cover an entry point the map names.
- `pick` is the reader path for the gauge calculator. The default HTML is not that path.
- Do not remove proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- Navigation proof includes `follow` stdout plus the destination snapshot (`*.txt`, `*.html`, `*.meta.json`, and `*.png` when Chrome is available).
- Calculator proof includes the select change, the form text before and after, and `requests.txt`.
- SEO proof includes the saved `robots.txt`, `sitemap.xml`, and `ads.txt` bodies.
- Record the feature ID and entry point used with every artifact (`--feature` and `PROOF.txt`).
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with cord-gauge` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Home hub](./home-hub.md) covers the front page identity, the how-to-pick steps, the default calculator reading, and the guide index.
- [Gauge calculator](./gauge-calculator.md) covers opening the form and changing amps and length so the shop pick updates.
- [Guide pages](./guide-pages.md) covers opening each comparison guide from the hub and reading its `h1`.
- [About and privacy](./about-privacy.md) covers the editorial standards page and the privacy policy.
- [SEO surfaces](./seo-surfaces.md) covers robots.txt, sitemap.xml, and ads.txt as a crawler would fetch them from the local instance.
