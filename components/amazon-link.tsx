"use client";

import type { ReactNode } from "react";
import { amazonUrl } from "@/lib/affiliates";
import { CLICK_BEACON } from "@/lib/beacon";

type AmazonLinkProps = {
  label: string;
  children?: ReactNode;
} & ({ href: string; asin?: string } | { asin: string; href?: undefined });

function amazonDestination(props: AmazonLinkProps): string {
  if (props.href !== undefined) return props.href;
  return amazonUrl(props.asin);
}

export function AmazonLink(props: AmazonLinkProps) {
  const { asin, label, children } = props;
  return (
    <a
      className={children ? "text-link" : "buy-link"}
      href={amazonDestination(props)}
      rel="nofollow sponsored noopener"
      target="_blank"
      aria-label={asin ? `View ${label} on Amazon` : `Search Amazon for ${label}`}
      onClick={
        asin
          ? () => {
              navigator.sendBeacon(
                CLICK_BEACON,
                JSON.stringify({
                  path: window.location.pathname || "/",
                  asin,
                }),
              );
            }
          : undefined
      }
    >
      {children ?? "View on Amazon"}
    </a>
  );
}
