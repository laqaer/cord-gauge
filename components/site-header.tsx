import Link from "next/link";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

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
          {guides.slice(0, 3).map((guide) => (
            <Link key={guide.href} className="hover:text-amp-dark" href={guide.href}>
              {guide.kicker}
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
