import type { Metadata } from "next";
import Link from "next/link";
import { GaugePicker } from "@/components/gauge-picker";
import { HeroCord } from "@/components/hero-cord";
import { BenchMark, markForKicker } from "@/components/marks";
import { ShopBuyLine, ShopCords } from "@/components/shop-cords";
import { gaugeChart, pickSteps } from "@/lib/cords";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "CordGauge Guide — Extension cord gauge by amps and length",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const preview = gaugeChart.filter((row) => row.amps === 15);

  return (
    <div className="hub">
      <section className="hero-block">
        <div className="hero-copy">
          <p className="kicker">Independent AWG directory</p>
          <h1 className="display">Pick an extension cord by amps, then length, then AWG</h1>
          <p className="dek">
            CordGauge Guide is a comparison hub for shop and DIY tools. Jacket color and “heavy duty”
            on the hang tag do not tell you whether a 15 A circular saw will sag at 100 feet. Nameplate
            amps and run length do.
          </p>
        </div>
        <HeroCord />
      </section>

      <section id="how-to-pick" className="band scroll-mt-8">
        <h2 className="band-title">How to pick a cord</h2>
        <ol className="step-grid">
          {pickSteps.map((step) => (
            <li key={step.n} className="bench-card motion-hover motion-arrive">
              <p className="kicker">Step {step.n}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <GaugePicker />

      <section className="band">
        <div className="motion-arrive">
          <div className="band-head">
            <h2 className="band-title">15 A shop loads, at a glance</h2>
            <Link className="text-link" href="/extension-cord-gauge-chart">
              Full gauge × amps × length chart
            </Link>
          </div>
          <p className="band-note">
            Copper planning drop at 120 V (NEC Ch. 9 Table 8 resistances). Aim near 3% for motor tools.
            The marked ampacity on the cord still wins if it is lower.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Run</th>
                  <th>Shop pick</th>
                  <th>14 AWG drop</th>
                  <th>12 AWG drop</th>
                  <th>10 AWG drop</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row) => (
                  <tr key={row.lengthFt}>
                    <td>{row.lengthFt} ft · 15 A</td>
                    <td className="pick">{row.pick} AWG</td>
                    <td>{row.drops[14]}</td>
                    <td>{row.drops[12]}</td>
                    <td>{row.drops[10]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ShopBuyLine
          awg={12}
          lengthFt={50}
          className="buy-follow"
          after="for the 50-foot row. At 100 feet the chart pick is 10 AWG."
        >
          50 ft 12 AWG SJTW is the usual shop buy
        </ShopBuyLine>
      </section>

      <ShopCords />

      <section className="point-grid">
        <article className="bench-card motion-hover motion-arrive">
          <h2>12 AWG beats 14 on long 15 A runs</h2>
          <p>
            A 14 AWG cord is not “wrong” at 25 feet. At 50–100 feet the same 15 A saw is a voltage-drop
            problem. Read{" "}
            <Link className="text-link" href="/12-vs-14-gauge-extension-cord">
              12 vs 14 gauge
            </Link>
            .
          </p>
        </article>
        <article className="bench-card motion-hover motion-arrive">
          <h2>SJTW is a jacket, not a gauge</h2>
          <p>
            Outdoor-rated means weather-resistant insulation. It does not make 16 AWG safe for a saw.
            See{" "}
            <Link className="text-link" href="/outdoor-extension-cord-gauge-sjtw">
              outdoor / SJTW
            </Link>
            .
          </p>
        </article>
        <article className="bench-card motion-hover motion-arrive">
          <h2>100 feet wants thicker copper</h2>
          <p>
            Two cheap 50-foot 16 AWG cords in a daisy chain are how tools overheat. Use the{" "}
            <Link className="text-link" href="/100-foot-extension-cord-gauge">
              100-foot gauge guide
            </Link>
            .
          </p>
        </article>
      </section>

      <section className="band">
        <h2 className="band-title display-section">Guides</h2>
        <p className="band-note">
          Bookmark the page that matches the decision you are actually making — not a doorway list
          of every cord on the shelf.
        </p>
        <ul className="guide-grid">
          {guides.map((guide) => (
            <li key={guide.href} className="bench-card motion-hover motion-arrive guide-card">
              <div className="mark-plate mark-plate-sm" aria-hidden="true">
                <BenchMark kind={markForKicker(guide.kicker)} />
              </div>
              <div>
                <p className="kicker">{guide.kicker}</p>
                <Link href={guide.href}>{guide.title}</Link>
                <p>{guide.dek}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
