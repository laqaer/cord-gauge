import assert from "node:assert/strict";
import test from "node:test";
import { recommendAwg, voltageDropPercent, voltageDropVolts } from "./cords.ts";
import { AMAZON_TAG, amazonSearchUrl, amazonUrl, cordPickGrid, products, selectProducts } from "./affiliates.ts";
import { guides, guidesByHref, specialtyLoadHrefs, specialtyLoadWhy, toolBuyerHrefs, toolBuyerWhy } from "./guides.ts";

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
    ["B00004SQF4", "B00004SQF5", "B00065UZG8", "B0CQ23CMKP"],
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

  const fourteenFifty = selectProducts({ pick: 14, lengthFt: 50 });
  assert.equal(fourteenFifty.note, null);
  assert.deepEqual(
    fourteenFifty.products.map((product) => product.asin),
    ["B00065UZG8"],
  );

  const twelveShort = selectProducts({ pick: 12, lengthFt: 25 });
  assert.equal(twelveShort.note, null);
  assert.deepEqual(
    twelveShort.products.map((product) => product.asin),
    ["B0CQ23CMKP", "B00004SQF4", "B00004SQF5"],
  );

  const hundred = selectProducts({ pick: 10, lengthFt: 100 });
  assert.match(hundred.note ?? "", /10 AWG/);
  assert.deepEqual(
    hundred.products.map((product) => product.asin),
    ["B00004SQF5"],
  );

  const light = selectProducts({ pick: 16, lengthFt: 25 });
  assert.match(light.note ?? "", /16 AWG/);
  assert.equal(light.products.length, 4);
});

test("length by gauge shop links use laqaer-20 and only the checked ASINs", () => {
  const cells = cordPickGrid().flat();
  assert.equal(cells.length, 12);
  const byKey = new Map(cells.map((cell) => [`${cell.lengthFt}-${cell.awg}`, cell]));
  assert.equal(byKey.get("25-12")?.href, "https://www.amazon.com/dp/B0CQ23CMKP?tag=laqaer-20");
  assert.equal(byKey.get("25-12")?.asin, "B0CQ23CMKP");
  assert.equal(byKey.get("50-14")?.href, "https://www.amazon.com/dp/B00065UZG8?tag=laqaer-20");
  assert.equal(byKey.get("50-14")?.asin, "B00065UZG8");
  assert.equal(byKey.get("50-12")?.href, "https://www.amazon.com/dp/B00004SQF4?tag=laqaer-20");
  assert.equal(byKey.get("50-12")?.asin, "B00004SQF4");
  assert.equal(byKey.get("100-12")?.href, "https://www.amazon.com/dp/B00004SQF5?tag=laqaer-20");
  assert.equal(byKey.get("100-12")?.asin, "B00004SQF5");
  assert.equal(
    byKey.get("25-16")?.href,
    "https://www.amazon.com/s?k=25+ft+16+gauge+extension+cord&tag=laqaer-20",
  );
  assert.equal(byKey.get("100-10")?.asin, null);
  assert.match(byKey.get("100-10")?.href ?? "", /k=100\+ft\+10\+gauge\+extension\+cord&tag=laqaer-20$/);
  for (const cell of cells) {
    assert.equal(cell.href.includes("tag=laqaer-20"), true);
    assert.equal(cell.href.split("tag=").length, 2);
  }
  assert.deepEqual(
    cells.flatMap((cell) => (cell.asin ? [cell.asin] : [])),
    ["B0CQ23CMKP", "B00065UZG8", "B00004SQF4", "B00004SQF5"],
  );
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

test("amazon search urls carry one laqaer-20 tag and no product ASIN", () => {
  const href = amazonSearchUrl("30 amp RV extension cord 10 AWG TT-30");
  assert.equal(
    href,
    "https://www.amazon.com/s?k=30+amp+RV+extension+cord+10+AWG+TT-30&tag=laqaer-20",
  );
  assert.equal(href.split("tag=").length, 2);
  assert.equal(href.includes("/dp/"), false);
  assert.equal(href.includes("B00004SQF4"), false);
  assert.equal(href.includes("B00004SQF5"), false);
});

test("specialty load guides are real pages the chart can link", () => {
  assert.deepEqual(
    guidesByHref(specialtyLoadHrefs).map((guide) => guide.href),
    [...specialtyLoadHrefs],
  );
  for (const href of specialtyLoadHrefs) {
    assert.equal(guides.some((guide) => guide.href === href), true);
    assert.ok(specialtyLoadWhy[href].length > 0);
  }
});
