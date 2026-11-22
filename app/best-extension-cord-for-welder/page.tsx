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

const path = "/best-extension-cord-for-welder";
const title = "Extension cord for a welder";
const description =
  "Extension cord for a welder: use the nameplate input amps, keep the cord short, and step from 12 AWG to 10 AWG or 8 AWG as the input rises.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraphImage, title, description, url: path },
};

const faq = guideFaq([
  {
    question: "What gauge extension cord for a welder?",
    answer:
      "Use the input amps printed on the welder, and keep the cord as short as the work allows. A small 120 V welder whose input is within the cord's mark can use 12 AWG on a short lead. A 120 V welder near 20 A, or any longer lead, wants 10 AWG with the matching plug. A 240 V welder wants a cord marked for that input and that plug. 10 AWG is common on a short moderate lead, and 8 AWG when the nameplate or the manufacturer calls for it. If the manual says not to use an extension cord, follow the manual.",
  },
  {
    question: "Can a 12 AWG cord run a 120 V welder?",
    answer:
      "Only when the nameplate input is within the amps marked on that 12 AWG cord, the plug matches the receptacle, and the lead stays short. A cord with a 15 A plug is a 15 A cord. A 50-foot 12 AWG shop cord is a long lead for a welder. Shorter is the better plan. Follow the welder manufacturer.",
  },
  {
    question: "Does duty cycle allow a thinner welder cord?",
    answer:
      "No. Duty cycle is the share of time the welder can weld before it rests. While the arc is on, the cord carries the input current. Duty cycle does not raise the cord's amp mark.",
  },
  {
    question: "Are weld-output amps the cord load?",
    answer:
      "No. The advertised weld-output amps are the current in the weld, at welding voltage. The cord carries the input amps printed on the nameplate. Size the cord from that input number.",
  },
]);

export default function WelderCordPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd data={articleJsonLd({ headline: title, description, path })} />
      {faq.script}
      <GuideHero
        kicker="Welder"
        title="Extension cord for a welder"
        dek="Read the welder's input amps. Keep the cord short: 12 AWG only for a small 120 V welder inside the cord's mark, otherwise 10 AWG or 8 AWG."
      />

      <div className="prose-cord mt-10">
        <p>
          The cord load is the input amps on the welder nameplate. Weld-output amps are the current
          in the weld, at a lower voltage. This page does not rank brands and it has no score.
        </p>
        <p>
          Voltage drop on a welder shows up as a weak arc. Keep the lead short so the drop stays
          small. Flexible-cord ampacity is NEC Table 400.5(A)(1). The plug and the jacket mark are
          the limit you can use. If the welder manual forbids an extension cord, follow the manual.
        </p>

        <h2>Input, length, and gauge</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Welder supply</th>
                <th>Length</th>
                <th>Cord</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>120 V, input within a 15 A cord mark</td>
                <td>As short as the job allows</td>
                <td>12 AWG minimum, plug matches the receptacle</td>
              </tr>
              <tr>
                <td>120 V, near 20 A, or a longer lead</td>
                <td>Short</td>
                <td>10 AWG, ends rated for that circuit</td>
              </tr>
              <tr>
                <td>240 V, moderate nameplate input</td>
                <td>As short as possible</td>
                <td>10 AWG if the cord is marked for those amps and that plug</td>
              </tr>
              <tr>
                <td>Nameplate above the 10 AWG cord mark</td>
                <td>As short as possible</td>
                <td>8 AWG, or the cord the manufacturer specifies</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          “Moderate” and “near 20 A” are common-practice bands, not a second nameplate. If two
          gauges both seem plausible, use the heavier one the cord maker marks for the plug. Shop
          120 V math for ordinary tools is on the{" "}
          <Link href="/extension-cord-gauge-chart">extension cord gauge chart</Link> and the{" "}
          <Link href="/extension-cord-gauge-calculator">extension cord gauge calculator</Link>.
          Those pages stop at 15 A, 120 V. A 240 V welder is outside that grid.
        </p>
        <p>
          CordGauge has not checked a welder-cord listing. The household cords checked on this site
          are 12 AWG SJTW leads marked 15 A, at 50 and 100 feet. That length is the wrong plan for
          a welder, so they are not linked here.{" "}
          <AmazonLink
            href={amazonSearchUrl("10 gauge welder extension cord")}
            label="10 gauge welder extension cord"
          >
            Search 10 AWG welder cords.
          </AmazonLink>{" "}
          <AmazonLink
            href={amazonSearchUrl("8 gauge welder extension cord 240V")}
            label="8 gauge welder extension cord 240V"
          >
            Search 8 AWG welder cords.
          </AmazonLink>
        </p>
        <Callout title="Follow the welder manual" tone="warn">
          Use a cord the manufacturer rates for the input amps and the plug. A 15 A household cord
          on a 240 V welder is the wrong plug and the wrong current. Duty cycle lets the machine
          rest. It does not let the cord carry more than its mark while you are welding.
        </Callout>
        {faq.answers}
      </div>
      <RelatedGuides except={path} />
    </article>
  );
}
