/**
 * Copper planning numbers for portable cords on 120 V, single-phase.
 *
 * Resistance is NEC Chapter 9, Table 8, uncoated copper at 75 °C (Ω / 1,000 ft).
 * Voltage drop is the two-way path: VD = 2 × L(ft) × I(A) × R / 1,000.
 *
 * These are planning estimates, not a lab test of a named SKU and not a
 * substitute for the cord’s listed ampacity or the tool nameplate.
 */
export const copperOhmsPerKft = {
  16: 4.89,
  14: 3.07,
  12: 1.93,
  10: 1.21,
} as const;

export type Awg = keyof typeof copperOhmsPerKft;

export const awgOrder: Awg[] = [16, 14, 12, 10];

export const lengthsFt = [25, 50, 100] as const;
export type LengthFt = (typeof lengthsFt)[number];

export const loadAmps = [10, 13, 15] as const;
export type LoadAmps = (typeof loadAmps)[number];

export function voltageDropVolts(awg: Awg, amps: number, lengthFt: number): number {
  return (2 * lengthFt * amps * copperOhmsPerKft[awg]) / 1000;
}

export function voltageDropPercent(awg: Awg, amps: number, lengthFt: number, volts = 120): number {
  return (voltageDropVolts(awg, amps, lengthFt) / volts) * 100;
}

export function formatDrop(awg: Awg, amps: number, lengthFt: number): string {
  const volts = voltageDropVolts(awg, amps, lengthFt);
  const pct = voltageDropPercent(awg, amps, lengthFt);
  return `${volts.toFixed(1)} V (${pct.toFixed(1)}%)`;
}

/**
 * Shop pick for motor tools that should stay near 3% drop at 120 V.
 * Ampacity of the marked cord still wins if it is lower.
 */
export function recommendAwg(amps: number, lengthFt: number): Awg {
  if (amps <= 10 && lengthFt <= 25) return 16;
  if (amps <= 10 && lengthFt <= 50) return 14;
  if (amps <= 10) return 12;
  if (amps <= 13 && lengthFt <= 25) return 14;
  if (amps <= 13 && lengthFt <= 50) return 12;
  if (amps <= 13) return 10;
  if (lengthFt <= 25) return 12;
  if (lengthFt <= 50) return 12;
  return 10;
}

export const listedAmpNotes: Record<Awg, string> = {
  16: "Commonly marked 10–13 A. Lights, chargers, and small tools — not a 15 A saw.",
  14: "Commonly marked 13–15 A. Fine on a short 15 A run; long runs need thicker copper.",
  12: "Often 15 A or 20 A depending on the plug. The default shop cord for circular saws and long 15 A runs.",
  10: "Often 20–30 A depending on the ends. The 100-foot answer for 15 A motors.",
};

export type ChartRow = {
  amps: LoadAmps;
  lengthFt: LengthFt;
  pick: Awg;
  drops: Record<Awg, string>;
};

export const gaugeChart: ChartRow[] = loadAmps.flatMap((amps) =>
  lengthsFt.map((lengthFt) => ({
    amps,
    lengthFt,
    pick: recommendAwg(amps, lengthFt),
    drops: {
      16: formatDrop(16, amps, lengthFt),
      14: formatDrop(14, amps, lengthFt),
      12: formatDrop(12, amps, lengthFt),
      10: formatDrop(10, amps, lengthFt),
    },
  })),
);

export const pickSteps = [
  {
    n: "1",
    title: "Read the tool amps",
    body: "Use the nameplate, not the marketing box. A circular saw that says 15 A is a 15 A load even if the cut “feels light.”",
  },
  {
    n: "2",
    title: "Measure the run",
    body: "Length is outlet to tool, including any extra coil you leave on the ground. Two 50-foot cords in series are a 100-foot problem plus an extra connection.",
  },
  {
    n: "3",
    title: "Pick AWG for drop, then check the mark",
    body: "Thicker copper (smaller AWG number) drops less voltage. Then confirm the cord and plug are listed for at least the tool’s amps. A 12 AWG cord with a 15 A plug is still a 15 A cord.",
  },
] as const;
