export type Guide = {
  href: string;
  title: string;
  dek: string;
  description: string;
};

export const guides: Guide[] = [
  {
    href: "/extension-cord-gauge-calculator",
    title: "Extension cord gauge calculator",
    dek: "Nameplate amps and run length in, AWG pick and copper voltage drop out, plus a cord only when the listing matches.",
    description:
      "Extension cord gauge calculator for 10, 13, and 15 amp tools at 25, 50, and 100 feet. Copper voltage-drop planning and a matching in-stock cord when we have one.",
  },
  {
    href: "/extension-cord-gauge-chart",
    title: "Extension cord gauge chart",
    dek: "AWG × amps × length with copper voltage-drop planning numbers — and why the jacket color is not the spec.",
    description:
      "Extension cord gauge chart for 16, 14, 12, and 10 AWG. Amps, run length, and copper voltage-drop planning numbers for shop tools.",
  },
  {
    href: "/12-vs-14-gauge-extension-cord",
    title: "12 vs 14 gauge extension cord",
    dek: "When 12 AWG is the right buy for a 15 A tool, and when a short 14 AWG cord is still enough.",
    description:
      "Compare 12 AWG and 14 AWG extension cords for 15 A shop tools. Voltage drop, weight, and when the thinner cord is fine.",
  },
  {
    href: "/10-vs-12-gauge-extension-cord",
    title: "10 vs 12 gauge extension cord",
    dek: "When 10 AWG beats 12 AWG on 100-foot 15 A motors, start sag, and a cord that lives on the shop floor.",
    description:
      "Compare 10 AWG and 12 AWG extension cords for 15 A shop tools. Voltage drop at 100 feet, motor start, and when the thicker cord is worth the weight.",
  },
  {
    href: "/best-extension-cord-for-circular-saw",
    title: "Best extension cord for a circular saw",
    dek: "Nameplate amps, start surge, and the gauge that keeps a 15 A saw from sagging on a long run.",
    description:
      "Extension cord gauge for a 15 A circular saw. Why 12 AWG beats 14 AWG past a short run, and why 16 AWG is the wrong aisle.",
  },
  {
    href: "/best-extension-cord-for-table-saw",
    title: "Best extension cord for a table saw",
    dek: "Nameplate 15 A contractor saws, start surge, and when 12 AWG is enough vs when 10 AWG is the honest run.",
    description:
      "Extension cord gauge for a 15 A table saw. Why 16 AWG is wrong, when 12 AWG is the shop default, and when 10 AWG is the honest long run.",
  },
  {
    href: "/best-extension-cord-for-air-compressor",
    title: "Best extension cord for an air compressor",
    dek: "Nameplate vs start surge on a 15 A portable compressor, why thin cords trip and heat, and when 12 AWG vs 10 AWG.",
    description:
      "Extension cord gauge for a 15 A portable air compressor. Nameplate vs start surge, why thin cords trip and heat, and when 12 AWG vs 10 AWG.",
  },
  {
    href: "/best-extension-cord-for-pressure-washer",
    title: "Best extension cord for a pressure washer",
    dek: "Nameplate 13–15 A electric washers outdoors, SJTW jacket, why thin cords trip and heat, and 12 AWG vs 10 AWG on a driveway.",
    description:
      "Extension cord gauge for a 13–15 A electric pressure washer. Why outdoor SJTW matters, why thin cords trip and heat, and when 12 AWG vs 10 AWG on a driveway.",
  },
  {
    href: "/100-foot-extension-cord-gauge",
    title: "100-foot extension cord gauge",
    dek: "Voltage drop at 100 feet. When 12 AWG is the floor, and when 10 AWG is the honest pick.",
    description:
      "What gauge for a 100-foot extension cord. Copper voltage-drop planning for 10–15 A tools, and why two 50-foot cords are not the same.",
  },
  {
    href: "/daisy-chain-extension-cords",
    title: "Can you daisy-chain extension cords?",
    dek: "Why two 50-foot cords are a 100-foot drop plus extra plugs — and why the thinnest link sets the ampacity.",
    description:
      "Why stacking two 50-foot cords fails for shop tools. 100-foot voltage drop, ampacity of the thinnest link, heat at the plugs, and when one properly gauged cord is the fix.",
  },
  {
    href: "/outdoor-extension-cord-gauge-sjtw",
    title: "Outdoor extension cord gauge and SJTW",
    dek: "SJTW is a jacket rating, not a thicker wire. Outdoor-rated still has to match amps and length.",
    description:
      "What SJTW means on an outdoor extension cord, how jacket type differs from AWG, and how to size outdoor shop runs.",
  },
  {
    href: "/30-amp-rv-extension-cord",
    title: "30 amp RV extension cord",
    dek: "A listed 30 A TT-30 cord, commonly 10 AWG, for 25 or 50 feet. A 50 A coach takes a 14-50 cord.",
    description:
      "30 amp RV extension cord sizing: 10 AWG TT-30 at 25 and 50 feet, how that differs from a 50 amp 14-50 cord, and when a longer lead needs a harder look at voltage drop.",
  },
  {
    href: "/best-extension-cord-for-generator",
    title: "Extension cord for a generator",
    dek: "12 AWG for most short 120 V generator loads, 10 AWG when the run or the amps go up. A house connection needs a transfer switch or interlock.",
    description:
      "Extension cord for a generator: 12 AWG versus 10 AWG by length and load, 120 V outlets versus an L14-30, and why a house connection uses a transfer switch or interlock.",
  },
  {
    href: "/christmas-lights-extension-cord",
    title: "Christmas lights extension cord",
    dek: "A 16 AWG outdoor cord is enough when the strings' labeled watts stay inside that cord's marked amps. Use a W or SJTW jacket on a GFCI receptacle.",
    description:
      "Christmas lights extension cord: when 16 AWG is enough, when to step up, and why outdoor lights want a W or SJTW jacket on a GFCI receptacle.",
  },
  {
    href: "/best-extension-cord-for-welder",
    title: "Extension cord for a welder",
    dek: "Use the welder's input amps, keep the cord short, and step from 12 AWG to 10 AWG or 8 AWG as the input rises.",
    description:
      "Extension cord for a welder: 120 V versus 240 V, 12, 10, and 8 AWG, duty cycle, and why the nameplate input amps — not the weld output — size the cord.",
  },
  {
    href: "/ev-charger-extension-cord",
    title: "EV charger extension cord",
    dek: "Most EV charger makers say do not use a household extension cord. If the manual allows one, use a short outdoor cord of 12 AWG or heavier, or a J1772 extension that maker allows.",
    description:
      "EV charger extension cord: why most EVSE makers say not to use a household cord, when a short 12 AWG outdoor cord or a maker-allowed J1772 extension is the path, and Level 1 on a 15 A circuit.",
  },
  {
    href: "/refrigerator-extension-cord",
    title: "Refrigerator extension cord",
    dek: "Many manuals say use a grounded outlet, not an extension cord. If a cord is unavoidable, one short 12 or 14 AWG 3-prong cord rated for the nameplate.",
    description:
      "Refrigerator extension cord: many manuals say plug into a grounded outlet. If a cord is unavoidable, use one short 12 or 14 AWG 3-prong cord rated for the nameplate amps.",
  },
];

