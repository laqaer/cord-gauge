import type { ReactNode } from "react";
import { AmazonLink } from "@/components/amazon-link";
import { products, selectProducts } from "@/lib/affiliates";
import type { Awg } from "@/lib/cords";

export function ShopBuyLine({
  awg,
  lengthFt,
  children,
  after,
  className,
}: {
  awg: 10 | 12;
  lengthFt: 50 | 100;
  children: ReactNode;
  after?: ReactNode;
  className?: string;
}) {
  const product = products.find((item) => item.awg === awg && item.lengthFt === lengthFt);
  if (!product) return null;

  return (
    <p className={className}>
      <AmazonLink asin={product.asin} label={product.label}>
        {children}
      </AmazonLink>
      {after ? <> {after}</> : null}
    </p>
  );
}

export function ShopCords({
  pick,
  lengthFt,
  heading = "Shop outdoor cords",
}: {
  pick?: Awg;
  lengthFt?: 25 | 50 | 100;
  heading?: string;
}) {
  const selection = selectProducts({ pick, lengthFt });

  return (
    <section className="mt-14" id="shop-cords">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{heading}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
        Named SJTW cords checked against the Amazon listing for gauge, length, and a live buy box.
        Links go to Amazon (Associates tag laqaer-20). We may earn a commission. No scores and no
        prices.
      </p>
      {selection.note ? (
        <p className="mt-3 max-w-2xl border border-rule bg-warn-soft px-4 py-3 text-sm leading-6 text-ink">
          {selection.note}
        </p>
      ) : null}
      <ul className="mt-6 grid gap-3">
        {selection.products.map((product) => (
          <li
            key={product.asin}
            className="flex flex-col gap-3 border border-rule bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-ink">{product.label}</p>
              <p className="mt-1 font-mono text-xs font-medium text-amp-dark">
                {product.awg} AWG · {product.lengthFt} ft · {product.jacket}
              </p>
              {product.note ? <p className="mt-2 text-sm leading-6 text-ink-soft">{product.note}</p> : null}
            </div>
            <AmazonLink asin={product.asin} label={product.label} />
          </li>
        ))}
      </ul>
    </section>
  );
}
