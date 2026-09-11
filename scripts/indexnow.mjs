#!/usr/bin/env node
/**
 * indexnow.mjs — push new/changed URLs to Bing and Yandex.
 *
 * Ported from lumen/scripts/indexnow.mjs. Next generates sitemap.xml, so
 * --all fetches the live sitemap instead of a checked-in public/sitemap.xml.
 *
 * Usage:
 *   node scripts/indexnow.mjs --all
 *   node scripts/indexnow.mjs https://www.cordgaugeguide.com/about ...
 *   DRY_RUN=1 node scripts/indexnow.mjs --all
 *
 * First --all can wait until public/<key>.txt is deployed and readable.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "www.cordgaugeguide.com";
const KEY = "8601e4edc7ea47dc85f95937f927d93f";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function keyFromPublicFile() {
  const file = path.join(ROOT, "public", `${KEY}.txt`);
  const onDisk = readFileSync(file, "utf8").trim();
  if (onDisk !== KEY) {
    throw new Error(`public/${KEY}.txt must contain exactly the key`);
  }
  return onDisk;
}

async function sitemapUrls() {
  const res = await fetch(SITEMAP);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${SITEMAP}: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const argv = process.argv.slice(2);
const all = argv.includes("--all");
const explicit = argv.filter((a) => a.startsWith("http"));

let urls = all ? await sitemapUrls() : explicit;
if (!urls.length) {
  console.error("Nothing to submit. Pass URLs, or --all for the live sitemap.");
  process.exit(2);
}

// The endpoint 422s an entire batch if ONE url is off-host — drop those
// rather than discovering it in a rejection.
const offHost = [];
urls = urls.filter((u) => {
  try {
    if (new URL(u).host === HOST) return true;
  } catch {
    /* invalid */
  }
  offHost.push(u);
  return false;
});
if (offHost.length) {
  console.error(`Filtered ${offHost.length} URL(s) not on ${HOST}:`);
  for (const u of offHost) console.error("  " + u);
}
urls = [...new Set(urls)];
if (!urls.length) {
  console.error("Nothing left to submit after off-host filter.");
  process.exit(2);
}

const key = keyFromPublicFile();

console.log(`Submitting ${urls.length} URL(s) for ${HOST}:`);
for (const u of urls) console.log("  " + u);

if (process.env.DRY_RUN) {
  console.log("\nDRY RUN — nothing sent.");
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});
const body = await res.text();

// 200 accepted, 202 accepted-pending-key-verification: both are successes.
if (res.status === 200 || res.status === 202) {
  console.log(`\nAccepted (${res.status}).`);
  process.exit(0);
}
console.error(`\nRejected ${res.status}: ${body.slice(0, 300)}`);
if (res.status === 403) {
  console.error(`  403 means the key file is not readable at https://${HOST}/${KEY}.txt — deploy first.`);
}
process.exit(1);
