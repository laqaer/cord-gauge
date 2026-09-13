import { amazonUrl, products } from "@/lib/affiliates";

export function ShopCords() {
  return (
    <section className="mt-14" id="shop-cords">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Shop outdoor cords</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
        Named SJTW cords that match the gauges in these guides. Links go to Amazon (Associates tag
        laqaer-20). We may earn a commission. No scores, no invented prices.
      </p>
      <ul className="mt-6 grid gap-3">
        {products.map((product) => (
          <li
            key={product.asin}
            className="flex flex-col gap-3 border border-rule bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-ink">{product.label}</p>
              <p className="mt-1 font-mono text-xs font-medium text-amp-dark">
                {product.awg} AWG · {product.lengthFt} ft · {product.jacket}
              </p>
            </div>
            <a
              className="shrink-0 text-sm font-medium text-steel underline underline-offset-3 hover:text-amp-dark"
              href={amazonUrl(product.asin)}
              rel="nofollow sponsored noopener"
              target="_blank"
              aria-label={`View ${product.label} on Amazon`}
            >
              View on Amazon
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
