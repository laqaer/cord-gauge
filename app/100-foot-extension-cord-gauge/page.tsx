import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "100-foot extension cord gauge";
const description =
  "What gauge for a 100-foot extension cord. Copper voltage-drop planning for 10–15 A tools, and why daisy-chaining two 50-foot cords is worse.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/100-foot-extension-cord-gauge" },
  openGraph: { ...openGraphImage, title, description, url: "/100-foot-extension-cord-gauge" },
};

export default function HundredFootPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/100-foot-extension-cord-gauge",
        })}
      />
      <GuideHero
        kicker="Long runs"
        title="What gauge for a 100-foot extension cord"
        dek="At 100 feet, voltage drop is the spec. 16 AWG is out. 14 AWG is a light-load maybe. 12 AWG is the floor for many shop tools. 10 AWG is the 15 A motor answer."
      />

      <div className="prose-cord mt-10">
        <p>
          A hundred feet of copper is a resistor you can hold. On 120 V, a 15 A load through 14 AWG
          drops about {formatDrop(14, 15, 100)} — enough that a saw or compressor feels like it
          lost a size. The same load on 10 AWG is about {formatDrop(10, 15, 100)}. That is why
          long-run shopping starts at gauge, not at “outdoor yellow, 100 ft.”
        </p>

        <h2>Planning drops at 100 feet, 120 V</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Load</th>
                <th>Shop pick</th>
                <th>14 AWG</th>
                <th>12 AWG</th>
                <th>10 AWG</th>
              </tr>
            </thead>
            <tbody>
              {([10, 13, 15] as const).map((amps) => (
                <tr key={amps}>
                  <td>{amps} A</td>
                  <td className="pick">{recommendAwg(amps, 100)} AWG</td>
                  <td>{formatDrop(14, amps, 100)}</td>
                  <td>{formatDrop(12, amps, 100)}</td>
                  <td>{formatDrop(10, amps, 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          These use the same NEC Chapter 9 Table 8 copper numbers as the{" "}
          <Link href="/extension-cord-gauge-chart">master chart</Link>. They are not a lab report
          for a named reel.
        </p>
        <Callout title="Two 50s are not a free 100" tone="warn">
          Daisy-chaining two 50-foot 14 AWG or 16 AWG cords adds the same copper drop <em>plus</em>{" "}
          another pair of contacts to heat and corrode. If you need 100 feet, buy 100 feet in the
          gauge the load wants. Do not invent length with extra plugs.
        </Callout>

        <h2>When 12 AWG is enough at 100 feet</h2>
        <ul>
          <li>Loads around 10 A: lights, a radio, a charger, a small drill that is not bound up.</li>
          <li>You accept ~{formatDrop(12, 10, 100)} at 10 A, which is still in a comfortable band.</li>
          <li>The cord is marked for the amps, fully unspooled, and the connections are tight.</li>
        </ul>
        <p>
          A 15 A circular saw at 100 feet is not that job. Use 10 AWG, or move power closer. See
          the <Link href="/best-extension-cord-for-circular-saw">saw guide</Link>.
        </p>

        <h2>When 10 AWG is the honest pick</h2>
        <ul>
          <li>13–15 A motor tools at a full 100 feet.</li>
          <li>Anything that already dimmed lights on a shorter 12 AWG run.</li>
          <li>A compressor or similar load that starts hard. Nameplate understates the first instant.</li>
        </ul>
        <p>
          10 AWG 100-foot cords are heavy. That is the trade. If you cannot carry it, run a
          properly installed receptacle closer to the work instead of stacking light cords.
        </p>

        <h2>Outdoor 100-foot reels</h2>
        <p>
          Buy a weather-rated jacket if the cord lives outside —{" "}
          <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW notes</Link>. The jacket does not
          reduce voltage drop. A 100-foot 16 AWG “outdoor” reel is still a 16 AWG resistor.
        </p>
        <p>
          If the 100-foot choice is really 12 vs 14, the{" "}
          <Link href="/12-vs-14-gauge-extension-cord">12 vs 14 page</Link> is the short version:
          14 AWG at 100 feet on 15 A is the wrong aisle.
        </p>
      </div>
      <RelatedGuides except="/100-foot-extension-cord-gauge" />
    </article>
  );
}
