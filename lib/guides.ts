export type Guide = {
  href: string;
  title: string;
  kicker: string;
  dek: string;
  description: string;
};

export const guides: Guide[] = [
  {
    href: "/extension-cord-gauge-chart",
    title: "Extension cord gauge chart",
    kicker: "Master chart",
    dek: "AWG × amps × length with copper voltage-drop planning numbers — and why the jacket color is not the spec.",
    description:
      "Extension cord gauge chart for 16, 14, 12, and 10 AWG. Amps, run length, and copper voltage-drop planning numbers for shop tools.",
  },
  {
    href: "/12-vs-14-gauge-extension-cord",
    title: "12 vs 14 gauge extension cord",
    kicker: "12 vs 14",
    dek: "When 12 AWG is the right buy for a 15 A tool, and when a short 14 AWG cord is still enough.",
    description:
      "Compare 12 AWG and 14 AWG extension cords for 15 A shop tools. Voltage drop, weight, and when the thinner cord is fine.",
  },
  {
    href: "/best-extension-cord-for-circular-saw",
    title: "Best extension cord for a circular saw",
    kicker: "15 A saws",
    dek: "Nameplate amps, start surge, and the gauge that keeps a 15 A saw from sagging on a long run.",
    description:
      "Extension cord gauge for a 15 A circular saw. Why 12 AWG beats 14 AWG past a short run, and why 16 AWG is the wrong aisle.",
  },
  {
    href: "/best-extension-cord-for-table-saw",
    title: "Best extension cord for a table saw",
    kicker: "Table saw",
    dek: "Nameplate 15 A contractor saws, start surge, and when 12 AWG is enough vs when 10 AWG is the honest run.",
    description:
      "Extension cord gauge for a 15 A table saw. Why 16 AWG is wrong, when 12 AWG is the shop default, and when 10 AWG is the honest long run.",
  },
  {
    href: "/100-foot-extension-cord-gauge",
    title: "100-foot extension cord gauge",
    kicker: "Long runs",
    dek: "Voltage drop at 100 feet. When 12 AWG is the floor, and when 10 AWG is the honest pick.",
    description:
      "What gauge for a 100-foot extension cord. Copper voltage-drop planning for 10–15 A tools, and why two 50-foot cords are not the same.",
  },
  {
    href: "/outdoor-extension-cord-gauge-sjtw",
    title: "Outdoor extension cord gauge and SJTW",
    kicker: "Outdoor / SJTW",
    dek: "SJTW is a jacket rating, not a thicker wire. Outdoor-rated still has to match amps and length.",
    description:
      "What SJTW means on an outdoor extension cord, how jacket type differs from AWG, and how to size outdoor shop runs.",
  },
];

export function guideByHref(href: string): Guide | undefined {
  return guides.find((guide) => guide.href === href);
}
