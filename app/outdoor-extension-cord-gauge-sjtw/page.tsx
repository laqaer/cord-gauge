import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/callout";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const title = "Outdoor extension cord gauge and SJTW";
const description =
  "What SJTW means on an outdoor extension cord, how jacket type differs from AWG, and how to size outdoor shop runs by amps and length.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/outdoor-extension-cord-gauge-sjtw" },
  openGraph: { ...openGraphImage, title, description, url: "/outdoor-extension-cord-gauge-sjtw" },
};

export default function OutdoorSjtwPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path: "/outdoor-extension-cord-gauge-sjtw",
        })}
      />
      <GuideHero
        kicker="Outdoor / SJTW"
        title="SJTW is the jacket. AWG is still the wire."
        dek="Outdoor-rated cords keep water and sunlight from eating the insulation. They do not add copper. Size outdoor runs the same way you size indoor ones: amps, then length, then gauge."
      />

      <div className="prose-cord mt-10">
        <p>
          The letters printed on a portable cord are a type designation, not a quality score.{" "}
          <strong>SJTW</strong> is the common big-box outdoor cord: junior hard-service,
          thermoplastic insulation, weather-resistant. That is useful on a wet deck or a winter
          jobsite. It is silent about whether 14 AWG is thick enough for your saw at 75 feet.
        </p>

        <h2>How to read the letters</h2>
        <p>Approximate decoder for what you actually see on shop cords. The listing on the jacket wins if it disagrees with a blog.</p>
        <ul>
          <li>
            <strong>S</strong> — hard service (600 V class). <strong>SJ</strong> — junior hard
            service (300 V class). Extension cords on 120 V tools are usually SJ*.
          </li>
          <li>
            <strong>T</strong> — thermoplastic jacket (the usual PVC-style outdoor cord). Omitted
            or other letters can mean rubber / thermoset, which stays limber in the cold.
          </li>
          <li>
            <strong>W</strong> — weather-resistant / outdoor-rated. This is the letter people mean
            by “outdoor cord.”
          </li>
          <li>
            <strong>O</strong> or <strong>OO</strong> — oil-resistant jacket, or jacket and
            insulation. Useful around a shop floor; still not a gauge upgrade.
          </li>
        </ul>
        <p>
          So <strong>SJTW</strong> is junior + thermoplastic + weather. <strong>SJTOW</strong> adds
          oil resistance. <strong>SOOW</strong> is the heavier, more flexible-in-cold family you
          see on better jobsite reels. None of those letters change AWG.
        </p>
        <Callout title="Indoor SJT stays indoors" tone="warn">
          A cord without W is not an outdoor cord, even if it is 12 AWG and bright orange. Water
          and UV attack the jacket. Use an outdoor listing outside, then unplug and store it so
          the reel is not a puddle.
        </Callout>

        <h2>Pick gauge first, jacket second</h2>
        <ol>
          <li>
            Nameplate amps and run length — start on the{" "}
            <Link href="/extension-cord-gauge-chart">gauge chart</Link>.
          </li>
          <li>
            Motor tools at 50–100 feet:{" "}
            <Link href="/12-vs-14-gauge-extension-cord">12 vs 14</Link> or the{" "}
            <Link href="/100-foot-extension-cord-gauge">100-foot page</Link>.
          </li>
          <li>Then buy that AWG in SJTW (or a harder outdoor type) if the cord will see weather.</li>
        </ol>
        <p>
          A 16 AWG SJTW Halloween-light cord is correctly outdoor-rated and still the wrong product
          for a <Link href="/best-extension-cord-for-circular-saw">15 A circular saw</Link>.
        </p>

        <h2>Outdoor use that is not “just add SJTW”</h2>
        <ul>
          <li>GFCI protection is the outdoor/garage rule in modern work. A thick cord is not a GFCI.</li>
          <li>Do not bury an SJTW cord as if it were UF or conduit. Portable cord is portable.</li>
          <li>Keep connections off the ground where you can. A listed-while-wet connector is a product, not a hope.</li>
          <li>Cold weather stiffens thermoplastic. If you work winters, a rubber outdoor type is a comfort buy, not a voltage-drop buy.</li>
        </ul>

        <h2>What we are not claiming</h2>
        <p>
          We are not a UL listing, and we are not going to invent a “best SJTW brand.” If two
          outdoor cords share AWG, length, and a real listing mark, choose the one you can inspect:
          intact jacket, strain relief that still holds, ends that match the receptacle. Replace a
          cracked outdoor cord. The W letter does not last forever in the sun.
        </p>
      </div>
      <RelatedGuides except="/outdoor-extension-cord-gauge-sjtw" />
    </article>
  );
}
