import assert from "node:assert/strict";
import test from "node:test";
import { adsTxtBody } from "./site.ts";

const SELLER_LINE = /^google\.com, pub-[^,]+, DIRECT, f08c47fec0942fa0$/;

test("ads.txt is comment-only when the publisher id is empty", () => {
  const body = adsTxtBody("");
  const lines = body.split("\n").filter((line) => line.length > 0);

  assert.ok(lines.length > 0);
  for (const line of lines) {
    assert.equal(line.startsWith("#"), true, line);
  }
  assert.equal(body.includes("google.com"), false);
  assert.equal(body.includes("pub-"), false);
});

test("ads.txt emits the google.com seller line when a publisher id is set", () => {
  const fromId = adsTxtBody("TESTONLY").trim();
  const fromPrefixed = adsTxtBody("pub-TESTONLY").trim();

  assert.equal(fromId, "google.com, pub-TESTONLY, DIRECT, f08c47fec0942fa0");
  assert.equal(fromPrefixed, fromId);
  assert.match(fromId, SELLER_LINE);
  assert.equal(adsTxtBody("TESTONLY").trim().split("\n").length, 1);
});
