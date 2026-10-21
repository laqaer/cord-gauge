# Verification evidence

Proof artifacts for `verify-cord-gauge` live in this directory, one subdirectory per feature id:

- `home-hub/`
- `gauge-calculator/`
- `gauge-calculator-chart/` and `gauge-calculator-hub/` when those entries are driven
- `guide-pages/<slug>/`
- `about-privacy/`
- `seo-surfaces/`

`helpers/cord-gauge cleanup` deletes `/tmp/cord-gauge-verify-$PORT/` and does not delete this tree. A cleanup that removes a proof is a failed cleanup.

Each proof needs `PROOF.txt` naming the feature id, the entry point, and the commands. Snapshots from the helper are `*.html`, `*.txt`, and `*.meta.json`. Calculator runs also keep `before.txt`, `after.txt`, `action.txt`, `requests.txt`, and screenshots when Chrome is available.

Do not point `--dir` or `--out` at `/tmp`. The helper rejects evidence paths outside this directory.
