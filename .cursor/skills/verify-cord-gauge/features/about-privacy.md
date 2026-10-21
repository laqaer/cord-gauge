# About and privacy

About explains who publishes CordGauge Guide and the editorial rules. Privacy explains what a content-and-affiliate directory handles. Neither page has an account, a form, or a cookie banner to accept.

## Sub-features

- `about-open` opens About from the header and from the footer.
- `about-standards` shows the editorial standards and the contact address.
- `privacy-open` opens Privacy from the footer and from the About page.
- `privacy-identity` shows the privacy heading and that the site has no user accounts.

## How to get to it (user POV)

- Choose header `About`.
- Choose footer `About & editorial standards`.
- On About, choose the `privacy` link in the funding section.
- Choose footer `Privacy`.
- The mailto link `hello@cordgaugeguide.com` is a contact address, not a page.

## Driving it with cord-gauge

Preconditions:

- CordGauge is healthy at `http://127.0.0.1:4321`.
- `cord-gauge doctor` reports the hub `h1` and this run's pid.
- Evidence directory: `.cursor/skills/verify-cord-gauge/evidence/about-privacy`.

- **Header About.** Choose `About`. Run `cord-gauge follow --from / --name "About" --expect "CordGauge Guide is a directory, not a cord brand" --expect "Editorial standards" --expect "hello@cordgaugeguide.com"`. Status is 200 and the `h1` is `CordGauge Guide is a directory, not a cord brand`.
- **Footer About.** Choose `About & editorial standards`. Run `cord-gauge follow --from / --name "About & editorial standards" --expect "CordGauge Guide is a directory, not a cord brand"`. The href is `/about`.
- **Privacy from About.** Choose `privacy` on the About page. Run `cord-gauge follow --from /about --name "privacy" --expect "Privacy policy" --expect "We do not run user accounts."`. The href is `/privacy` and the `h1` is `Privacy policy`.
- **Footer Privacy.** Choose `Privacy`. Run `cord-gauge follow --from / --name "Privacy" --expect "Privacy policy" --expect "We do not run user accounts."`. The href is `/privacy`.
- **Proof.** Run `cord-gauge snapshot /about --dir .cursor/skills/verify-cord-gauge/evidence/about-privacy --screenshot --feature about-privacy` and `cord-gauge snapshot /privacy --dir .cursor/skills/verify-cord-gauge/evidence/about-privacy --screenshot --feature about-privacy`. Save the `follow` stdout next to those files. About's JSON-LD types include `Organization`. Both pages include `WebSite`. The canonical host is `https://www.cordgaugeguide.com`.

## Gotchas

- Header `About` and footer `About & editorial standards` are different accessible names for `/about`. Passing one does not pass the other.
- `follow --name "hello@cordgaugeguide.com"` refuses the `mailto:` link. Do not send mail.
- About links the production host in the prose. `follow` refuses `https://www.cordgaugeguide.com`. Read the host in the saved HTML. Do not GET it.
- Privacy describes the Amazon click counter. Reading that sentence is not permission to click `View … on Amazon`.
- Footer `Affiliate disclosure.` and `Electrical caveat.` are on these pages because the footer is on every page. They are not a substitute for the About `h1`.
