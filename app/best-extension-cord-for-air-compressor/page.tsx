import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "Best extension cord for an air compressor (15 A)";
const description =
  "Extension cord gauge for a 15 A portable air compressor. Nameplate vs start surge, why thin cords trip and heat, and when 12 AWG vs 10 AWG.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/best-extension-cord-for-air-compressor" },
  openGraph: { ...openGraphImage, title, description, url: "/best-extension-cord-for-air-compressor" },
};

export default function AirCompressorPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/best-extension-cord-for-air-compressor",
        })}
      />
      <GuideHero
        kicker="Compressor"
        title="Extension cord sizing for a 15 A air compressor"
        dek="A pancake, hot-dog, or wheelbarrow compressor is usually a 15 A, 120 V motor that starts hard. Size the cord for nameplate amps and the feet to the outlet — not for a yellow jacket that says heavy duty."
      />

      <div className="prose-cord mt-10">
        <p>
          Read the plate on <em>your</em> compressor. Most portable 120 V units land at 13–15 A
          while they are pumping. That number is running draw, not the first instant the motor
          tries to spin the pump. Start surge (locked-rotor amps) is several times the nameplate.
          A cord already sagging at 15 A sags more on that hit. The motor groans, the breaker or
          GFCI trips, the jacket warms, and people blame the compressor.
        </p>
        <p>
          Many manuals say “do not use an extension cord.” That is the honest first answer: move
          the compressor to the outlet, or put a receptacle closer. If the hose is what has to
          travel, let it. This page is the gauge × length table for when a cord is still the only
          way to reach the work — the same 15 A, 120 V world as a{" "}
          <Link href="/best-extension-cord-for-circular-saw">circular saw</Link> or{" "}
          <Link href="/best-extension-cord-for-table-saw">table saw</Link>. Larger 20 A or 240 V
          shop compressors want a dedicated circuit, not a 15 A outdoor reel.
        </p>

        <h2>Shop picks for a 15 A compressor</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Run</th>
                <th>Shop pick</th>
                <th>14 AWG at 15 A</th>
                <th>12 AWG at 15 A</th>
                <th>10 AWG at 15 A</th>
              </tr>
            </thead>
            <tbody>
              {([25, 50, 100] as const).map((lengthFt) => (
                <tr key={lengthFt}>
                  <td>{lengthFt} ft</td>
                  <td className="pick">{recommendAwg(15, lengthFt)} AWG</td>
                  <td>{formatDrop(14, 15, lengthFt)}</td>
                  <td>{formatDrop(12, 15, lengthFt)}</td>
                  <td>{formatDrop(10, 15, lengthFt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Same copper planning math as the{" "}
          <Link href="/extension-cord-gauge-chart">master chart</Link> — NEC Chapter 9 Table 8
          resistances on 120 V, not a lab score for a named reel. At 25 and 50 feet,{" "}
          {recommendAwg(15, 25)} AWG is the default. Start surge is why we do not shop 14 AWG as
          the “close enough” compressor cord — see{" "}
          <Link href="/12-vs-14-gauge-extension-cord">12 vs 14</Link>. At 100 feet,{" "}
          {recommendAwg(15, 100)} AWG is the honest 15 A answer — the{" "}
          <Link href="/100-foot-extension-cord-gauge">100-foot guide</Link> and{" "}
          <Link href="/10-vs-12-gauge-extension-cord">10 vs 12</Link>.
        </p>
        <Callout title="16 AWG is not a compressor cord" tone="warn">
          Light-duty 16 AWG cords are for lamps and chargers. A 15 A compressor will heat them and
          trip breakers on the first start. If the only cord in the truck is 16 AWG, move the
          compressor to the outlet. Do not “just fill the tank.”
        </Callout>

        <h2>Why a thin cord trips and heats</h2>
        <p>
          Voltage drop is a resistor you can hold. On start, the motor asks for more current than
          the nameplate. A thin, long cord drops more volts, so the motor sees less voltage when
          it needs more amps. Current stays high, copper I²R heat rises along the run, contacts
          warm, and a 15 A breaker or garage GFCI opens. The jacket can be warm the whole length,
          not just at a loose plug. That is a gauge-and-length problem, not a “weak compressor.”
        </p>
        <p>
          Leaving the reel coiled under that load makes it worse. Unspool what you are using. Two
          thin 50-foot cords chained together are a 100-foot drop plus extra contacts — buy one
          cord in the gauge the load wants.
        </p>

        <h2>12 AWG default, 10 AWG on long runs</h2>
        <p>
          12 AWG is the shop default for a 15 A portable compressor at 25–50 feet: one reel that
          can take the start hit without being the weak link. Step up to 10 AWG when the run is a
          full 100 feet, when lights already dip on a 12 AWG start, or when the compressor lives
          on the cord all day instead of a temporary reach.{" "}
          <Link href="/12-vs-14-gauge-extension-cord">14 AWG</Link> is already the wrong aisle
          for a hard-starting 15 A motor past a short run.
        </p>

        <h2>Circuit and jacket, not just AWG</h2>
        <ul>
          <li>
            A 15 A compressor wants a 15 A or 20 A circuit that is not already running a heater, a
            dust collector, or a saw. Two 15 A motors on one 15 A breaker is how garages invent
            trips.
          </li>
          <li>GFCI protection in garages and outdoors is normal. A thicker cord does not fix a tired GFCI.</li>
          <li>
            Match the plug to the receptacle. Filing a 20 A blade to fit 15 A is how people invent
            a fire.
          </li>
          <li>
            Driveway and open-door work needs an outdoor-rated jacket in the gauge you already
            chose — <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW</Link>, not a thinner
            indoor cord with a weather story on the hang tag.
          </li>
        </ul>

        <h2>Signs the cord is too thin</h2>
        <ul>
          <li>The motor hums and will not start, or it starts only with an empty tank.</li>
          <li>Lights on the same circuit dip when the compressor kicks on.</li>
          <li>The breaker or GFCI trips on start, then holds if you plug in at the wall.</li>
          <li>The cord jacket is warm along the run, not just at a loose plug.</li>
        </ul>
        <p>
          Those signs can also mean a bad capacitor, a seized pump, or a tank that will not drain.
          Check the compressor. Then check gauge and length.
        </p>

        <h2>What “best” does not mean here</h2>
        <p>
          We are not ranking brands and we do not have a 9.4. A 12 AWG, 50-foot, SJTW cord with
          intact 15 A ends from a known listing is the product for a typical portable compressor.
          Brand paint, lighted ends, and a retractable reel are convenience. They are not a
          substitute for copper, and a 16 AWG “heavy duty” outdoor reel is still 16 AWG.
        </p>
      </div>
      <RelatedGuides except="/best-extension-cord-for-air-compressor" />
    </article>
  );
}
