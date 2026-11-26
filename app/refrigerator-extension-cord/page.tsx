import type { Metadata } from "next";
import Link from "next/link";
import { AmazonLink } from "@/components/amazon-link";
import { Callout } from "@/components/callout";
import { guideFaq } from "@/components/guide-faq";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { amazonSearchUrl } from "@/lib/affiliates";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const path = "/refrigerator-extension-cord";
const title = "Refrigerator extension cord";
const description =
  "Many refrigerator manuals say plug into a grounded outlet. If a cord is unavoidable, use one short 12 or 14 AWG 3-prong cord rated for the nameplate amps.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraphImage, title, description, url: path },
};

const fridgeLengths = [6, 10, 15, 25] as const;

const faq = guideFaq([
  {
    question: "Can you use an extension cord for a refrigerator?",
    answer:
      "Many refrigerator manufacturers tell you to plug the refrigerator into a grounded wall outlet and not to use an extension cord. Follow that manual. If a cord is unavoidable, use one short 3-prong cord of 12 or 14 AWG whose marked amps are at or above the nameplate. Do not daisy-chain cords, do not use a power strip, and do not run the cord under a rug.",
  },
  {
    question: "What gauge extension cord for a refrigerator?",
    answer:
      "Use 14 AWG when the nameplate is at or under the amps marked on that cord, and 12 AWG when the nameplate or the compressor start needs a 15 A cord. The voltage-drop chart would allow 16 AWG for a load at or under 10 A on a run of 25 feet or less. Do not buy that light-duty cord for a refrigerator.",
  },
  {
    question: "Can a refrigerator plug into a power strip?",
    answer:
      "No. A power strip is not the grounded wall outlet the manual names. Use that outlet, or one extension cord rated for the refrigerator.",
  },
  {
    question: "Can you daisy-chain extension cords for a refrigerator?",
    answer:
      "No. Two cords are a longer run plus another plug, and the thinnest cord sets the ampacity. Use one cord. The daisy-chain guide on this site explains why stacked cords fail.",
  },
  {
    question: "How long can a refrigerator extension cord be?",
    answer:
      "Keep it short. This page sizes 6, 10, 15, and 25 feet. A longer cord adds voltage drop and is closer to using flexible cord in place of a receptacle. NEC 400.12(1) does not allow a flexible cord as a substitute for the fixed wiring of a structure. If the refrigerator cannot reach a proper outlet, have a receptacle installed.",
  },
]);

export default function RefrigeratorCordPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd data={articleJsonLd({ headline: title, description, path })} />
      {faq.script}
      <GuideHero
        kicker="Refrigerator"
        title="Refrigerator extension cord"
        dek="Many manuals say use a grounded outlet, not an extension cord. If a cord is unavoidable, one short 12 or 14 AWG 3-prong cord rated for the nameplate."
      />

      <div className="prose-cord mt-10">
        <p>
          Many refrigerator manuals say plug the fridge into a grounded outlet, not an extension
          cord. If a cord is unavoidable, use one short 12 or 14 AWG 3-prong cord rated for the
          nameplate amps.
        </p>
        <p>
          Do not daisy-chain a second cord, do not use a power strip, and do not run the cord under
          a rug. The manual that came with the refrigerator is the instruction that wins.
        </p>
        <p>
          A cord set is listed to UL 817. The amps marked on the jacket and the plug are the limit.
          NEC 400.12(1) does not allow a flexible cord as a substitute for the fixed wiring of a
          structure. A cord that stays because the refrigerator has no receptacle is the
          substitute that NEC 400.12(1) does not allow. A new receptacle is the fix. This page does not
          publish one running-amp figure or one startup-surge figure. Nameplates differ. The table
          uses two planning loads from the{" "}
          <Link href="/extension-cord-gauge-chart">extension cord gauge chart</Link>. One load is at
          or under 10 A. The other is a 15 A cord. Those loads are not measurements of a
          refrigerator. See the{" "}
          <Link href="/extension-cord-gauge-calculator">extension cord gauge calculator</Link> and
          the <Link href="/daisy-chain-extension-cords">daisy-chain guide</Link>.
        </p>

        <h2>Gauge for a short cord</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Length</th>
                <th>Running load at or under 10 A</th>
                <th>Start sized as a 15 A cord</th>
              </tr>
            </thead>
            <tbody>
              {fridgeLengths.map((length) => {
                const startAwg = recommendAwg(15, length);
                return (
                  <tr key={length}>
                    <td>{length} ft</td>
                    <td>
                      Chart pick {recommendAwg(10, length)} AWG. Buy 14 AWG. Drop on 14 AWG is{" "}
                      {formatDrop(14, 10, length)}.
                    </td>
                    <td>
                      Buy {startAwg} AWG. Drop on {startAwg} AWG is {formatDrop(startAwg, 15, length)}.
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>
          The drops are the same two-way copper estimate as the gauge chart, at 120 V. The chart
          pick for a load at or under 10 A on these short runs is 16 AWG. Do not buy that
          light-duty cord for a refrigerator compressor. Buy 14 AWG when the nameplate is at or
          under the amps marked on that cord, and 12 AWG when the nameplate or the start needs a
          15 A cord. If the nameplate is above the cord mark, the cord is the wrong cord.
        </p>
        <p>
          The checked cords on this site are 50 ft and 100 ft, longer than this short lead, so this
          page does not link them.{" "}
          <AmazonLink
            href={amazonSearchUrl("12 AWG 3 prong extension cord")}
            label="12 AWG 3 prong extension cord"
          >
            Search 12 AWG 3-prong cords.
          </AmazonLink>{" "}
          <AmazonLink
            href={amazonSearchUrl("14 AWG 3 prong extension cord")}
            label="14 AWG 3 prong extension cord"
          >
            Search 14 AWG 3-prong cords.
          </AmazonLink>
        </p>
        <Callout title="Follow the refrigerator manual" tone="warn">
          If the manual says not to use an extension cord, a heavier cord is still disallowed. When
          the refrigerator cannot reach a grounded outlet, the fix is a receptacle on that wall.
          Hire a licensed electrician for that circuit.
        </Callout>
        {faq.answers}
      </div>
      <RelatedGuides except={path} />
    </article>
  );
}
