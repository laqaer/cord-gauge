import { spawn } from "node:child_process";
import fs from "node:fs";

const base = process.argv[2];
const outDir = process.argv[3];
const runs = Number(process.argv[4] || 3);
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { id: "home", path: "/" },
  { id: "calculator", path: "/extension-cord-gauge-calculator" },
];
const forms = ["mobile", "desktop"];

function runOnce(url, form, file) {
  const args = [
    "--yes",
    "lighthouse@12",
    url,
    "--only-categories=performance",
    "--output=json",
    `--output-path=${file}`,
    "--quiet",
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
  ];
  if (form === "desktop") args.push("--preset=desktop");
  else args.push("--preset=perf", "--form-factor=mobile", "--screenEmulation.mobile=true");

  return new Promise((resolve, reject) => {
    const child = spawn("npx", args, { stdio: ["ignore", "pipe", "pipe"] });
    let err = "";
    child.stderr.on("data", (chunk) => {
      err += chunk.toString();
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`lighthouse exit ${code}\n${err.slice(-2000)}`));
    });
  });
}

function summarize(file) {
  const report = JSON.parse(fs.readFileSync(file, "utf8"));
  const lcp = report.audits["largest-contentful-paint"];
  const cls = report.audits["cumulative-layout-shift"];
  const element = report.audits["largest-contentful-paint-element"];
  const tables = element?.details?.items || [];
  const node = tables.flatMap((item) => item.items || []).find((item) => item.node)?.node;
  return {
    lcpMs: Math.round(lcp.numericValue),
    cls: Number(cls.numericValue.toFixed(4)),
    lcpElement: node?.nodeLabel || node?.snippet || "unknown",
    score: Math.round((report.categories.performance.score || 0) * 100),
    requestedUrl: report.requestedUrl,
    lighthouseVersion: report.lighthouseVersion,
    formFactor: report.configSettings.formFactor,
    throttling: report.configSettings.throttlingMethod,
  };
}

const summary = [];
for (const form of forms) {
  for (const page of pages) {
    const samples = [];
    for (let i = 1; i <= runs; i += 1) {
      const file = `${outDir}/${form}-${page.id}-run${i}.json`;
      const url = new URL(page.path, base).href;
      process.stdout.write(`run ${form} ${page.id} ${i}/${runs}\n`);
      await runOnce(url, form, file);
      const row = summarize(file);
      samples.push(row);
      process.stdout.write(`  LCP ${row.lcpMs}ms CLS ${row.cls} element ${row.lcpElement}\n`);
    }
    const lcp = samples.map((row) => row.lcpMs).sort((a, b) => a - b);
    const cls = samples.map((row) => row.cls).sort((a, b) => a - b);
    const mid = Math.floor(samples.length / 2);
    summary.push({
      form,
      page: page.id,
      path: page.path,
      runs: samples.length,
      lcpMedianMs: lcp[mid],
      lcpMinMs: lcp[0],
      lcpMaxMs: lcp[lcp.length - 1],
      clsMedian: cls[mid],
      clsMin: cls[0],
      clsMax: cls[cls.length - 1],
      lcpElement: samples[0].lcpElement,
      scoreMedian: samples.map((row) => row.score).sort((a, b) => a - b)[mid],
      lighthouseVersion: samples[0].lighthouseVersion,
      throttling: samples[0].throttling,
      samples,
    });
  }
}

fs.writeFileSync(`${outDir}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
