import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "Best extension cord for a pressure washer (15 A)";
const description =
  "Extension cord gauge for a 13–15 A electric pressure washer. Why outdoor SJTW matters, why thin cords trip and heat, and when 12 AWG vs 10 AWG on a driveway.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/best-extension-cord-for-pressure-washer" },
  openGraph: { ...openGraphImage, title, description, url: "/best-extension-cord-for-pressure-washer" },
};

export default function PressureWasherPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/best-extension-cord-for-pressure-washer",
        })}
      />
      <GuideHero
        kicker="Pressure washer"
        title="Extension cord sizing for a 15 A pressure washer"
        dek="A typical electric pressure washer is a 13–15 A, 120 V motor that lives outdoors. Size the cord for the nameplate and the feet to the outlet — then buy that gauge in an SJTW jacket."
      />

      <div className="prose-cord mt-10">
        <p>
          Read the plate on <em>your</em> washer. Most consumer electric units land at 13–15 A on
          120 V while the pump is running. That number is continuous-ish draw under spray, not the
          first instant the motor spins up. Start surge is uglier, same as an{" "}
          <Link href="/best-extension-cord-for-air-compressor">air compressor</Link>. A cord already
          sagging at nameplate sags more on that hit. Pressure falls, the motor heats, the outdoor
          GFCI trips, and people blame the washer.
        </p>
        <p>
          Gas washers are a different product: they do not want an extension cord. Some larger
          electric units are 20 A or 240 V and want a dedicated receptacle, not a 15 A outdoor
          reel. This page is the 13–15 A, 120 V driveway load. Many manuals say use the shortest
          cord you can, or none. If the hose can reach from an outlet, let the hose travel.
        </p>

        <h2>Shop picks for a 15 A electric washer</h2>
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
          {recommendAwg(15, 25)} AWG is the default. A short 14 AWG run is close on paper and still
          the wrong aisle for a motor that runs the whole driveway — see{" "}
          <Link href="/12-vs-14-gauge-extension-cord">12 vs 14</Link>. At 100 feet,{" "}
          {recommendAwg(15, 100)} AWG is the honest 15 A answer — the{" "}
          <Link href="/100-foot-extension-cord-gauge">100-foot guide</Link> and{" "}
          <Link href="/10-vs-12-gauge-extension-cord">10 vs 12</Link>.
        </p>
        <Callout title="16 AWG is not a washer cord" tone="warn">
          Light-duty 16 AWG cords are for lamps and chargers. A 13–15 A washer will heat them and
          trip the outdoor GFCI. If the only cord in the garage is 16 AWG, move the washer to the
          outlet or get thicker copper. Do not “just finish the driveway.”
        </Callout>

        <h2>Why a thin cord trips and heats</h2>
        <p>
          Voltage drop is a resistor you can hold. On start, and again under a long spray, the
          motor asks for more current than a work light. A thin, long cord drops more volts, so
          the pump sees less voltage when it needs more amps. Current stays high, copper I²R heat
          rises along the run, wet contacts warm, and a garage or outdoor GFCI opens. The jacket
          can be warm the whole length, not just at a loose plug. That is a gauge-and-length
          problem, not a “weak washer.”
        </p>
        <p>
          Leaving the reel coiled under that load makes it worse. Unspool what you are using. Two
          thin 50-foot cords chained together are a 100-foot drop plus extra wet contacts — see{" "}
          <Link href="/daisy-chain-extension-cords">daisy-chaining</Link>. Buy one cord in the
          gauge the load wants.
        </p>

        <h2>Outdoor jacket is SJTW — not thicker copper</h2>
        <p>
          A pressure washer lives in spray, puddles, and sun. Buy a weather-rated jacket in the
          gauge you already chose: <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW</Link> (or
          a harder outdoor type). The W letter keeps water and UV from eating the insulation. It
          does not add copper. A 16 AWG “outdoor” Halloween-light reel is correctly outdoor-rated
          and still the wrong product. Keep connections off the wet concrete where you can. A
          thicker cord is not a GFCI.
        </p>

        <h2>12 AWG default, 10 AWG on a long driveway</h2>
        <p>
          12 AWG is the default for a 13–15 A electric washer at 25–50 feet: one outdoor reel that
          can take the start hit and a continuous spray without being the weak link. Step up to 10
          AWG when the run is a full 100 feet — house outlet to the far curb, a second bay, a
          boat — when lights already dip on a 12 AWG start, or when the washer lives on the cord
          all afternoon.{" "}
          <Link href="/12-vs-14-gauge-extension-cord">14 AWG</Link> is already the wrong aisle
          past a short run.
        </p>

        <h2>Circuit and wet work, not just AWG</h2>
        <ul>
          <li>
            A 15 A washer wants a 15 A or 20 A circuit that is not already running a heater or a
            compressor. Two 15 A motors on one 15 A breaker is how driveways invent trips.
          </li>
          <li>GFCI protection outdoors is normal. A thicker cord does not fix a tired GFCI.</li>
          <li>
            Match the plug to the receptacle. Filing a 20 A blade to fit 15 A is how people invent
            a fire.
          </li>
          <li>
            Indoor SJT stays indoors. Driveway work is{" "}
            <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW</Link> in the gauge you already
            chose.
          </li>
        </ul>

        <h2>Signs the cord is too thin</h2>
        <ul>
          <li>The motor hums and will not start, or pressure sags in a normal spray then recovers when you let off the trigger.</li>
          <li>Lights on the same circuit dip when the washer starts.</li>
          <li>The breaker or GFCI trips on start, then holds if you plug in at the wall.</li>
          <li>The cord jacket is warm along the run, not just at a loose or wet plug.</li>
        </ul>
        <p>
          Those signs can also mean a clogged nozzle, a kinked hose, or a tired GFCI. Check the
          washer. Then check gauge and length.
        </p>

        <h2>What “best” does not mean here</h2>
        <p>
          We are not ranking brands and we do not have a 9.4. A 12 AWG, 50-foot, SJTW cord with
          intact 15 A ends from a known listing is the product for a typical electric washer. Brand
          paint, lighted ends, and a retractable reel are convenience. They are not a substitute
          for copper, and a 16 AWG “heavy duty” outdoor reel is still 16 AWG.
        </p>
      </div>
      <RelatedGuides except="/best-extension-cord-for-pressure-washer" />
    </article>
  );
}
