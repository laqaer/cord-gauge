"use client";

import type { ReactNode } from "react";
import { amazonUrl } from "@/lib/affiliates";
import { CLICK_BEACON } from "@/lib/beacon";

export function AmazonLink({
  asin,
  label,
  children,
}: {
  asin: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <a
      className={children ? "text-link" : "buy-link"}
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
      {children ?? "View on Amazon"}
    </a>
  );
}
