import { ImageResponse } from "next/og";

export const alt = "CordGauge Guide — extension cord gauge by amps and length";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#161b22",
          color: "#f7f9fb",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#c47b12",
          }}
        >
          CordGauge Guide
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            AWG × amps × length
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              color: "#c5ced6",
              maxWidth: 860,
            }}
          >
            Independent extension-cord gauge picks for shop and DIY tools. No fake reviews.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#8a9aab" }}>
          cordgaugeguide.com · Laqaer Products
        </div>
      </div>
    ),
    { ...size },
  );
}
