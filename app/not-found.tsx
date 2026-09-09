import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-amp-dark">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">That run is not on the reel</h1>
      <p className="mt-4 text-ink-soft">
        The page is missing. The gauge chart and the how-to-pick steps are still on the hub.
      </p>
      <p className="mt-6">
        <Link className="text-steel underline underline-offset-3 hover:text-amp-dark" href="/">
          Back to CordGauge Guide
        </Link>
      </p>
    </div>
  );
}
