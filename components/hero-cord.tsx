const run = "M0 56 C 20 58, 36 80, 58 72 C 78 64, 90 58, 100 56";
const runSheen = "M0 50 C 20 52, 36 74, 58 66 C 78 58, 90 52, 100 50";

export function HeroCord() {
  return (
    <div className="hero-cord" aria-hidden="true">
      <svg className="cord-plug-svg" viewBox="0 0 92 112" fill="none" focusable="false">
        <rect className="cord-blade" x="0" y="42" width="26" height="6" rx="1" />
        <rect className="cord-blade" x="0" y="64" width="26" height="6" rx="1" />
        <rect className="cord-ground" x="7" y="52" width="16" height="8" rx="4" />
        <rect className="cord-body" x="22" y="28" width="54" height="56" rx="6" />
        <path className="cord-ridges" d="M60 42h7M60 56h9M60 70h7" />
        <rect className="cord-body" x="72" y="46" width="20" height="20" rx="2" />
      </svg>
      <svg
        className="cord-run"
        viewBox="0 0 100 112"
        preserveAspectRatio="none"
        fill="none"
        focusable="false"
      >
        <path className="cord-jacket" d={run} />
        <path className="cord-sheen" d={runSheen} />
        <path className="cord-copper" d={run} />
        <path className="cord-flow cord-flow-glow" pathLength="100" d={run} />
        <path className="cord-flow cord-flow-core" pathLength="100" d={run} />
      </svg>
      <svg className="cord-cap-svg" viewBox="0 0 40 112" fill="none" focusable="false">
        <rect className="cord-cap" x="0" y="36" width="36" height="40" rx="4" />
        <path className="cord-slots" d="M12 48h14M12 56h14M12 64h14" />
      </svg>
      <div className="gauge-stamp">
        <span className="gauge-readout gauge-readout-16">16 AWG</span>
        <span className="gauge-readout gauge-readout-14">14 AWG</span>
        <span className="gauge-readout gauge-readout-12">12 AWG</span>
      </div>
    </div>
  );
}
