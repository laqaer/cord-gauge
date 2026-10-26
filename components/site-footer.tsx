import Link from "next/link";
import { BrandMark } from "@/components/marks";
import { guides } from "@/lib/guides";
import { affiliateDisclosure, electricalCaveat, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div>
            <p className="site-footer-brand">
              <BrandMark />
              {site.name}
            </p>
            <p className="site-footer-tag">{site.tagline}</p>
            <p className="site-footer-meta">
              A {site.publisher} comparison site.{" "}
              <a href={site.url}>{new URL(site.url).host}</a>.
            </p>
          </div>
          <div>
            <h2>Guides</h2>
            <ul>
              {guides.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href}>{guide.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Site</h2>
            <ul>
              <li>
                <Link href="/about">About & editorial standards</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer-notes">
          <p>
            <strong>Affiliate disclosure. </strong>
            {affiliateDisclosure}
          </p>
          <p>
            <strong>Electrical caveat. </strong>
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
