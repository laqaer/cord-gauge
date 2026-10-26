import Link from "next/link";
import { BrandMark } from "@/components/marks";
import { site } from "@/lib/site";

const primaryNav = [
  { href: "/extension-cord-gauge-calculator", label: "Calculator" },
  { href: "/extension-cord-gauge-chart", label: "Master chart" },
  { href: "/12-vs-14-gauge-extension-cord", label: "12 vs 14" },
  { href: "/best-extension-cord-for-circular-saw", label: "15 A saws" },
  { href: "/100-foot-extension-cord-gauge", label: "Long runs" },
  { href: "/outdoor-extension-cord-gauge-sjtw", label: "Outdoor" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-bar">
        <Link href="/" className="brand">
          <BrandMark />
          {site.shortName} Guide
        </Link>
        <nav aria-label="Primary" className="site-nav">
          <Link href="/#how-to-pick">How to pick</Link>
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
