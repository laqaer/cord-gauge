import assert from "node:assert/strict";
import test from "node:test";
import { recommendAwg, voltageDropPercent, voltageDropVolts } from "./cords.ts";
import { AMAZON_TAG, amazonUrl, products, selectProducts } from "./affiliates.ts";
import { guidesByHref, toolBuyerHrefs, toolBuyerWhy } from "./guides.ts";

test("15 A voltage drop uses the two-way copper path", () => {
  assert.equal(voltageDropVolts(12, 15, 100), 5.79);
  assert.equal(voltageDropPercent(12, 15, 100).toFixed(1), "4.8");
  assert.equal(voltageDropVolts(10, 15, 100).toFixed(2), "3.63");
  assert.equal(voltageDropVolts(14, 15, 50).toFixed(2), "4.61");
});

test("shop picks stay near 3% for motor tools", () => {
  assert.equal(recommendAwg(10, 25), 16);
  assert.equal(recommendAwg(10, 50), 14);
  assert.equal(recommendAwg(10, 100), 12);
  assert.equal(recommendAwg(15, 25), 12);
  assert.equal(recommendAwg(15, 50), 12);
  assert.equal(recommendAwg(15, 100), 10);
  assert.equal(recommendAwg(13, 100), 10);
});

test("in-stock shop links match gauge and length", () => {
  assert.equal(AMAZON_TAG, "laqaer-20");
  assert.equal(amazonUrl("B00004SQF4"), "https://www.amazon.com/dp/B00004SQF4?tag=laqaer-20");
  assert.deepEqual(
    products.map((product) => product.asin),
    ["B00004SQF4", "B00004SQF5"],
  );
  for (const dropped of ["B01LXI1NL8", "B09BDFM4HC", "B09BDGHQBP"]) {
    assert.equal(
      products.some((product) => product.asin === dropped),
      false,
      dropped,
    );
  }

  const fifty = selectProducts({ pick: 12, lengthFt: 50 });
  assert.equal(fifty.note, null);
  assert.deepEqual(
    fifty.products.map((product) => product.lengthFt),
    [50, 100],
  );

  const hundred = selectProducts({ pick: 10, lengthFt: 100 });
  assert.match(hundred.note ?? "", /10 AWG/);
  assert.deepEqual(
    hundred.products.map((product) => product.asin),
    ["B00004SQF5"],
  );

  const light = selectProducts({ pick: 16, lengthFt: 25 });
  assert.match(light.note ?? "", /16 AWG/);
  assert.equal(light.products.length, 2);
});

test("calculator and chart hand off to the four tool buyer guides", () => {
  assert.deepEqual(
    [...toolBuyerHrefs],
    [
      "/best-extension-cord-for-circular-saw",
      "/best-extension-cord-for-table-saw",
      "/best-extension-cord-for-air-compressor",
      "/best-extension-cord-for-pressure-washer",
    ],
  );
  assert.deepEqual(
    guidesByHref(toolBuyerHrefs).map((guide) => guide.href),
    [...toolBuyerHrefs],
  );
  for (const href of toolBuyerHrefs) {
    assert.match(toolBuyerWhy[href], /AWG/);
  }
});
