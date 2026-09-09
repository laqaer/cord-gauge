import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "Best extension cord for a circular saw (15 A)";
const description =
  "Extension cord gauge for a 15 A circular saw. Why 12 AWG is the default, when 14 AWG is only a short-run cord, and why 16 AWG is the wrong aisle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/best-extension-cord-for-circular-saw" },
  openGraph: { ...openGraphImage, title, description, url: "/best-extension-cord-for-circular-saw" },
};

export default function CircularSawPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/best-extension-cord-for-circular-saw",
        })}
      />
      <GuideHero
        kicker="15 A saws"
        title="Extension cord sizing for a 15 A circular saw"
        dek="Most sidewinder circular saws are 13–15 A on the nameplate. Size the cord for that number and the feet to the outlet — not for how easy the first rip felt."
      />

      <div className="prose-cord mt-10">
        <p>
          A circular saw is a motor. Nameplate amps are the continuous-ish draw in a cut. Starting
          and a pinched blade pull more, briefly. A cord that is already dropping several volts at
          nameplate will drop more when the motor asks for inrush. The blade slows, the saw heats,
          and people blame the tool.
        </p>
        <p>
          Read the plate on <em>your</em> saw. If it says 15 A, use the 15 A row. If it says 13 A,
          you still should not shop 16 AWG. Worm-drive and large-beam saws can sit at the top of
          the 15 A cord world; treat them as 15 A plus a long-run problem.
        </p>

        <h2>Shop picks for a 15 A saw</h2>
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
          At 25 feet, 12 AWG is the conservative pick even though 14 AWG is close on paper. Motors
          forgive less than a work light. At 50 feet, buy 12 AWG. At 100 feet, 10 AWG is the honest
          15 A answer — details in the{" "}
          <Link href="/100-foot-extension-cord-gauge">100-foot guide</Link>.
        </p>
        <Callout title="16 AWG is not a saw cord" tone="warn">
          Light-duty 16 AWG cords are for lamps and chargers. A 15 A saw will push them into heat
          and trip territory. If the only cord in the truck is 16 AWG, move the saw to the outlet
          or get a thicker reel — do not “just finish the cut.”
        </Callout>

        <h2>Circuit and outlet, not just AWG</h2>
        <ul>
          <li>A 15 A saw wants a 15 A or 20 A circuit that is not already running a space heater.</li>
          <li>GFCI protection outdoors and in garages is normal. A failing GFCI is not fixed by a thicker cord.</li>
          <li>
            The cord plug must match the receptacle. Filing a 20 A plug to fit 15 A is how people
            invent a fire.
          </li>
          <li>
            Outdoor cuts need an outdoor-rated jacket. That is{" "}
            <Link href="/outdoor-extension-cord-gauge-sjtw">SJTW</Link>, in the gauge you already
            chose.
          </li>
        </ul>

        <h2>Signs the cord is too thin</h2>
        <ul>
          <li>Lights on the same circuit dip when the saw starts.</li>
          <li>The blade speed falls in a normal cut, then recovers when you unload.</li>
          <li>The cord jacket is warm along the run, not just at a bad connection.</li>
          <li>The saw smells hot after a short session that used to be easy on a short factory cord.</li>
        </ul>
        <p>
          Those signs can also mean a dull blade or a binding cut. Check the blade. Then check
          gauge and length. The{" "}
          <Link href="/12-vs-14-gauge-extension-cord">12 vs 14 comparison</Link> is the usual
          hardware-store fork.
        </p>

        <h2>What “best” does not mean here</h2>
        <p>
          We are not ranking brands and we do not have a 9.4. A 12 AWG, 50-foot, SJTW cord with
          intact 15 A ends from a known listing is the product. Brand paint, lighted ends, and a
          hanging storage loop are convenience. They are not a substitute for copper.
        </p>
      </div>
      <RelatedGuides except="/best-extension-cord-for-circular-saw" />
    </article>
  );
}
