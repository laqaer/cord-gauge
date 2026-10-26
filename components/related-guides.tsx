import Link from "next/link";
import { BenchMark, markForKicker } from "@/components/marks";
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
      <section className="related related-compact motion-card reveal">
        <h2>{heading}</h2>
        {intro ? <p className="related-intro">{intro}</p> : null}
        <ul>
          {items.map((guide) => (
            <li key={guide.href}>
              <p className="kicker">{guide.kicker}</p>
              <Link href={guide.href}>{guide.title}</Link>
              <p>{whyByHref?.[guide.href] ?? guide.dek}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="related">
      <h2>{heading}</h2>
      {intro ? <p className="related-intro">{intro}</p> : null}
      <ul className="related-grid">
        {items.map((guide) => (
          <li key={guide.href} className="bench-card motion-card reveal related-card">
            <div className="mark-plate mark-plate-sm" aria-hidden="true">
              <BenchMark kind={markForKicker(guide.kicker)} />
            </div>
            <div>
              <p className="kicker">{guide.kicker}</p>
              <Link href={guide.href}>{guide.title}</Link>
              <p>{whyByHref?.[guide.href] ?? guide.dek}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
