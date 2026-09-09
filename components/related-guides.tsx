import Link from "next/link";
import { guides } from "@/lib/guides";

type RelatedGuidesProps = {
  except?: string;
};

export function RelatedGuides({ except }: RelatedGuidesProps) {
  const items = guides.filter((guide) => guide.href !== except);

  return (
    <section className="mt-14 border-t border-rule pt-8">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Related CordGauge guides</h2>
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
            <p className="mt-2 text-sm leading-6 text-ink-soft">{guide.dek}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
