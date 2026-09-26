"use client";

import { amazonUrl } from "@/lib/affiliates";
import { CLICK_BEACON } from "@/lib/beacon";

export function AmazonLink({ asin, label }: { asin: string; label: string }) {
  return (
    <a
      className="shrink-0 text-sm font-medium text-steel underline underline-offset-3 hover:text-amp-dark"
      href={amazonUrl(asin)}
      rel="nofollow sponsored noopener"
      target="_blank"
      aria-label={`View ${label} on Amazon`}
      onClick={() => {
        const payload = JSON.stringify({
          path: window.location.pathname || "/",
          asin,
        });
        try {
          navigator.sendBeacon(CLICK_BEACON, payload);
        } catch {
          // The purchase link still opens when the counter is unavailable.
        }
      }}
    >
      View on Amazon
    </a>
  );
}
