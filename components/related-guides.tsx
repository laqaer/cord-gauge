import Link from "next/link";
import { guides, guidesByHref } from "@/lib/guides";

type RelatedGuidesProps = {
  except?: string;
  hrefs?: readonly string[];
  heading?: string;
  intro?: string;
  whyByHref?: Readonly<Record<string, string>>;
  compact?: boolean;
};

export function RelatedGuides({
  except,
  hrefs,
  heading = "Related CordGauge guides",
  intro,
  whyByHref,
  compact = false,
}: RelatedGuidesProps) {
  const items = (hrefs ? guidesByHref(hrefs) : guides).filter((guide) => guide.href !== except);

  if (compact) {
    return (
      <section className="mt-10 border border-rule bg-card px-4 py-4 sm:px-5">
        <h2 className="text-lg font-semibold tracking-tight text-ink">{heading}</h2>
        {intro ? <p className="mt-1 text-sm leading-6 text-ink-soft">{intro}</p> : null}
        <ul className="mt-2 divide-y divide-rule">
          {items.map((guide) => (
            <li key={guide.href} className="py-3">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-amp-dark">
                {guide.kicker}
              </p>
              <Link className="mt-1 block font-semibold text-ink hover:text-amp-dark" href={guide.href}>
                {guide.title}
              </Link>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{whyByHref?.[guide.href] ?? guide.dek}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="mt-14 border-t border-rule pt-8">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{heading}</h2>
      {intro ? <p className="mt-2 text-sm leading-6 text-ink-soft">{intro}</p> : null}
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((guide) => (
          <li key={guide.href} className="border border-rule bg-card p-4">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-amp-dark">
              {guide.kicker}
            </p>
            <Link
              className="mt-1 block text-xl font-semibold text-ink hover:text-amp-dark"
              href={guide.href}
            >
              {guide.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{whyByHref?.[guide.href] ?? guide.dek}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
