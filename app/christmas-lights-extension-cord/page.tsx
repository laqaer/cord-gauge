import type { Metadata } from "next";
import Link from "next/link";
import { AmazonLink } from "@/components/amazon-link";
import { Callout } from "@/components/callout";
import { guideFaq } from "@/components/guide-faq";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { ShopBuyLine } from "@/components/shop-cords";
import { amazonSearchUrl } from "@/lib/affiliates";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const path = "/christmas-lights-extension-cord";
const title = "Christmas lights extension cord";
const description =
  "Christmas lights extension cord: when a 16 AWG outdoor cord is enough, when to step up to 12 AWG, and why outdoor lights want a GFCI receptacle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraphImage, title, description, url: path },
};

const faq = guideFaq([
  {
    question: "What extension cord should Christmas lights use?",
    answer:
      "Add the wattage printed on each string and divide by 120 to get amps. A 16 AWG outdoor cord is enough when that total stays inside the cord's marked amps, commonly 10–13 A, on a short run. Outdoor lights need a weather-resistant jacket (the W in SJTW) and a GFCI-protected receptacle. A heavier total, or a long run shared with a tool, steps up to 12 AWG.",
  },
  {
    question: "When is 16 AWG enough for Christmas lights?",
    answer:
      "When the strings' labeled watts, added together, stay at or under the amps marked on the 16 AWG cord, and the run is a yard lead rather than a 100-foot reel shared with a tool. A string labeled 40 W is 40 divided by 120, one-third of an amp. Ten of those are about 3.3 A, which fits a cord marked 10–13 A. Incandescent sets can leave that mark quickly. Use the labels on your strings.",
  },
  {
    question: "Do outdoor Christmas lights need an SJTW cord and GFCI?",
    answer:
      "Outdoor lights need a weather-resistant jacket and a GFCI-protected receptacle. The W in SJTW is the weather letter. Those jacket letters do not change the copper size. A multi-outlet cord's marked amps are the total of every socket, not a separate budget for each one.",
  },
]);

export default function ChristmasLightsCordPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path,
          dateModified: "2026-11-24",
        })}
      />
      {faq.script}
      <GuideHero
        kicker="Outdoor lights"
        title="Christmas lights extension cord"
        dek="A 16 AWG outdoor cord is enough when the strings' labeled watts stay inside that cord's marked amps. Use a W or SJTW jacket on a GFCI receptacle."
        reviewedLabel="November 24, 2026"
      />

      <div className="prose-cord mt-10">
        <p>
          Christmas lights are a wattage-addition problem. Read the label on each string, add the
          watts, and divide by 120. That sum is the load on the cord. The cord has to be marked for
          at least that many amps, and the whole string of lights has to stay inside it.
        </p>
        <p>
          Outdoor use wants a weather-resistant jacket. The{" "}
          <Link href="/outdoor-extension-cord-gauge-sjtw">outdoor extension cord and SJTW page</Link>{" "}
          explains those letters. Ordinary outdoor cord sets are listed to UL 817. Flexible-cord
          ampacity is NEC Table 400.5(A)(1); the mark on the jacket is the number to stay under.
        </p>
        <p>{"Holiday prices change daily. Check today's price on Amazon before you buy."}</p>

        <h2>Light load, cord, and length</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Load</th>
                <th>Length</th>
                <th>Cord</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inside the 16 AWG mark, commonly 10–13 A</td>
                <td>25–50 ft</td>
                <td>16 AWG outdoor (W or SJTW) on a GFCI receptacle</td>
              </tr>
              <tr>
                <td>A few amps of lights, a long run</td>
                <td>100 ft</td>
                <td>16 AWG can still fit. Step up to 12 AWG as the total nears the cord mark.</td>
              </tr>
              <tr>
                <td>Above the 16 AWG mark, or shared with a tool</td>
                <td>Any</td>
                <td>12 AWG or the gauge the load chart picks</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A string labeled 40 W draws one-third of an amp (40 ÷ 120). Ten of them are about 3.3 A.
          That example is arithmetic from a label, not a claim about a set you own. Incandescent
          bulbs add watts much faster than LED strings. Add the labels in your hand.
        </p>
        <p>
          Shop-tool amps and long runs are on the{" "}
          <Link href="/extension-cord-gauge-chart">extension cord gauge chart</Link> and the{" "}
          <Link href="/extension-cord-gauge-calculator">extension cord gauge calculator</Link>.
          Those pages start at tool nameplates. Use them when the light cord is also feeding a saw
          or another motor.
        </p>
        <p>
          Search 16 AWG outdoor cords for a light-string run.{" "}
          <AmazonLink
            href={amazonSearchUrl("16 AWG outdoor extension cord SJTW")}
            label="16 AWG outdoor extension cord SJTW"
          >
            {"Check today's price"}
          </AmazonLink>.{" "}
          CordGauge has not checked a 16 AWG listing, so this is a search, not a named product.
        </p>
        <ShopBuyLine awg={12} lengthFt={50} linkLabel="Check today's price">
          When the lights outgrow 16 AWG, 50 ft 12 AWG SJTW is the checked outdoor cord.
        </ShopBuyLine>
        <p>
          Search multi-outlet outdoor cords.{" "}
          <AmazonLink
            href={amazonSearchUrl("outdoor extension cord multi outlet SJTW")}
            label="outdoor extension cord multi outlet SJTW"
          >
            {"Check today's price"}
          </AmazonLink>.
        </p>
        <Callout title="The cord mark is the total of every socket" tone="warn">
          A three-outlet cord marked 13 A can feed 13 A altogether. It cannot feed 13 A from each
          socket. Plug outdoor lights into a GFCI-protected receptacle. A thicker cord does not
          repair a receptacle that has no GFCI.
        </Callout>
        {faq.answers}
      </div>
      <RelatedGuides except={path} />
    </article>
  );
}
