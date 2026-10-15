import { adsTxtBody } from "@/lib/site";

// Build-time route for Next.js static export.
export const dynamic = "force-static";

export function GET() {
  return new Response(adsTxtBody(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
