import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <p className="kicker">404</p>
      <h1 className="display">That run is not on the reel</h1>
      <p className="dek">
        The page is missing. The gauge chart and the how-to-pick steps are still on the hub.
      </p>
      <p className="mt-6">
        <Link className="text-link" href="/">
          Back to CordGauge Guide
        </Link>
      </p>
    </div>
  );
}
