import { site } from "@/lib/site";

/** Default social image. Next.js serves this from app/opengraph-image.tsx. */
export const ogImage = {
  url: `${site.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "CordGauge Guide — extension cord gauge by amps and length",
} as const;

/**
 * Shared Open Graph fields that every `openGraph` object must include.
 * Next.js shallow-replaces the entire parent `openGraph` when a child sets one.
 */
export const openGraphImage = {
  type: "website" as const,
  locale: site.locale,
  siteName: site.name,
  images: [ogImage],
};

export const twitterWithImage = {
  card: "summary_large_image" as const,
  images: [ogImage.url],
};
