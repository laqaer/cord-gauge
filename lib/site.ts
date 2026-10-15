export const site = {
  name: "CordGauge Guide",
  shortName: "CordGauge",
  tagline: "Pick extension-cord gauge from amps and run length — not from the color of the jacket.",
  description:
    "Independent AWG decision guide for shop and DIY power tools. Compare extension-cord gauge by amps × run length. No fake reviews.",
  url: "https://www.cordgaugeguide.com",
  domain: "cordgaugeguide.com",
  email: "hello@cordgaugeguide.com",
  publisher: "Laqaer Products",
  locale: "en_US",
  updated: "2026-09-26",
} as const;

export const affiliateDisclosure =
  "CordGauge Guide is reader-supported. Some links are Amazon Associates links (tag=laqaer-20). If you buy through those links, we may earn a commission at no extra cost to you. We do not sell numbered review scores.";

export const electricalCaveat =
  "This is planning guidance, not an electrical-code inspection and not a substitute for the tool nameplate or the cord listing. Ampacity comes from the marked cord and plug, not from AWG alone. National Electrical Code rules, local amendments, and the equipment manual control the job. Hire a licensed electrician for new circuits, and do not use an indoor cord outdoors.";

// Swap path: set this fallback, or NEXT_PUBLIC_ADSENSE_PUB_ID at build.
export const ADSENSE_PUB_ID = (process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "").trim();

const GOOGLE_ADS_TXT_CERT = "f08c47fec0942fa0";

export function adsTxtBody(pubId: string = ADSENSE_PUB_ID): string {
  const id = pubId.trim().replace(/^pub-/i, "");
  if (!id) {
    return [
      "# CordGauge Guide ads.txt placeholder",
      "# Replace with authorized digital sellers before serving ads.",
      "# cordgaugeguide.com",
      "",
    ].join("\n");
  }

  return `google.com, pub-${id}, DIRECT, ${GOOGLE_ADS_TXT_CERT}\n`;
}
