import Link from "next/link";
import { guides } from "@/lib/guides";
import { affiliateDisclosure, electricalCaveat, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-rule bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold tracking-tight text-ink">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">{site.tagline}</p>
            <p className="mt-3 text-sm text-ink-soft">
              A {site.publisher} comparison site.{" "}
              <a className="text-steel hover:text-amp-dark" href={site.url}>
                {new URL(site.url).host}
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Guides</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {guides.map((guide) => (
                <li key={guide.href}>
                  <Link className="text-steel hover:text-amp-dark" href={guide.href}>
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Site</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-steel hover:text-amp-dark" href="/about">
                  About & editorial standards
                </Link>
              </li>
              <li>
                <Link className="text-steel hover:text-amp-dark" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <a className="text-steel hover:text-amp-dark" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-3 border-t border-rule pt-6 text-sm leading-6 text-ink-soft">
          <p>
            <strong className="text-ink">Affiliate disclosure. </strong>
            {affiliateDisclosure}
          </p>
          <p>
            <strong className="text-ink">Electrical caveat. </strong>
            {electricalCaveat}
          </p>
          <p>
            © {new Date().getFullYear()} {site.publisher}. CordGauge Guide is an independent
            directory. We do not manufacture cords.
          </p>
        </div>
      </div>
    </footer>
  );
}
