import type { Metadata } from "next";
import Link from "next/link";
import { AmazonLink } from "@/components/amazon-link";
import { GaugePicker } from "@/components/gauge-picker";
import { ShopCords } from "@/components/shop-cords";
import { GuideHero } from "@/components/guide-hero";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { formatDrop, recommendAwg } from "@/lib/cords";
import { openGraphImage } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

const path = "/extension-cord-gauge-calculator";
const title = "Extension cord gauge calculator";
const description =
  "Extension cord gauge calculator for 10, 13, and 15 amp tools at 25, 50, and 100 feet. Copper voltage drop, the AWG pick, and a cord only when the listing matches.";

const faq = [
  {
    question: "What gauge extension cord do I need?",
    answer:
      "Read the tool nameplate amps and measure the run from the outlet to the tool. For a 15 A motor, CordGauge’s planning pick is 12 AWG up to 50 feet and 10 AWG at 100 feet. A lighter cord can be enough for a 10 A load on a short run. The amp rating printed on the cord still wins if it is lower than the gauge chart.",
  },
  {
    question: "Is 12 gauge or 14 gauge better for a circular saw?",
    answer:
      "For a 15 A circular saw, 12 AWG is the shop pick at 25 and 50 feet. At 50 feet and 15 A, 14 AWG drops about 4.6 V (3.8%) and 12 AWG drops about 2.9 V (2.4%). At 100 feet, 14 AWG is the wrong aisle and 10 AWG is the chart pick.",
  },
  {
    question: "Does an SJTW jacket mean a thicker cord?",
    answer:
      "No. SJTW is an outdoor jacket rating. A 16 AWG SJTW cord is still 16 AWG. Match amps and length first, then confirm the jacket is rated for where the cord will lie.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { ...openGraphImage, title, description, url: path },
};

export default function CalculatorPage() {
  const sawFifty = recommendAwg(15, 50);
  const sawHundred = recommendAwg(15, 100);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd data={articleJsonLd({ headline: title, description, path })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <GuideHero
        kicker="Calculator"
        title="Extension cord gauge from amps and length"
        dek="Enter the nameplate, not the box. The result is a copper planning pick for a 120 V cord, plus a product link only when we have checked that the listing is that gauge and length and can be bought."
      />

      <GaugePicker />

      <div className="prose-cord mt-10">
        <h2>Worked examples, without the form</h2>
        <p>
          Voltage drop here is the two-way path: 2 × length (ft) × amps × resistance (Ω per 1,000
          ft) ÷ 1,000. Resistance is uncoated copper from NEC Chapter 9, Table 8, at 75 °C. These
          are planning estimates, not a lab test of a named cord.
        </p>
        <ul>
          <li>
            15 A at 50 ft → {sawFifty} AWG, {formatDrop(12, 15, 50)} on 12 AWG and{" "}
            {formatDrop(14, 15, 50)} on 14 AWG.{" "}
            <AmazonLink asin="B00004SQF4" label="Southwire 12/3 SJTW 50 ft outdoor">
              50 ft 12 AWG SJTW is the usual shop buy.
            </AmazonLink>
          </li>
          <li>
            15 A at 100 ft → {sawHundred} AWG, {formatDrop(10, 15, 100)} on 10 AWG and{" "}
            {formatDrop(12, 15, 100)} on 12 AWG. We do not currently link a 10 AWG cord. The
            Southwire 100 ft cord is 12 AWG, so it is not that pick.{" "}
            <AmazonLink asin="B00004SQF5" label="Southwire 12/3 SJTW 100 ft outdoor" />
          </li>
          <li>
            10 A at 25 ft → {recommendAwg(10, 25)} AWG. A heavier cord will also carry it. We do
            not link a 16 AWG cord, because that is the light-duty aisle these guides tell you to
            leave for a saw.
          </li>
        </ul>
        <p>
          The full grid is the <Link href="/extension-cord-gauge-chart">gauge chart</Link>. A 15 A
          circular saw has its own notes on the{" "}
          <Link href="/best-extension-cord-for-circular-saw">saw page</Link>.
        </p>

        <h2>What this calculator will not do</h2>
        <ul>
          <li>It does not replace the tool nameplate or the amp rating molded into the cord.</li>
          <li>It does not cover 240 V tools, 20 A plugs, or a new branch circuit. Hire a licensed electrician for new wiring.</li>
          <li>It does not treat jacket color, “heavy duty,” or SJTW as a gauge.</li>
          <li>Two cords in series are a longer run plus another plug. See the daisy-chain page before you add a second cord.</li>
        </ul>

        <h2>Questions</h2>
        {faq.map((item) => (
          <section key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <p>
          Questions about a specific cord you already own can go to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. We can explain the chart. We cannot
          inspect your circuit from an email.
        </p>
      </div>
      <ShopCords heading="Checked outdoor cords" />
      <RelatedGuides except={path} />
    </article>
  );
}
