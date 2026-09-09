import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { awgOrder, gaugeChart, listedAmpNotes } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "Extension cord gauge chart (AWG × amps × length)";
const description =
  "Master extension-cord gauge chart for 16, 14, 12, and 10 AWG. Copper voltage-drop planning numbers at 10, 13, and 15 A for 25, 50, and 100 feet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/extension-cord-gauge-chart" },
  openGraph: { ...openGraphImage, title, description, url: "/extension-cord-gauge-chart" },
};

export default function GaugeChartPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/extension-cord-gauge-chart",
        })}
      />
      <GuideHero
        kicker="Master chart"
        title="Extension cord gauge by amps and length"
        dek="Use the nameplate amps and the actual run. Then pick AWG so voltage drop stays in a range a motor tool can live with. The printed “heavy duty” is not a spec."
      />

      <div className="prose-cord mt-10">
        <p>
          Smaller AWG numbers are thicker copper. A 12 AWG cord has more metal than a 14 AWG cord,
          so it drops less voltage over the same feet. That is the whole comparison. Jacket type
          (SJTW, SJT, SOOW) is a weather and oil story — see{" "}
          <Link href="/outdoor-extension-cord-gauge-sjtw">outdoor / SJTW</Link> — not a substitute
          for gauge.
        </p>

        <h2>What these numbers are</h2>
        <p>
          Drop figures use copper resistance from NEC Chapter 9, Table 8 (uncoated, 75 °C) and the
          two-way path on 120 V: <strong>2 × length × amps × Ω/kft ÷ 1,000</strong>. They are
          planning estimates. We did not bench-test a named SKU. Temperature, connector quality, and
          how much cord is still coiled all move the real number.
        </p>
        <Callout title="3% is a shop target, not a law" tone="warn">
          Many electricians keep feeder-plus-branch drop near 5% total, and treat ~3% as a comfort
          band for 120 V motor tools. A saw that starts hard will draw more than nameplate for a
          moment. If the lights dim and the blade slows, the cord is part of the circuit whether a
          chart called it “OK” or not.
        </Callout>

        <h2>Gauge × amps × length</h2>
        <p>
          Shop pick is the thinnest AWG in this set that keeps a 120 V motor-tool load near 3% at
          that length — then rounded thicker when the math is close. Confirm the cord’s{" "}
          <em>marked</em> ampacity and plug rating before you plug in.
        </p>
      </div>

      <div className="table-scroll mt-6">
        <table>
          <thead>
            <tr>
              <th>Load</th>
              <th>Run</th>
              <th>Shop pick</th>
              <th>16 AWG</th>
              <th>14 AWG</th>
              <th>12 AWG</th>
              <th>10 AWG</th>
            </tr>
          </thead>
          <tbody>
            {gaugeChart.map((row) => (
              <tr key={`${row.amps}-${row.lengthFt}`}>
                <td>{row.amps} A</td>
                <td>{row.lengthFt} ft</td>
                <td className="pick">{row.pick} AWG</td>
                <td>{row.drops[16]}</td>
                <td>{row.drops[14]}</td>
                <td>{row.drops[12]}</td>
                <td>{row.drops[10]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-cord mt-10">
        <h2>What the listing usually allows</h2>
        <p>
          Flexible-cord ampacity is a listing and NEC Table 400.5 problem, not a wire-gauge
          daydream. Typical big-box marks:
        </p>
        <ul>
          {awgOrder.map((awg) => (
            <li key={awg}>
              <strong>{awg} AWG.</strong> {listedAmpNotes[awg]}
            </li>
          ))}
        </ul>
        <p>
          A 12 AWG cord with a 15 A plug is a 15 A cord. Do not put a 20 A load on it because the
          copper could theoretically take more.
        </p>

        <h2>How to use the chart on a real job</h2>
        <ol>
          <li>
            Read the tool nameplate. A 15 A circular saw is the{" "}
            <Link href="/best-extension-cord-for-circular-saw">saw guide</Link>, not a 10 A row.
          </li>
          <li>
            Measure outlet to tool. For 100 feet, start at the{" "}
            <Link href="/100-foot-extension-cord-gauge">long-run guide</Link>.
          </li>
          <li>
            If you are stuck choosing 12 or 14 on a 15 A circuit, read{" "}
            <Link href="/12-vs-14-gauge-extension-cord">12 vs 14</Link>.
          </li>
          <li>Do not daisy-chain thin cords to “make” length. Buy one cord in the gauge you need.</li>
        </ol>

        <h2>What we will not invent</h2>
        <p>
          No SKU watt-loss lab scores. No “best cord of 2026” ranking. No claim that a yellow jacket
          is thicker than an orange one. If two cords share AWG, length, and listing, the useful
          differences are jacket type, flexibility in the cold, and whether the ends are 15 A or 20 A
          — not a star rating.
        </p>
      </div>
      <RelatedGuides except="/extension-cord-gauge-chart" />
    </article>
  );
}
