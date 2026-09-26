"use client";

import { useState } from "react";
import { AmazonLink } from "@/components/amazon-link";
import { selectProducts } from "@/lib/affiliates";
import {
  formatDrop,
  lengthsFt,
  loadAmps,
  recommendAwg,
  type LengthFt,
  type LoadAmps,
} from "@/lib/cords";

export function GaugePicker() {
  const [amps, setAmps] = useState<LoadAmps>(15);
  const [lengthFt, setLengthFt] = useState<LengthFt>(50);
  const pick = recommendAwg(amps, lengthFt);
  const shop = selectProducts({ pick, lengthFt });

  return (
    <form className="mt-8 border border-rule bg-card p-5" onSubmit={(event) => event.preventDefault()}>
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Gauge calculator</h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Planning estimate for a 120 V copper cord. The marked ampacity on the cord still wins if it
        is lower. This does not size a new circuit.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Nameplate amps
          <select
            className="mt-2 w-full border border-rule bg-paper px-3 py-2 text-base text-ink"
            name="amps"
            value={amps}
            onChange={(event) => setAmps(Number(event.target.value) as LoadAmps)}
          >
            {loadAmps.map((value) => (
              <option key={value} value={value}>
                {value} A
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Run length, outlet to tool
          <select
            className="mt-2 w-full border border-rule bg-paper px-3 py-2 text-base text-ink"
            name="length"
            value={lengthFt}
            onChange={(event) => setLengthFt(Number(event.target.value) as LengthFt)}
          >
            {lengthsFt.map((value) => (
              <option key={value} value={value}>
                {value} ft
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-5 text-lg font-semibold text-ink">
        Shop pick: <span className="text-amp-dark">{pick} AWG</span>
      </p>
      <p className="mt-1 font-mono text-sm text-ink-soft">
        {pick} AWG drop at {amps} A · {lengthFt} ft: {formatDrop(pick, amps, lengthFt)}
      </p>
      <dl className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-3">
        {([14, 12, 10] as const).map((awg) => (
          <div key={awg} className="border border-rule px-3 py-2">
            <dt className="font-mono text-xs text-amp-dark">{awg} AWG</dt>
            <dd className="mt-1 text-ink">{formatDrop(awg, amps, lengthFt)}</dd>
          </div>
        ))}
      </dl>
      {shop.note ? <p className="mt-4 text-sm leading-6 text-ink">{shop.note}</p> : null}
      <ul className="mt-4 grid gap-3">
        {shop.products.map((product) => (
          <li key={product.asin} className="flex flex-col gap-2 border border-rule px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-ink">{product.label}</p>
              <p className="mt-1 font-mono text-xs text-amp-dark">
                {product.awg} AWG · {product.lengthFt} ft · {product.jacket}
              </p>
            </div>
            <AmazonLink asin={product.asin} label={product.label} />
          </li>
        ))}
      </ul>
    </form>
  );
}
