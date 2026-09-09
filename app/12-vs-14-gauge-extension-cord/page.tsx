import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "12 vs 14 gauge extension cord: when 12 AWG wins";
const description =
  "When a 12 AWG extension cord beats 14 AWG for 15 A shop tools, and when a short 14 AWG run is still the right buy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/12-vs-14-gauge-extension-cord" },
  openGraph: { ...openGraphImage, title, description, url: "/12-vs-14-gauge-extension-cord" },
};

export default function TwelveVsFourteenPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/12-vs-14-gauge-extension-cord",
        })}
      />
      <GuideHero
        kicker="12 vs 14"
        title="When 12 AWG beats 14 AWG"
        dek="14 AWG is lighter and cheaper. 12 AWG keeps more voltage at the tool. The useful question is the run length and whether the load is a motor."
      />

      <div className="prose-cord mt-10">
        <p>
          Both gauges show up in the 15 A bin at the hardware store. The hang tags look the same.
          The copper does not. On a 15 A, 120 V load, 14 AWG is already at about{" "}
          {formatDrop(14, 15, 50)} at 50 feet and {formatDrop(14, 15, 100)} at 100 feet. 12 AWG on
          the same load is {formatDrop(12, 15, 50)} and {formatDrop(12, 15, 100)}. That is why a
          circular saw that “ran fine on a short 14” starts to bog on the far side of the driveway.
        </p>

        <h2>The actual difference</h2>
        <p>
          12 AWG copper is thicker. Resistance from NEC Chapter 9, Table 8 is 1.93 Ω per 1,000 ft
          versus 3.07 Ω for 14 AWG (uncoated, 75 °C). Same amps, same feet, the 12 AWG path drops
          about two-thirds the voltage of the 14 AWG path. You pay for that in weight and sticker
          price. You do not pay for a magic “heavy duty” coating.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>15 A load</th>
                <th>14 AWG</th>
                <th>12 AWG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25 ft</td>
                <td>{formatDrop(14, 15, 25)}</td>
                <td>{formatDrop(12, 15, 25)}</td>
              </tr>
              <tr>
                <td>50 ft</td>
                <td>{formatDrop(14, 15, 50)}</td>
                <td>{formatDrop(12, 15, 50)}</td>
              </tr>
              <tr>
                <td>100 ft</td>
                <td>{formatDrop(14, 15, 100)}</td>
                <td>{formatDrop(12, 15, 100)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Full rows for 10 A and 13 A live on the{" "}
          <Link href="/extension-cord-gauge-chart">master chart</Link>.
        </p>

        <h2>When 14 AWG is enough</h2>
        <ul>
          <li>The tool nameplate is well under 15 A (drills, lights, chargers, a small sander).</li>
          <li>The run is short — 25 feet, maybe a tight 50 if the load is modest and not a hard-starting motor.</li>
          <li>The cord and plug are marked for the amps you will actually draw.</li>
          <li>You will not “just add another 50 later.” Length is the reason people outgrow 14 AWG.</li>
        </ul>

        <h2>When 12 AWG is the right buy</h2>
        <ul>
          <li>
            A 15 A circular saw, miter saw, or similar motor — see{" "}
            <Link href="/best-extension-cord-for-circular-saw">the saw guide</Link>.
          </li>
          <li>Fifty feet or more on a 13–15 A load.</li>
          <li>
            A hundred-foot job. At 100 feet, 12 AWG on 15 A is already near 5%; 10 AWG is the
            comfortable pick. Read{" "}
            <Link href="/100-foot-extension-cord-gauge">100-foot gauge</Link>.
          </li>
          <li>You want one cord that can also feed a 15 A table saw without being the weak link.</li>
        </ul>
        <Callout title="The plug is part of the rating">
          Plenty of 12 AWG outdoor cords ship with 15 A ends. That is a 15 A cord. A 20 A receptacle
          and a 20 A plug are a different product. Do not file the blades. Match the circuit.
        </Callout>

        <h2>Weight, coil, and heat</h2>
        <p>
          12 AWG is heavier. That matters if you carry it up a ladder every day. It does not matter
          if the alternative is a saw that runs hot because the voltage at the handle is low.
          Leaving a thin cord tightly coiled under load is a heat problem on either gauge; unspool
          what you are using.
        </p>

        <h2>Do not use 16 AWG as the tie-breaker</h2>
        <p>
          16 AWG is the light-duty aisle. It is not a cheaper 14. If the choice is truly 12 vs 14,
          stay in that pair. 16 AWG on a 15 A saw is how people learn about tripping breakers and
          melted jackets.
        </p>
      </div>
      <RelatedGuides except="/12-vs-14-gauge-extension-cord" />
    </article>
  );
}
