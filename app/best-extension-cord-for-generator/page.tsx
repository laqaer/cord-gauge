import type { Metadata } from "next";
import Link from "next/link";
import { AmazonLink } from "@/components/amazon-link";
import { Callout } from "@/components/callout";
import { guideFaq } from "@/components/guide-faq";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { ShopBuyLine } from "@/components/shop-cords";
import { amazonSearchUrl } from "@/lib/affiliates";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const path = "/best-extension-cord-for-generator";
const title = "Extension cord for a generator";
const description =
  "Extension cord for a generator: 12 AWG versus 10 AWG by length and load, 120 V outlets versus an L14-30, and a house connection only through a transfer switch or interlock.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraphImage, title, description, url: path },
};

const faq = guideFaq([
  {
    question: "What gauge extension cord for a generator?",
    answer: `Match the generator outlet and the load. A 120 V outlet feeding up to 15 A uses 12 AWG at 25 or 50 feet and 10 AWG at 100 feet, the same shop picks as the gauge chart. A 30 A locking outlet such as a NEMA L14-30 needs a cord marked 30 A for that plug. Common practice for a short L14-30 lead is 10 AWG. Follow the generator manual when it specifies a cord.`,
  },
  {
    question: "What extension cord runs a refrigerator from a generator?",
    answer:
      "Read the refrigerator nameplate. The running current of a household refrigerator is usually well inside a 15 A generator outlet, with a higher current when the compressor starts. A 12 AWG cord is the conservative choice on that outlet. A 16 AWG light-duty cord is a poor match for a motor start. The outlet's own amp mark still limits the load.",
  },
  {
    question: "Can I use a 100 ft extension cord on a generator?",
    answer: `At 100 feet and 15 A the chart pick is ${recommendAwg(15, 100)} AWG, and 12 AWG drops ${formatDrop(12, 15, 100)}. A lighter load can stay on 12 AWG: at 10 A and 100 feet the pick is ${recommendAwg(10, 100)} AWG. A 30 A twist-lock load on a long 10 AWG lead is a lot of cord. Keep 30 A leads shorter when you can, and use a cord marked for that plug.`,
  },
  {
    question: "Can I plug a generator into the house with a male-to-male cord?",
    answer:
      "No. A generator feeds a house panel only through a listed transfer switch or a breaker interlock, so the generator cannot energize the utility lines. A male-to-male cord is not that equipment. Do not use one.",
  },
]);

export default function GeneratorCordPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path,
          dateModified: "2026-11-24",
        })}
      />
      {faq.script}
      <GuideHero
        kicker="Generator"
        title="Extension cord for a generator"
        dek="Match the outlet: 12 AWG for most short 120 V loads, 10 AWG when the run or the amps go up. A house connection needs a transfer switch or interlock, never a male-to-male cord."
        reviewedLabel="November 24, 2026"
      />

      <div className="prose-cord mt-10">
        <p>
          A generator extension cord is sized from the outlet on the generator and the nameplate of
          the load, the same way as any other cord. This page does not rank brands and it has no
          score.
        </p>
        <p>
          Flexible-cord ampacity is NEC Table 400.5(A)(1). A 120 V cord with an equipment ground
          has two current-carrying conductors. The plug and the jacket mark are usually lower than
          the table, and the lower mark is the limit. Ordinary cord sets are listed to UL 817.
        </p>
        <p>{"Holiday prices change daily. Check today's price on Amazon before you buy."}</p>

        <h2>Gauge by outlet and length</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Outlet and load</th>
                <th>Length</th>
                <th>Cord</th>
                <th>Planning drop</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>120 V, up to 15 A</td>
                <td>25 ft</td>
                <td>{recommendAwg(15, 25)} AWG</td>
                <td>{formatDrop(12, 15, 25)} on 12 AWG</td>
              </tr>
              <tr>
                <td>120 V, up to 15 A</td>
                <td>50 ft</td>
                <td>{recommendAwg(15, 50)} AWG</td>
                <td>{formatDrop(12, 15, 50)} on 12 AWG</td>
              </tr>
              <tr>
                <td>120 V, up to 15 A</td>
                <td>100 ft</td>
                <td>{recommendAwg(15, 100)} AWG</td>
                <td>{formatDrop(10, 15, 100)} on 10 AWG</td>
              </tr>
              <tr>
                <td>120 V, up to 10 A</td>
                <td>100 ft</td>
                <td>{recommendAwg(10, 100)} AWG</td>
                <td>{formatDrop(12, 10, 100)} on 12 AWG</td>
              </tr>
              <tr>
                <td>L14-30, 30 A twist-lock</td>
                <td>Keep it short</td>
                <td>Cord marked 30 A for that plug, commonly 10 AWG</td>
                <td>Use the cord mark, not a 15 A shop cord</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The 15 A rows use the same copper estimate as the{" "}
          <Link href="/extension-cord-gauge-chart">extension cord gauge chart</Link>. Run a single
          load through the{" "}
          <Link href="/extension-cord-gauge-calculator">extension cord gauge calculator</Link>. A
          120 V generator outlet is still a 15 A or 20 A receptacle. The outlet rating wins if it
          is lower than the cord.
        </p>
        <ShopBuyLine awg={12} lengthFt={50} linkLabel="Check today's price">
          50 ft 12 AWG SJTW is the checked cord for a 120 V generator outlet at 15 A.
        </ShopBuyLine>
        <ShopBuyLine awg={12} lengthFt={100} linkLabel="Check today's price">
          100 ft 12 AWG SJTW matches a lighter 100-foot load, such as 10 A.
        </ShopBuyLine>
        <p>
          The 100 ft listing above is 12 AWG. It is not the 15 A pick at 100 feet. That pick is 10
          AWG, and CordGauge does not currently link a checked 10 AWG cord. Search 10 AWG generator
          cords.{" "}
          <AmazonLink
            href={amazonSearchUrl("10 gauge generator extension cord")}
            label="10 gauge generator extension cord"
          >
            {"Check today's price"}
          </AmazonLink>.
        </p>
        <p>
          Search L14-30 generator cords.{" "}
          <AmazonLink
            href={amazonSearchUrl("L14-30 30 amp generator extension cord 10 AWG")}
            label="L14-30 30 amp generator extension cord 10 AWG"
          >
            {"Check today's price"}
          </AmazonLink>.{" "}
          An L14-30 is a 30 A, 125/250 V locking outlet. A 15 A household cord does not belong on
          it.
        </p>

        <Callout title="A house connection uses a transfer switch or interlock" tone="warn">
          A generator feeds a house panel only through a listed transfer switch or a breaker
          interlock, so it cannot energize the utility lines. A male-to-male cord backfeeds the
          building. Do not use one. Hire a licensed electrician for the transfer equipment.
        </Callout>
        {faq.answers}
      </div>
      <RelatedGuides except={path} />
    </article>
  );
}
