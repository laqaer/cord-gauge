import type { Metadata } from "next";
import Link from "next/link";
import { AmazonLink } from "@/components/amazon-link";
import { Callout } from "@/components/callout";
import { guideFaq } from "@/components/guide-faq";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { amazonSearchUrl } from "@/lib/affiliates";
import { formatDrop } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const path = "/30-amp-rv-extension-cord";
const title = "30 amp RV extension cord";
const description =
  "30 amp RV extension cord sizing: a listed TT-30 cord, commonly 10 AWG, at 25 and 50 feet, and how that differs from a 50 amp 14-50 cord.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraphImage, title, description, url: path },
};

const faq = guideFaq([
  {
    question: "What size extension cord for a 30-amp RV?",
    answer:
      "A 30-amp RV takes a cord marked 30 A with a NEMA TT-30 plug. The common construction at 25 and 50 feet is 10 AWG. A 50-amp coach uses a NEMA 14-50 cord, commonly 6 AWG, and a 30 A cord does not raise a 30 A pedestal to 50 A service. Use a cord rated for the inlet, and follow the cord manufacturer.",
  },
  {
    question: "Can I use a 50 ft 30 amp RV cord?",
    answer: `Yes, when the cord is a listed 30 A TT-30 lead. At 50 feet, 10 AWG at 30 A drops ${formatDrop(10, 30, 50)} on 120 V, using the same NEC Chapter 9 Table 8 copper estimate as the gauge chart. That sits on a 3% planning band. The amps marked on the cord still win.`,
  },
  {
    question: "What is the difference between a 30A and a 50A RV cord?",
    answer:
      "A 30 A shore cord is 120 V on a NEMA TT-30 plug, one hot, neutral, and equipment ground, commonly 10 AWG. A 50 A shore cord is 120/240 V on a NEMA 14-50 plug, two hots, neutral, and equipment ground, commonly 6 AWG. The plugs do not interchange. An adapter between them only delivers what the smaller side is rated for.",
  },
  {
    question: "Is 10 AWG enough for a 30-amp RV?",
    answer: `For a listed 30 A TT-30 cord at 25 or 50 feet, 10 AWG is the common construction. The planning drop is ${formatDrop(10, 30, 25)} at 25 feet and ${formatDrop(10, 30, 50)} at 50 feet, on 120 V. At 100 feet, 10 AWG at 30 A drops ${formatDrop(10, 30, 100)}. That is a large drop. Use a shorter cord, or a heavier cord the manufacturer marks for 30 A.`,
  },
]);

export default function ThirtyAmpRvPage() {
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
        kicker="RV shore power"
        title="30 amp RV extension cord"
        dek="A listed 30 A TT-30 cord, commonly 10 AWG, is the cord for a 30-amp RV at 25 or 50 feet. A 50-amp coach takes a 14-50 cord instead."
        reviewedLabel="November 24, 2026"
      />

      <div className="prose-cord mt-10">
        <p>
          A 30-amp RV inlet is a NEMA TT-30: 125 V, one hot, neutral, and an equipment ground.
          RVIA shore-power practice uses that plug for 30 A coaches and a NEMA 14-50 for 50 A
          coaches. NEC Article 551 covers the RV electrical system. The shore cord has to be rated
          for the inlet it feeds.
        </p>
        <p>
          Flexible-cord ampacity is NEC Table 400.5(A)(1). The number molded on a cord set is
          usually lower, and that mark is the limit. Ordinary cord sets are listed to UL 817. A
          household 15 A cord, including a 12 AWG shop cord, has the wrong plug and the wrong amp
          mark for a 30 A RV inlet.
        </p>
        <p>{"Holiday prices change daily. Check today's price on Amazon before you buy."}</p>

        <h2>30 A TT-30 by length</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Length</th>
                <th>Common 30 A cord</th>
                <th>10 AWG drop at 30 A</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25 ft</td>
                <td>10 AWG, TT-30, marked 30 A</td>
                <td>{formatDrop(10, 30, 25)}</td>
              </tr>
              <tr>
                <td>50 ft</td>
                <td>10 AWG, TT-30, marked 30 A</td>
                <td>{formatDrop(10, 30, 50)}</td>
              </tr>
              <tr>
                <td>100 ft</td>
                <td>Shorter cord, or heavier copper marked 30 A</td>
                <td>{formatDrop(10, 30, 100)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Drop figures are the chart’s copper estimate: NEC Chapter 9, Table 8, uncoated, 75 °C,
          two-way path, 120 V. They are planning numbers, not a lab test of a named reel. Amp and
          length picks for ordinary 120 V cords are on the{" "}
          <Link href="/extension-cord-gauge-chart">extension cord gauge chart</Link> and the{" "}
          <Link href="/extension-cord-gauge-calculator">extension cord gauge calculator</Link>.
        </p>
        <p>
          Search 30 A TT-30 cords.{" "}
          <AmazonLink
            href={amazonSearchUrl("30 amp RV extension cord 10 AWG TT-30")}
            label="30 amp RV extension cord 10 AWG TT-30"
          >
            {"Check today's price"}
          </AmazonLink>.{" "}
          CordGauge does not link a checked 30 A RV listing. The two cords checked on this site are
          12 AWG household SJTW cords marked 15 A, so they are the wrong product here.
        </p>

        <h2>30 A versus 50 A</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>30 A coach</th>
                <th>50 A coach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plug</td>
                <td>NEMA TT-30, 125 V</td>
                <td>NEMA 14-50, 125/250 V</td>
              </tr>
              <tr>
                <td>Conductors</td>
                <td>Hot, neutral, ground</td>
                <td>Two hots, neutral, ground</td>
              </tr>
              <tr>
                <td>Common copper</td>
                <td>10 AWG</td>
                <td>6 AWG</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout title="An adapter does not add amps" tone="warn">
          A 50 A to 30 A adapter only lets the plug fit. The coach still has whatever the 30 A side
          is rated to deliver. Follow the cord and adapter markings, and the coach manufacturer.
        </Callout>
        <p>
          Search 50 A 14-50 RV cords.{" "}
          <AmazonLink
            href={amazonSearchUrl("50 amp RV extension cord 14-50")}
            label="50 amp RV extension cord 14-50"
          >
            {"Check today's price"}
          </AmazonLink>.
        </p>
        {faq.answers}
      </div>
      <RelatedGuides except={path} />
    </article>
  );
}
