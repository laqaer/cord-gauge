/**
 * CordGauge operations worker.
 *
 * Counts Amazon outbound clicks and checks the public site.
 * Stores daily totals and the latest health result in KV.
 * Does not call paid APIs, send email, or store IP addresses.
 *
 * Stop: remove the cron trigger, or delete the `cord-gauge-ops` worker
 * in the Laqaer Products Cloudflare account.
 */

const HOST = "https://www.cordgaugeguide.com";
const INDEXNOW_KEY = "8601e4edc7ea47dc85f95937f927d93f";
const ASINS = new Set(["B00004SQF4", "B00004SQF5"]);
const PAGES = [
  "/",
  "/extension-cord-gauge-chart",
  "/extension-cord-gauge-calculator",
  "/best-extension-cord-for-circular-saw",
  `/${INDEXNOW_KEY}.txt`,
];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": HOST,
    },
  });
}

function utcDay(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

async function runHealth() {
  const checks = [];
  for (const path of PAGES) {
    const url = `${HOST}${path}`;
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "cord-gauge-ops/1" },
        signal: AbortSignal.timeout(8000),
      });
      const body = await res.text();
      let ok = res.status === 200;
      if (path === "/") {
        ok = ok && body.includes("tag=laqaer-20") && body.includes("Amazon Associates");
      }
      if (path === `/${INDEXNOW_KEY}.txt`) {
        ok = ok && body.trim() === INDEXNOW_KEY;
      }
      checks.push({ path, status: res.status, ok });
    } catch (error) {
      checks.push({ path, status: 0, ok: false, error: String(error).slice(0, 160) });
    }
  }
  return { ok: checks.every((check) => check.ok), checks, checkedAt: new Date().toISOString() };
}

async function recordClick(env, path, asin) {
  const key = `clicks:${utcDay()}`;
  const current = JSON.parse((await env.COUNTS.get(key)) || '{"clicks":{},"overflow":0}');
  const id = `${path}|${asin}`;
  if (!current.clicks[id] && Object.keys(current.clicks).length >= 40) {
    current.overflow += 1;
  } else {
    current.clicks[id] = (current.clicks[id] || 0) + 1;
  }
  await env.COUNTS.put(key, JSON.stringify(current), { expirationTtl: 60 * 60 * 24 * 120 });
  return current;
}

async function statusPayload(env) {
  const [scheduled, manual, clicks] = await Promise.all([
    env.COUNTS.get("health:scheduled", "json"),
    env.COUNTS.get("health:manual", "json"),
    env.COUNTS.get(`clicks:${utcDay()}`, "json"),
  ]);
  return {
    service: "cord-gauge-ops",
    generatedAt: new Date().toISOString(),
    spend: "no paid APIs; Cloudflare Workers and KV free tier only",
    scheduled,
    manual,
    clicksToday: clicks,
  };
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": HOST,
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-headers": "content-type",
        },
      });
    }

    if (url.pathname === "/status") {
      return json(await statusPayload(env));
    }

    if (url.pathname === "/health") {
      const previous = await env.COUNTS.get("health:manual", "json");
      const previousAt = previous?.checkedAt ? Date.parse(previous.checkedAt) : 0;
      if (previous && Date.now() - previousAt < 60_000) {
        return json({ cached: true, ...previous });
      }
      const health = await runHealth();
      await env.COUNTS.put("health:manual", JSON.stringify(health));
      return json(health, health.ok ? 200 : 503);
    }

    if (url.pathname === "/click" && request.method === "POST") {
      const raw = await request.text();
      if (raw.length > 500) return json({ ok: false }, 400);
      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        return json({ ok: false }, 400);
      }
      const path = typeof body.path === "string" ? body.path : "";
      const asin = typeof body.asin === "string" ? body.asin : "";
      if (!ASINS.has(asin) || !/^\/[a-z0-9/-]{0,80}$/.test(path) || path.includes("..")) {
        return json({ ok: false }, 400);
      }
      await recordClick(env, path, asin);
      return new Response(null, { status: 204, headers: { "access-control-allow-origin": HOST } });
    }

    return json({ ok: false }, 404);
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(
      (async () => {
        const health = await runHealth();
        await env.COUNTS.put("health:scheduled", JSON.stringify(health));
      })(),
    );
  },
};

export default worker;
