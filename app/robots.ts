import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Build-time metadata route for Next.js static export.
export const dynamic = "force-static";

const allowAll = [
  "*",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "OAI-SearchBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowAll.map((userAgent) => ({ userAgent, allow: "/" })),
    sitemap: `${site.url}/sitemap.xml`,
    host: new URL(site.url).host,
  };
}
