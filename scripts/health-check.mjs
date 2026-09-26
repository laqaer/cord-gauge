#!/usr/bin/env node
/**
 * Public production check. No credentials.
 * Fails if a required page is down, the affiliate tag is missing,
 * or a removed ASIN is back on the homepage.
 */
const HOST = "https://www.cordgaugeguide.com";
const INDEXNOW_KEY = "8601e4edc7ea47dc85f95937f927d93f";
const pages = [
  "/",
  "/extension-cord-gauge-chart",
  "/extension-cord-gauge-calculator",
  "/best-extension-cord-for-circular-saw",
  "/robots.txt",
  "/sitemap.xml",
  `/${INDEXNOW_KEY}.txt`,
];

let failed = false;

for (const path of pages) {
  const res = await fetch(`${HOST}${path}`, { redirect: "follow" });
  const body = await res.text();
  let ok = res.status === 200;
  if (path === "/") {
    ok =
      ok &&
      body.includes("tag=laqaer-20") &&
      body.includes("Amazon Associates") &&
      body.includes("B00004SQF4") &&
      body.includes("B00004SQF5") &&
      !body.includes("B01LXI1NL8") &&
      !body.includes("B09BDFM4HC") &&
      !body.includes("B09BDGHQBP");
  }
  if (path.endsWith(".txt")) ok = ok && body.trim() === INDEXNOW_KEY;
  if (path === "/sitemap.xml") ok = ok && body.includes("/extension-cord-gauge-calculator");
  console.log(`${ok ? "ok" : "FAIL"} ${res.status} ${path}`);
  if (!ok) failed = true;
}

if (failed) process.exit(1);
