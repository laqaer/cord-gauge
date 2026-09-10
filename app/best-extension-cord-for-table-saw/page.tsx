import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "Best extension cord for a table saw (15 A)";
const description =
  "Extension cord gauge for a 15 A table saw. Why 16 AWG is wrong, when 12 AWG is the shop default, and when 10 AWG is the honest long run.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/best-extension-cord-for-table-saw" },
  openGraph: { ...openGraphImage, title, description, url: "/best-extension-cord-for-table-saw" },
};

export default function TableSawPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/best-extension-cord-for-table-saw",
        })}
      />
      <GuideHero
        kicker="Table saw"
        title="Extension cord sizing for a 15 A table saw"
        dek="A contractor or jobsite table saw is usually a 15 A, 120 V motor that sits in the middle of the shop. Size the cord for nameplate amps and the feet to the outlet — not for a yellow jacket that says heavy duty."
      />

      <div className="prose-cord mt-10">
        <p>
          Read the plate on <em>your</em> saw. Most portable contractor and jobsite saws land at
          13–15 A on 120 V. That number is running draw in a cut, not the first instant the arbor
          comes up. A table saw has more rotating mass than a{" "}
          <Link href="/best-extension-cord-for-circular-saw">circular saw</Link>, so start surge
          is uglier. A cord already sagging at nameplate sags more on spin-up. The blade comes up
          slow, the motor heats, and people blame the saw.
        </p>
        <p>
          Cabinet and many hybrid saws are a different product: 240 V, often 20 A or more, and they
          want a dedicated circuit — not a 15 A outdoor reel. If the nameplate is 240 V, stop
          shopping extension cords and wire the receptacle. This page is the 15 A, 120 V shop load.
        </p>

        <h2>Shop picks for a 15 A table saw</h2>
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
          {recommendAwg(15, 25)} AWG is the pick. A table saw often lives on a 50-foot cord because
          the outlet is on the wall and the outfeed is in the aisle. That is a 12 AWG job. At 100
          feet, {recommendAwg(15, 100)} AWG is the honest 15 A answer — see the{" "}
          <Link href="/100-foot-extension-cord-gauge">100-foot guide</Link>.
        </p>
        <Callout title="16 AWG is not a saw cord" tone="warn">
          Light-duty 16 AWG cords are for lamps and chargers. A 15 A table saw will heat them and
          trip breakers. If the only cord in the shop is 16 AWG, move the saw to the outlet or get
          thicker copper. Do not “just rip this one sheet.”
        </Callout>

        <h2>12 AWG vs 10 AWG</h2>
        <p>
          <Link href="/12-vs-14-gauge-extension-cord">14 AWG</Link> is close on paper at 25 feet
          and already the wrong aisle at 50 for a motor that runs a long rip. 12 AWG is the default
          shop cord: one reel that can feed the saw without being the weak link. Step up to 10 AWG
          when the run is a full 100 feet, when lights already dip on a 12 AWG start, or when you
          are treating the cord as permanent shop wiring instead of a temporary reach.
        </p>
        <p>
          Miter saws in the same 15 A class follow the same gauge × length table. The table saw is
          just the one people leave parked on a long cord all afternoon.
        </p>

        <h2>Circuit and jacket, not just AWG</h2>
        <ul>
          <li>
            A 15 A saw wants a 15 A or 20 A circuit that is not already running a space heater or
            a dust collector. Two 15 A motors on one 15 A breaker is how shops invent trips.
          </li>
          <li>GFCI protection in garages is normal. A thicker cord does not fix a tired GFCI.</li>
          <li>
            Match the plug to the receptacle. Filing a 20 A blade to fit 15 A is how people invent
            a fire.
          </li>
          <li>
            Driveway and open-door shop work needs an outdoor-rated jacket in the gauge you already
            chose —{" "}
            <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW</Link>, not a thinner indoor cord
            with a weather story on the hang tag.
          </li>
        </ul>

        <h2>Signs the cord is too thin</h2>
        <ul>
          <li>The blade takes a long time to come up to speed, then sags again in a normal rip.</li>
          <li>Lights on the same circuit dip when the saw starts.</li>
          <li>The cord jacket is warm along the run, not just at a loose plug.</li>
          <li>The saw smells hot after a short session that used to be easy on a short factory cord.</li>
        </ul>
        <p>
          Those signs can also mean a dull blade, a misaligned fence, or a binding cut. Check the
          saw. Then check gauge and length. Unspool the reel — a coiled 12 AWG cord under a 15 A
          load is a heat problem of its own.
        </p>

        <h2>What “best” does not mean here</h2>
        <p>
          We are not ranking brands and we do not have a 9.4. A 12 AWG, 50-foot, SJTW cord with
          intact 15 A ends from a known listing is the product for a typical contractor saw. Brand
          paint, lighted ends, and a retractable reel are convenience. They are not a substitute
          for copper, and a 16 AWG “heavy duty” outdoor reel is still 16 AWG.
        </p>
      </div>
      <RelatedGuides except="/best-extension-cord-for-table-saw" />
    </article>
  );
}
