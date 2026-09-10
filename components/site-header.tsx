import Link from "next/link";
import { site } from "@/lib/site";

const primaryNav = [
  { href: "/extension-cord-gauge-chart", label: "Master chart" },
  { href: "/12-vs-14-gauge-extension-cord", label: "12 vs 14" },
  { href: "/best-extension-cord-for-circular-saw", label: "15 A saws" },
  { href: "/100-foot-extension-cord-gauge", label: "Long runs" },
  { href: "/outdoor-extension-cord-gauge-sjtw", label: "Outdoor" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          {site.shortName}
          <span className="ml-1.5 font-normal text-ink-soft">Guide</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
          <Link className="hover:text-amp-dark" href="/#how-to-pick">
            How to pick
          </Link>
          {primaryNav.map((item) => (
            <Link key={item.href} className="hover:text-amp-dark" href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="hover:text-amp-dark" href="/about">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
