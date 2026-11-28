import type { ReactNode } from "react";
import { AmazonLink } from "@/components/amazon-link";
import { cordPickAwgs, cordPickGrid, products, selectProducts } from "@/lib/affiliates";
import type { Awg } from "@/lib/cords";

export function ShopBuyLine({
  awg,
  lengthFt,
  children,
  after,
  className,
  linkLabel,
}: {
  awg: 10 | 12;
  lengthFt: 50 | 100;
  children: ReactNode;
  after?: ReactNode;
  className?: string;
  linkLabel?: string;
}) {
  const product = products.find((item) => item.awg === awg && item.lengthFt === lengthFt);
  if (!product) return null;

  return (
    <p className={className ? `buy-line ${className}` : "buy-line"}>
      {linkLabel ? (
        <>
          {children}{" "}
          <AmazonLink asin={product.asin} label={product.label}>{linkLabel}</AmazonLink>.
        </>
      ) : (
        <AmazonLink asin={product.asin} label={product.label}>
          {children}
        </AmazonLink>
      )}
      {after ? <> {after}</> : null}
    </p>
  );
}

function LengthAwgTable() {
  const rows = cordPickGrid();

  return (
    <>
      <p className="shop-intro">
        Verified cords open their Amazon product page. Every other cell searches Amazon for that
        length and gauge.
      </p>
      <div className="table-scroll">
        <table>
          <caption className="sr-only">Extension cords by length and AWG. Links open Amazon.</caption>
          <thead>
            <tr>
              <th scope="col">Length</th>
              {cordPickAwgs.map((awg) => (
                <th key={awg} scope="col">
                  {awg} AWG
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0].lengthFt}>
                <th scope="row">{row[0].lengthFt} ft</th>
                {row.map((cell) => (
                  <td key={cell.awg}>
                    <AmazonLink href={cell.href} asin={cell.asin ?? undefined} label={cell.label}>
                      {cell.awg} AWG
                    </AmazonLink>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function ShopCords({
  pick,
  lengthFt,
  heading = "Shop outdoor cords",
  lengthByAwg = false,
}: {
  pick?: Awg;
  lengthFt?: 25 | 50 | 100;
  heading?: string;
  lengthByAwg?: boolean;
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
      {lengthByAwg ? <LengthAwgTable /> : null}
      {selection.note ? <p className="shop-caution">{selection.note}</p> : null}
      <ul className="shop-list">
        {selection.products.map((product) => (
          <li key={product.asin} className="shop-row">
            <div>
              <p className="shop-label">{product.label}</p>
              <p className="shop-spec">
                {product.awg} AWG · {product.lengthFt} ft · {product.jacket}
              </p>
              {product.note ? <p className="shop-row-note">{product.note}</p> : null}
            </div>
            <AmazonLink asin={product.asin} label={product.label} />
          </li>
        ))}
      </ul>
    </section>
  );
}
