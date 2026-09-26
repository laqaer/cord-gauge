# Cloudflare migration

CordGauge is being validated as a pure Next.js static export to Cloudflare Workers Static Assets. The migration branch disables Vercel Git deployment only for itself. No Worker script is used.

The PR gate runs lint, route type generation, TypeScript, the real `output: "export"` build, static-output assertions, and a credential-free Wrangler dry-run.

After the gate passes, deploy the exact artifact to workers.dev and verify all guides, affiliate links/disclosures, calculator/client interactions, canonical metadata, robots/sitemap, 404s and direct refreshes. Production DNS/custom-domain cutover remains separate; keep Vercel as rollback through stabilization.
