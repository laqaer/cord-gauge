import type { Metadata } from "next";
import Link from "next/link";
import { AmazonLink } from "@/components/amazon-link";
import { Callout } from "@/components/callout";
import { guideFaq } from "@/components/guide-faq";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { amazonSearchUrl } from "@/lib/affiliates";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";

const path = "/ev-charger-extension-cord";
const title = "EV charger extension cord";
const description =
  "EV charger extension cord: most EVSE makers say not to use a household cord. Where a cord is allowed, use a short outdoor 12 AWG or heavier cord, or a UL-listed J1772 extension.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraphImage, title, description, url: path },
};

const faq = guideFaq([
  {
    question: "Can you use an extension cord for EV charging?",
    answer:
      "Most EVSE manufacturers say no. Follow that instruction. Where the manual allows a cord, use a short outdoor-rated cord of 12 AWG or heavier, and stay inside the cord's marked amps. A UL-listed J1772 extension is a different product from a household cord, and it is still only appropriate when the vehicle maker allows it.",
  },
  {
    question: "What is a J1772 extension cord?",
    answer:
      "A J1772 extension is a cable assembly with SAE J1772 connectors, the coupler most North American Level 1 and Level 2 stations use on the car. It is a listed EV cord, not a household extension cord. Use a UL-listed one, and only where the EVSE maker allows an extension.",
  },
  {
    question: "Can a Tesla mobile connector use an extension cord?",
    answer:
      "Follow the mobile connector instructions that shipped with the unit. If they disallow a household extension cord, do not add one. A UL-listed extension made for that connector is a different product, and it is allowed only when those instructions say so.",
  },
  {
    question: "What does Level 1 charging draw on a 15 A circuit?",
    answer:
      "Level 1 charging on a 15 A circuit is commonly set to 12 A continuous. NEC continuous-load sizing uses 125 percent: 12 A times 1.25 is 15 A, which fills a 15 A circuit. Some EVSEs can be set lower. The setting on the unit and the breaker win. NEC Article 625 covers electric vehicle power transfer.",
  },
]);

export default function EvChargerCordPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd data={articleJsonLd({ headline: title, description, path })} />
      {faq.script}
      <GuideHero
        kicker="EV charging"
        title="EV charger extension cord"
        dek="Most EV charger makers say do not use a household extension cord. If the manual allows one, use a short outdoor cord of 12 AWG or heavier, or a UL-listed J1772 extension."
      />

      <div className="prose-cord mt-10">
        <p>
          The safe answer is the one printed in the EVSE manual. Most makers tell you not to put a
          household extension cord between the receptacle and the charger. Heat at a weak plug is
          the failure they are avoiding, and a cord that is too light makes it worse. Where the
          manual allows a cord, use a short outdoor-rated cord of 12 AWG or heavier, and stay
          inside the amps marked on that cord.
        </p>
        <p>
          NEC Article 625 covers electric vehicle power transfer. A household cord set is a UL 817
          product with a plug rating, often 15 A. That is a different piece of equipment from a
          UL-listed J1772 extension. Flexible-cord ampacity for the household cord is still NEC
          Table 400.5(A)(1), and the jacket mark is the limit.
        </p>

        <h2>What to use</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Situation</th>
                <th>Cord</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Manual says not to use an extension</td>
                <td>Do not add one. Move the car or have a receptacle installed.</td>
              </tr>
              <tr>
                <td>Manual allows a household cord</td>
                <td>Short, outdoor-rated, 12 AWG or heavier, within the cord mark</td>
              </tr>
              <tr>
                <td>J1772 extension</td>
                <td>UL-listed J1772 assembly the vehicle or EVSE maker allows</td>
              </tr>
              <tr>
                <td>Level 1 on a 15 A circuit</td>
                <td>Commonly 12 A continuous. 12 × 1.25 = 15, so the circuit is full.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Level 1 is the 120 V cord that comes with many cars. Continuous-load practice is why that
          equipment is commonly limited to 12 A on a 15 A circuit. Confirm the setting on your
          EVSE. Some units can charge at a lower current. Ordinary 120 V gauge math, for loads the
          chart covers, is on the{" "}
          <Link href="/extension-cord-gauge-chart">extension cord gauge chart</Link> and the{" "}
          <Link href="/extension-cord-gauge-calculator">extension cord gauge calculator</Link>.
        </p>
        <p>
          The household cords checked on this site are 50-foot and 100-foot 12 AWG leads. That is
          not a short EV lead, so they are not linked on this page.{" "}
          <AmazonLink
            href={amazonSearchUrl("12 AWG outdoor extension cord short")}
            label="12 AWG outdoor extension cord short"
          >
            Search short 12 AWG outdoor cords.
          </AmazonLink>{" "}
          <AmazonLink
            href={amazonSearchUrl("UL listed J1772 extension cord")}
            label="UL listed J1772 extension cord"
          >
            Search UL-listed J1772 extensions.
          </AmazonLink>
        </p>
        <Callout title="Follow the EVSE manufacturer" tone="warn">
          If the manual disallows an extension cord, a heavier household cord is still disallowed.
          A UL-listed J1772 extension is the product to look for only when the maker allows an
          extension. Outdoor charging belongs on a GFCI-protected receptacle where the installation
          requires one.
        </Callout>
        {faq.answers}
      </div>
      <RelatedGuides except={path} />
    </article>
  );
}
