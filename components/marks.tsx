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
      <circle cx="11.4" cy="19.4" r="3.15" fill="#c46a2e" />
      <circle cx="20.6" cy="19.4" r="3.15" fill="#c46a2e" />
    </svg>
  );
}

export function CrossSection({ awg, className }: { awg: AwgFace; className?: string }) {
  const radius = conductorRadius[awg];
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
      <circle className="x-jacket" cx="40" cy="40" r="36" />
      <circle className="x-copper" cx="40" cy="27.5" r={radius} />
      <circle className="x-copper" cx="29.2" cy="48.2" r={radius} />
      <circle className="x-copper" cx="50.8" cy="48.2" r={radius} />
    </svg>
  );
}
