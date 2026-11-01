const run = "M0 58 C 16 58, 28 82, 48 72 C 66 63, 82 56, 100 60";

export function HeroCord() {
  return (
    <div className="hero-cord" aria-hidden="true">
      <svg className="cord-plug-svg" viewBox="0 0 92 112" fill="none" focusable="false">
        <rect className="cord-blade" x="0" y="41" width="27" height="5" rx="1" />
        <rect className="cord-blade" x="0" y="66" width="27" height="5" rx="1" />
        <rect className="cord-ground" x="7" y="51.5" width="15" height="8" rx="4" />
        <rect className="cord-body" x="22" y="26" width="52" height="60" rx="7" />
        <rect className="cord-collar" x="70" y="44" width="18" height="24" rx="3" />
      </svg>
      <svg className="cord-run" viewBox="0 0 100 112" preserveAspectRatio="none" fill="none" focusable="false">
        <path className="cord-jacket" d={run} />
        <path className="cord-copper" d={run} />
      </svg>
      <svg className="cord-cap-svg" viewBox="0 0 40 112" fill="none" focusable="false">
        <rect className="cord-cap" x="0" y="32" width="34" height="48" rx="5" />
        <rect className="cord-slot" x="9" y="44" width="16" height="3.5" rx="1" />
        <rect className="cord-slot" x="9" y="52" width="16" height="3.5" rx="1" />
        <circle className="cord-ground-hole" cx="17" cy="64" r="2.3" />
      </svg>
    </div>
  );
}
