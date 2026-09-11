import type { Metadata } from "next";
import Link from "next/link";
import { ShopCords } from "@/components/shop-cords";
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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <section className="max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-amp-dark">
          Independent AWG directory
        </p>
        <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
          Pick an extension cord by amps, then length, then AWG
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-soft">
          CordGauge Guide is a comparison hub for shop and DIY tools. Jacket color and “heavy duty”
          on the hang tag do not tell you whether a 15 A circular saw will sag at 100 feet. Nameplate
          amps and run length do.
        </p>
      </section>

      <section id="how-to-pick" className="mt-12 scroll-mt-8">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">How to pick a cord</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {pickSteps.map((step) => (
            <li key={step.n} className="border border-rule bg-card p-5">
              <p className="font-mono text-xs font-medium text-amp-dark">Step {step.n}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">15 A shop loads, at a glance</h2>
          <Link className="text-sm text-steel underline underline-offset-3 hover:text-amp-dark" href="/extension-cord-gauge-chart">
            Full gauge × amps × length chart
          </Link>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
          Copper planning drop at 120 V (NEC Ch. 9 Table 8 resistances). Aim near 3% for motor tools.
          The marked ampacity on the cord still wins if it is lower.
        </p>
        <div className="table-scroll mt-5">
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
      </section>

      <ShopCords />

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <article className="border border-rule bg-card p-5">
          <h2 className="text-2xl font-semibold text-ink">12 AWG beats 14 on long 15 A runs</h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            A 14 AWG cord is not “wrong” at 25 feet. At 50–100 feet the same 15 A saw is a voltage-drop
            problem. Read{" "}
            <Link className="text-steel underline underline-offset-3" href="/12-vs-14-gauge-extension-cord">
              12 vs 14 gauge
            </Link>
            .
          </p>
        </article>
        <article className="border border-rule bg-card p-5">
          <h2 className="text-2xl font-semibold text-ink">SJTW is a jacket, not a gauge</h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Outdoor-rated means weather-resistant insulation. It does not make 16 AWG safe for a saw.
            See{" "}
            <Link className="text-steel underline underline-offset-3" href="/outdoor-extension-cord-gauge-sjtw">
              outdoor / SJTW
            </Link>
            .
          </p>
        </article>
        <article className="border border-rule bg-card p-5">
          <h2 className="text-2xl font-semibold text-ink">100 feet wants thicker copper</h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Two cheap 50-foot 16 AWG cords in a daisy chain are how tools overheat. Use the{" "}
            <Link className="text-steel underline underline-offset-3" href="/100-foot-extension-cord-gauge">
              100-foot gauge guide
            </Link>
            .
          </p>
        </article>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Guides</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Bookmark the page that matches the decision you are actually making — not a doorway list
          of every cord on the shelf.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.href} className="border border-rule bg-card p-5">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-amp-dark">
                {guide.kicker}
              </p>
              <Link
                className="mt-1 block text-2xl font-semibold text-ink hover:text-amp-dark"
                href={guide.href}
              >
                {guide.title}
              </Link>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{guide.dek}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
