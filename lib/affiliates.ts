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
};

/**
 * Verified Amazon ASINs for heavy-gauge outdoor / tool cords.
 * Labels are jacket facts only — no prices, ratings, or invented SKUs.
 */
export const products: AffiliateProduct[] = [
  {
    asin: "B00004SQF4",
    label: "Southwire 12/3 SJTW 50 ft outdoor",
    awg: 12,
    lengthFt: 50,
    jacket: "SJTW outdoor, 15 A ends",
  },
  {
    asin: "B01LXI1NL8",
    label: "Bold 10/3 SJTW 100 ft outdoor lighted",
    awg: 10,
    lengthFt: 100,
    jacket: "SJTW outdoor, lighted ends",
  },
  {
    asin: "B09BDFM4HC",
    label: "Lone Star 12/3 SJTW 50 ft lighted",
    awg: 12,
    lengthFt: 50,
    jacket: "SJTW outdoor, lighted ends",
  },
  {
    asin: "B09BDGHQBP",
    label: "Lone Star 10/3 SJTW 100 ft",
    awg: 10,
    lengthFt: 100,
    jacket: "SJTW outdoor",
  },
];
