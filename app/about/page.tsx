import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ogImage, twitterWithImage } from "@/lib/metadata";
import { organizationJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "About CordGauge Guide";
const description =
  "CordGauge Guide is an independent extension-cord AWG directory from Laqaer Products. Editorial standards and contact.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "/about",
    images: [ogImage],
  },
  twitter: {
    ...twitterWithImage,
    title,
    description,
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd data={organizationJsonLd()} />
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-amp-dark">About</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        CordGauge Guide is a directory, not a cord brand
      </h1>
      <div className="prose-cord mt-8">
        <p>
          <strong>CordGauge Guide</strong> helps people pick portable-cord gauge by{" "}
          <strong>amps × run length × AWG</strong> so a 15 A shop tool is not hanging on a 16 AWG
          “outdoor” reel. We do not manufacture cords. We do not invent star ratings.
        </p>
        <p>
          The site is published by <strong>{site.publisher}</strong> at{" "}
          <a href={site.url}>{new URL(site.url).host}</a>. For corrections or a voltage-drop
          assumption we should label more clearly, write{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>Editorial standards</h2>
        <ul>
          <li>
            <strong>No fake scores.</strong> We will not rank cords 9.4 vs 8.7. Gauge, length,
            listing, and jacket type are the comparison.
          </li>
          <li>
            <strong>Planning math, labeled as planning math.</strong> Copper drop uses published
            NEC Chapter 9 Table 8 resistances. That is not a lab test of a named SKU.
          </li>
          <li>
            <strong>The mark on the cord wins.</strong> Ampacity is the listing and the plug, not
            AWG wishful thinking.
          </li>
          <li>
            <strong>Jacket ≠ gauge.</strong> SJTW is weather. It is not thicker copper.
          </li>
          <li>
            <strong>No other-brand bleed.</strong> This property is CordGauge Guide only — not a
            dumping ground for unrelated Laqaer consumer sites.
          </li>
        </ul>

        <h2>How the site is funded</h2>
        <p>
          Some product mentions may later become affiliate links. None are tagged yet; there are no
          retailer tracking IDs on this ship. If that changes, a purchase through those links may
          earn {site.publisher} a commission. Money does not buy a score here. See{" "}
          <Link href="/privacy">privacy</Link> for how a content-and-affiliate site handles data.
        </p>

        <h2>What we are not</h2>
        <p>
          Not an electrician, not a listing agency, not a substitute for the tool nameplate or the
          cord jacket print. If a cord is hot, cracked, or the tool bogs on a long run, stop
          stacking light-duty reels and size the copper — or hire a licensed electrician to put a
          receptacle closer to the work.
        </p>
      </div>
    </article>
  );
}