export function guideByHref(href: string): Guide | undefined {
  return guides.find((guide) => guide.href === href);
}

export function guidesByHref(hrefs: readonly string[]): Guide[] {
  return hrefs.map((href) => {
    const guide = guideByHref(href);
    if (!guide) {
      throw new Error(`Unknown guide href: ${href}`);
    }
    return guide;
  });
}

export const toolBuyerHrefs = [
  "/best-extension-cord-for-circular-saw",
  "/best-extension-cord-for-table-saw",
  "/best-extension-cord-for-air-compressor",
  "/best-extension-cord-for-pressure-washer",
] as const;

export const specialtyLoadHrefs = [
  "/30-amp-rv-extension-cord",
  "/best-extension-cord-for-generator",
  "/christmas-lights-extension-cord",
  "/best-extension-cord-for-welder",
  "/ev-charger-extension-cord",
  "/refrigerator-extension-cord",
] as const;

export const specialtyLoadWhy: Record<(typeof specialtyLoadHrefs)[number], string> = {
  "/30-amp-rv-extension-cord": "30 A TT-30, commonly 10 AWG. A 50 A coach is a 14-50 cord.",
  "/best-extension-cord-for-generator":
    "12 AWG on a short 120 V outlet. House power needs a transfer switch or interlock.",
  "/christmas-lights-extension-cord":
    "16 AWG when the label watts fit the cord mark. Outdoor jacket and GFCI.",
  "/best-extension-cord-for-welder": "Input amps, short cord, 12 / 10 / 8 AWG as the load rises.",
  "/ev-charger-extension-cord":
    "Household cords are usually disallowed. Short 12 AWG, or a J1772 extension only if the maker allows it.",
  "/refrigerator-extension-cord":
    "Manual first. If a cord is unavoidable, one short 12 or 14 AWG 3-prong cord, never a power strip.",
};

export const toolBuyerWhy: Record<(typeof toolBuyerHrefs)[number], string> = {
  "/best-extension-cord-for-circular-saw":
    "About 13–15 A. Short runs → 12 AWG.",
  "/best-extension-cord-for-table-saw":
    "15 A contractor saw. Shop default is 12 AWG; 100 ft wants 10 AWG.",
  "/best-extension-cord-for-air-compressor":
    "15 A portable compressor, hard start. 12 AWG to 50 ft, 10 AWG at 100 ft.",
  "/best-extension-cord-for-pressure-washer":
    "13–15 A electric washer outdoors. Short runs → 12 AWG in an SJTW jacket.",
};
