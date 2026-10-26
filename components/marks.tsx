type AwgFace = 10 | 12 | 14 | 16;

const conductorRadius: Record<AwgFace, number> = {
  16: 4.1,
  14: 5.3,
  12: 6.7,
  10: 8.4,
};

export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="14.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="11.2" r="3.15" fill="#c46a2e" />
      <circle cx="11.4" cy="19.4" r="3.15" fill="#e0a06a" />
      <circle cx="20.6" cy="19.4" r="3.15" fill="#c46a2e" />
    </svg>
  );
}

export function CrossSection({ awg, className }: { awg: AwgFace; className?: string }) {
  const radius = conductorRadius[awg];
  const core = radius * 0.42;
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
      <circle className="x-jacket" cx="40" cy="40" r="36" />
      <circle className="x-jacket-ring" cx="40" cy="40" r="31.5" />
      <circle className="x-copper" cx="40" cy="27.5" r={radius} />
      <circle className="x-copper" cx="29.2" cy="48.2" r={radius} />
      <circle className="x-copper" cx="50.8" cy="48.2" r={radius} />
      <circle className="x-core" cx="40" cy="27.5" r={core} />
      <circle className="x-core" cx="29.2" cy="48.2" r={core} />
      <circle className="x-core" cx="50.8" cy="48.2" r={core} />
    </svg>
  );
}

const kinds = {
  saw: (
    <>
      <path d="M14 50h52" />
      <path d="M18 50v8h44v-8" />
      <circle cx="46" cy="36" r="14" />
      <path d="M46 22v8M58 30c6 2 8 8 6 14" />
      <path d="M34 28c-8 2-12 10-8 16" />
      <circle className="mark-copper" cx="46" cy="36" r="2.2" />
    </>
  ),
  table: (
    <>
      <path d="M12 34h56v8H12z" />
      <path d="M18 42v16M62 42v16M18 58h44" />
      <path d="M40 34v-10" />
      <circle className="mark-copper" cx="40" cy="22" r="5" />
      <path d="M48 34v8" />
    </>
  ),
  compressor: (
    <>
      <rect x="14" y="36" width="40" height="16" rx="8" />
      <rect x="46" y="24" width="16" height="14" rx="2" />
      <path d="M22 52v6M46 52v6" />
      <circle cx="22" cy="60" r="4" />
      <circle cx="46" cy="60" r="4" />
      <path className="mark-copper" d="M54 28v6" />
    </>
  ),
  washer: (
    <>
      <path d="M18 46h18l6-8h14v10H42" />
      <path d="M22 46c-8 8-6 18 2 20" />
      <circle className="mark-copper" cx="58" cy="34" r="4" />
      <path d="M30 28c8-6 18-4 22 2" />
      <path d="M18 46v8" />
    </>
  ),
  outdoor: (
    <>
      <path d="M24 44c0-10 8-16 16-16s16 6 16 16-8 16-16 16" />
      <path d="M24 44c0 8 6 12 12 12" />
      <path className="mark-copper" d="M40 18v-6" />
      <path d="M34 14h12" />
      <circle cx="52" cy="44" r="2" />
    </>
  ),
  daisy: (
    <>
      <path d="M8 40h10" />
      <rect x="16" y="32" width="14" height="16" rx="2" />
      <path d="M30 40h20" />
      <rect x="50" y="32" width="14" height="16" rx="2" />
      <path d="M64 40h8" />
      <path className="mark-copper" d="M34 36h12M34 44h12" />
    </>
  ),
  chart: (
    <>
      <path d="M16 16h48v48H16z" />
      <path d="M16 32h48M16 48h48M32 16v48M48 16v48" />
      <rect className="mark-copper-fill" x="32" y="32" width="16" height="16" />
    </>
  ),
  calculator: (
    <>
      <rect x="18" y="14" width="44" height="52" rx="3" />
      <path d="M26 26h28" />
      <path d="M26 36h12M44 36h10" />
      <path d="M26 46h12M44 46h10" />
      <path className="mark-copper" d="M26 56h28" />
    </>
  ),
  run: (
    <>
      <path d="M10 46c12-16 20-16 30 0s18 16 30 0" />
      <path d="M14 58h8M36 58h8M58 58h8" />
      <circle className="mark-copper" cx="18" cy="46" r="2.4" />
      <circle cx="62" cy="40" r="2.4" />
    </>
  ),
  compare: (
    <>
      <circle cx="28" cy="40" r="14" />
      <circle className="mark-copper" cx="28" cy="40" r="4" />
      <circle cx="54" cy="40" r="18" />
      <circle className="mark-copper" cx="54" cy="40" r="7" />
    </>
  ),
} as const;

export type MarkKind = keyof typeof kinds;

const kickerKind: Record<string, MarkKind> = {
  "Outdoor / SJTW": "outdoor",
  "10 vs 12": "compare",
  "Long runs": "run",
  "12 vs 14": "compare",
  Compressor: "compressor",
  "15 A saws": "saw",
  "Pressure washer": "washer",
  "Table saw": "table",
  "Daisy chain": "daisy",
  Calculator: "calculator",
  "Master chart": "chart",
};

export function markForKicker(kicker: string): MarkKind {
  return kickerKind[kicker] ?? "compare";
}

export function BenchMark({ kind }: { kind: MarkKind }) {
  return (
    <svg className="bench-mark" viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
      {kinds[kind]}
    </svg>
  );
}
