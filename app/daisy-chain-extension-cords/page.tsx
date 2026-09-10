import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop, recommendAwg, voltageDropVolts, type Awg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "Can you daisy-chain extension cords?";
const description =
  "Why stacking two 50-foot cords fails for shop tools. 100-foot voltage drop, ampacity of the thinnest link, heat at the plugs, and when one properly gauged cord is the fix.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/daisy-chain-extension-cords" },
  openGraph: { ...openGraphImage, title, description, url: "/daisy-chain-extension-cords" },
};

function seriesDrop(first: Awg, second: Awg, amps: number, eachFt: number): string {
  const volts = voltageDropVolts(first, amps, eachFt) + voltageDropVolts(second, amps, eachFt);
  const pct = (volts / 120) * 100;
  return `${volts.toFixed(1)} V (${pct.toFixed(1)}%)`;
}

export default function DaisyChainPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/daisy-chain-extension-cords",
        })}
      />
      <GuideHero
        kicker="Daisy chain"
        title="Can you daisy-chain extension cords?"
        dek="Two 50-foot cords are a 100-foot drop plus extra connections. The thinnest link sets the ampacity. Heat shows up at the plugs. One cord in the right gauge is the fix."
      />

      <div className="prose-cord mt-10">
        <p>
          People daisy-chain because the 50-foot reel in the truck will not reach the driveway cut.
          Plug another 50 into the first and the tool lights up. That is still a 100-foot copper
          path — the same resistor as one 100-foot cord in that gauge — plus a second pair of
          contacts to heat, loosen, and corrode. For a{" "}
          <Link href="/best-extension-cord-for-circular-saw">circular saw</Link>,{" "}
          <Link href="/best-extension-cord-for-table-saw">table saw</Link>, or{" "}
          <Link href="/best-extension-cord-for-air-compressor">air compressor</Link>, stacking thin
          cords is how motors sag and jackets warm.
        </p>

        <h2>Two 50s are a 100-foot drop</h2>
        <p>
          Voltage drop adds with length. Two 50-foot 16 AWG cords in series drop about the same
          copper voltage as one 100-foot 16 AWG cord: {formatDrop(16, 15, 100)} on a 15 A, 120 V
          load. Two 14 AWG 50s are {formatDrop(14, 15, 100)}. That is the{" "}
          <Link href="/100-foot-extension-cord-gauge">100-foot problem</Link>, not a free extra
          reach. The planning math is the same NEC Chapter 9 Table 8 copper as the{" "}
          <Link href="/extension-cord-gauge-chart">master chart</Link>.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Setup at 15 A</th>
                <th>Copper drop</th>
                <th>Weak link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Two 50-ft 16 AWG</td>
                <td>{formatDrop(16, 15, 100)}</td>
                <td>16 AWG + extra plugs</td>
              </tr>
              <tr>
                <td>50-ft 16 + 50-ft 12</td>
                <td>{seriesDrop(16, 12, 15, 50)}</td>
                <td>16 AWG listing</td>
              </tr>
              <tr>
                <td>Two 50-ft 14 AWG</td>
                <td>{formatDrop(14, 15, 100)}</td>
                <td>14 AWG + extra plugs</td>
              </tr>
              <tr>
                <td>One 100-ft 12 AWG</td>
                <td>{formatDrop(12, 15, 100)}</td>
                <td>12 AWG — tight for 15 A motors</td>
              </tr>
              <tr>
                <td>One 100-ft 10 AWG</td>
                <td className="pick">{formatDrop(10, 15, 100)}</td>
                <td className="pick">{recommendAwg(15, 100)} AWG — shop pick</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The mixed 16 + 12 row is worse than 100 feet of 12 AWG alone ({formatDrop(12, 15, 100)})
          because the thin half still has to carry the whole load for 50 feet. A thicker second
          cord does not cancel the first.
        </p>
        <Callout title="The plugs are extra heat" tone="warn">
          Each added coupling is contact resistance the copper table does not count. A loose,
          dirty, or outdoor-wet pair runs hotter than the jacket. Two thin 50s invent a 100-foot
          drop <em>and</em> a hotspot at the joint. If you need 100 feet, buy 100 feet in the
          gauge the load wants.
        </Callout>

        <h2>Ampacity is the thinnest link</h2>
        <p>
          Series cords are one circuit. The marked ampacity of the lightest cord and the smallest
          plug wins — not the average, not the heavier reel, not “heavy duty” on one hang tag. A
          16 AWG Halloween-light cord plus a 12 AWG shop reel is a 16 AWG circuit with extra
          length. Do not put a 15 A motor on it.
        </p>
        <p>
          Same story on {formatDrop(14, 15, 50)} at 50 feet of 14 AWG: adding another 14 does not
          upgrade the listing. If the hardware-store fork is still 12 vs 14, stay on{" "}
          <Link href="/12-vs-14-gauge-extension-cord">12 vs 14</Link>. If you already know 14 AWG
          is out and the run is a full hundred,{" "}
          <Link href="/10-vs-12-gauge-extension-cord">10 vs 12</Link> is the honest pair.
        </p>

        <h2>When one properly gauged cord is the fix</h2>
        <ul>
          <li>
            A 15 A shop motor at 100 feet: one {recommendAwg(15, 100)} AWG cord, fully unspooled.
            Not two 16 AWG or 14 AWG 50s.
          </li>
          <li>
            A 15 A tool at 25–50 feet: one 12 AWG reel. That is the default for the saw and
            compressor pages — do not invent length with a light-duty leftover.
          </li>
          <li>
            The outlet is closer than you think. Move the compressor and let the hose travel. Park
            the table saw nearer the receptacle. Carry the circular saw to the wall for the cut
            that does not need a hundred feet.
          </li>
        </ul>
        <p>
          Outdoor or open-door work still needs a weather-rated jacket in the gauge you already
          chose. <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW</Link> is the jacket, not
          thicker copper, and it does not make a daisy chain safer. Two indoor 16 AWG cords outside
          are still indoor 16 AWG — plus wet contacts.
        </p>

        <h2>What we are not claiming</h2>
        <p>
          We are not ranking brands and we do not have a 9.4. We are not telling you that two
          listed 12 AWG cords in perfect condition are a fire by definition — they are still a
          100-foot 12 AWG drop plus extra plugs, which is the wrong product for a 15 A motor at
          that length. One cord, right AWG, intact ends, matching receptacle. That is the buy.
        </p>
      </div>
      <RelatedGuides except="/daisy-chain-extension-cords" />
    </article>
  );
}
