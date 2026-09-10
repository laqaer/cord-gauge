import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "10 vs 12 gauge extension cord: when 10 AWG wins";
const description =
  "When a 10 AWG extension cord beats 12 AWG for 15 A shop motors, and when 12 AWG is still the right buy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/10-vs-12-gauge-extension-cord" },
  openGraph: { ...openGraphImage, title, description, url: "/10-vs-12-gauge-extension-cord" },
};

export default function TenVsTwelvePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/10-vs-12-gauge-extension-cord",
        })}
      />
      <GuideHero
        kicker="10 vs 12"
        title="When 10 AWG beats 12 AWG"
        dek="12 AWG is the default shop cord. 10 AWG keeps more voltage at the tool. The useful question is a 100-foot 15 A motor, lights that dip on start, and a cord that lives on the floor."
      />

      <div className="prose-cord mt-10">
        <p>
          Both gauges show up in the 15 A and 20 A bins. The hang tags both say heavy duty. The
          copper does not. On a 15 A, 120 V load, 12 AWG is about {formatDrop(12, 15, 50)} at 50
          feet and {formatDrop(12, 15, 100)} at 100 feet. 10 AWG on the same load is{" "}
          {formatDrop(10, 15, 50)} and {formatDrop(10, 15, 100)}. That is why a{" "}
          <Link href="/best-extension-cord-for-circular-saw">circular saw</Link> or{" "}
          <Link href="/best-extension-cord-for-table-saw">table saw</Link> that ran fine on a 50-foot
          12 starts to bog, and why shop lights dip when the motor comes up, on a hundred-foot run.
        </p>

        <h2>The actual difference</h2>
        <p>
          10 AWG copper is thicker. Resistance from NEC Chapter 9, Table 8 is 1.21 Ω per 1,000 ft
          versus 1.93 Ω for 12 AWG (uncoated, 75 °C). Same amps, same feet, the 10 AWG path drops
          about two-thirds the voltage of the 12 AWG path. You pay for that in weight and sticker
          price. You do not pay for a magic “extra heavy duty” coating.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>15 A load</th>
                <th>12 AWG</th>
                <th>10 AWG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25 ft</td>
                <td>{formatDrop(12, 15, 25)}</td>
                <td>{formatDrop(10, 15, 25)}</td>
              </tr>
              <tr>
                <td>50 ft</td>
                <td>{formatDrop(12, 15, 50)}</td>
                <td>{formatDrop(10, 15, 50)}</td>
              </tr>
              <tr>
                <td>100 ft</td>
                <td>{formatDrop(12, 15, 100)}</td>
                <td>{formatDrop(10, 15, 100)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Full rows for 10 A and 13 A live on the{" "}
          <Link href="/extension-cord-gauge-chart">master chart</Link>. The 100-foot column is the
          usual fork — see <Link href="/100-foot-extension-cord-gauge">100-foot gauge</Link>.
        </p>

        <h2>When 12 AWG is enough</h2>
        <ul>
          <li>The run is 25–50 feet on a 15 A tool. That is the default shop buy.</li>
          <li>
            The load is well under 15 A (lights, chargers, a small drill) even if the cord is long.
          </li>
          <li>You carry the cord every day and 10 AWG would be a boat anchor for the same job.</li>
          <li>
            You are not treating the reel as furniture. A temporary reach is a different product
            than a cord that lives on the floor.
          </li>
        </ul>
        <p>
          If the hardware-store fork is still 12 vs 14, stay on that page:{" "}
          <Link href="/12-vs-14-gauge-extension-cord">12 vs 14</Link>. Debating 10 vs 12 means 14
          AWG is already out.
        </p>

        <h2>When 10 AWG is the right buy</h2>
        <ul>
          <li>
            A 100-foot, 15 A motor — circular saw, contractor table saw, compressor. At 100 feet,
            12 AWG on 15 A is already near 5%. 10 AWG is the comfortable pick.
          </li>
          <li>
            Lights on the same circuit dip when the motor starts on a 12 AWG run. Nameplate understates
            inrush. The cord is already the weak link before the cut begins.
          </li>
          <li>
            The cord is semi-permanent shop wiring: a table saw parked in the aisle, a compressor
            that never moves, a reel you do not coil back up. Size it like a feeder, or put a
            receptacle closer.
          </li>
        </ul>
        <Callout title="The plug is part of the rating">
          Plenty of 10 AWG outdoor cords ship with 20 A or 30 A ends. That is not a 15 A 12 AWG
          cord with extra copper. Match the receptacle. Do not file the blades. A 10 AWG cable with
          a 15 A plug is still a 15 A cord — thicker wire, same listing.
        </Callout>

        <h2>Weight, heat, and a cord that lives down</h2>
        <p>
          A 100-foot 10 AWG reel is heavy. That is the trade. If you cannot carry it, the honest
          fix is a receptacle closer to the work — not a thinner cord that runs the motor hot.
          Leaving any gauge tightly coiled under a 15 A load is a heat problem; unspool what you
          are using.
        </p>
        <p>
          Outdoor or open-door shop work still needs a weather-rated jacket in the gauge you already
          chose. <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW</Link> is the jacket, not
          thicker copper. A 12 AWG SJTW 100-foot “outdoor” reel is still a 12 AWG resistor.
        </p>
      </div>
      <RelatedGuides except="/10-vs-12-gauge-extension-cord" />
    </article>
  );
}
