"use client";

import { useState } from "react";
import { AmazonLink } from "@/components/amazon-link";
import { CrossSection } from "@/components/marks";
import { selectProducts } from "@/lib/affiliates";
import {
  formatDrop,
  lengthsFt,
  loadAmps,
  recommendAwg,
  voltageDropPercent,
  type LengthFt,
  type LoadAmps,
} from "@/lib/cords";

export function GaugePicker() {
  const [amps, setAmps] = useState<LoadAmps>(15);
  const [lengthFt, setLengthFt] = useState<LengthFt>(50);
  const pick = recommendAwg(amps, lengthFt);
  const shop = selectProducts({ pick, lengthFt });

  return (
    <form className="instrument" onSubmit={(event) => event.preventDefault()}>
      <div className="instrument-head">
        <div>
          <h2>Gauge calculator</h2>
          <p>
            Planning estimate for a 120 V copper cord. The marked ampacity on the cord still wins if it
            is lower. This does not size a new circuit.
          </p>
        </div>
        <div className="instrument-face" aria-hidden="true">
          <CrossSection awg={pick} />
          <span>{pick} AWG</span>
        </div>
      </div>
      <div className="instrument-fields">
        <label>
          Nameplate amps
          <select
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
        <label>
          Run length, outlet to tool
          <select
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
      <div aria-live="polite">
        <div key={`${amps}-${lengthFt}`} className="result-ease">
          <p className="instrument-pick">
            Shop pick: <span>{pick} AWG</span>
          </p>
          <p className="instrument-drop">
            {pick} AWG drop at {amps} A · {lengthFt} ft: {formatDrop(pick, amps, lengthFt)}
          </p>
          <dl className="drop-grid">
            {([14, 12, 10] as const).map((awg) => {
              const percent = voltageDropPercent(awg, amps, lengthFt);
              const width = Math.min(100, (percent / 8) * 100);
              return (
                <div key={awg} className={awg === pick ? "drop-cell is-pick" : "drop-cell"}>
                  <dt>{awg} AWG</dt>
                  <dd>{formatDrop(awg, amps, lengthFt)}</dd>
                  <div className="drop-track" aria-hidden="true">
                    <span className="drop-fill" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
      {shop.note ? <p className="instrument-note">{shop.note}</p> : null}
      <ul className="shop-list">
        {shop.products.map((product) => (
          <li key={product.asin} className="shop-row motion-line">
            <div>
              <p className="shop-label">{product.label}</p>
              <p className="shop-spec">
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
