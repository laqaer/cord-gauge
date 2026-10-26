import type { ReactNode } from "react";
import { AmazonLink } from "@/components/amazon-link";
import { CrossSection } from "@/components/marks";
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
    <p className={className ? `buy-line ${className}` : "buy-line"}>
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
    <section className="shop-panel" id="shop-cords">
      <h2>{heading}</h2>
      <p className="shop-intro">
        Named SJTW cords checked against the Amazon listing for gauge, length, and a live buy box.
        Links go to Amazon (Associates tag laqaer-20). We may earn a commission. No scores and no
        prices.
      </p>
      {selection.note ? <p className="shop-caution">{selection.note}</p> : null}
      <ul className="shop-list">
        {selection.products.map((product) => (
          <li key={product.asin} className="shop-row motion-line">
            <div className="shop-row-main">
              <CrossSection awg={product.awg} className="shop-face" />
              <div>
                <p className="shop-label">{product.label}</p>
                <p className="shop-spec">
                  {product.awg} AWG · {product.lengthFt} ft · {product.jacket}
                </p>
                {product.note ? <p className="shop-row-note">{product.note}</p> : null}
              </div>
            </div>
            <AmazonLink asin={product.asin} label={product.label} />
          </li>
        ))}
      </ul>
    </section>
  );
}
