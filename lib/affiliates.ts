import type { Awg } from "./cords";

export const AMAZON_TAG = "laqaer-20";

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

export type AffiliateProduct = {
  asin: string;
  label: string;
  awg: 10 | 12;
  lengthFt: 50 | 100;
  jacket: string;
  note?: string;
};

/**
 * Cords whose Amazon listing title, gauge, length, and a buy box were
 * checked on 2026-09-26. Do not restore an ASIN from a search snippet:
 * earlier links resolved to a different length or to an unavailable listing.
 *
 * Removed that day:
 * - B01LXI1NL8 was labeled Bold 10/3 100 ft; the live page was not an
 *   in-stock 100 ft 10/3 cord.
 * - B09BDFM4HC Lone Star 12/3 50 ft was unavailable.
 * - B09BDGHQBP Lone Star 10/3 100 ft was unavailable.
 */
export const products: AffiliateProduct[] = [
  {
    asin: "B00004SQF4",
    label: "Southwire 12/3 SJTW 50 ft outdoor",
    awg: 12,
    lengthFt: 50,
    jacket: "SJTW outdoor, lighted end, marked 15 A",
  },
  {
    asin: "B00004SQF5",
    label: "Southwire 12/3 SJTW 100 ft outdoor",
    awg: 12,
    lengthFt: 100,
    jacket: "SJTW outdoor, lighted end, marked 15 A",
    note: "This is a 12 AWG cord. At 100 ft and 15 A the copper estimate is about 5.8 V (4.8%). The chart pick for that run is 10 AWG, which we are not linking until a checked in-stock listing exists.",
  },
];

export function selectProducts(input?: { pick?: Awg; lengthFt?: number }): {
  products: AffiliateProduct[];
  note: string | null;
} {
  if (!input?.pick) {
    return { products: [...products], note: null };
  }

  const minLength = input.lengthFt ?? 0;
  const matches = products
    .filter((product) => product.awg === input.pick && product.lengthFt >= minLength)
    .sort((a, b) => a.lengthFt - b.lengthFt);

  if (matches.length > 0) {
    return { products: matches, note: null };
  }

  const otherGauge = products
    .filter((product) => product.lengthFt >= minLength)
    .sort((a, b) => a.lengthFt - b.lengthFt || a.awg - b.awg);
  const lengthLabel = minLength > 0 ? `${minLength} ft ` : "";

  return {
    products: otherGauge,
    note: `The chart pick for this run is ${input.pick} AWG. CordGauge does not currently link a checked, in-stock ${lengthLabel}${input.pick} AWG cord. A cord below is a different gauge. It is not a substitute for that pick.`,
  };
}
