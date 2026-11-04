import { ImageResponse } from "next/og";

export const alt = "Pratik Sharma - Full-Stack & Backend Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const tags = [
    "NODE.JS",
    "NESTJS",
    "POSTGRESQL",
    "WEBRTC",
    "DOCKER",
    "REACT",
    "AI AGENTS",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090B",
          color: "#F4F4F5",
          padding: "60px 80px",
          fontFamily: "monospace",
          border: "2px solid #27272A",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#71717A",
            fontSize: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                width: 12,
                height: 12,
                backgroundColor: "#10B981",
                marginRight: 12,
              }}
            />
            <span>SYS.STATUS: AVAILABLE // BUTWAL, NEPAL</span>
          </div>
          <div>PORTFOLIO // TELEMETRY</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "#F4F4F5",
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            Pratik Sharma
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#71717A",
            }}
          >
            Full-Stack &amp; Backend Engineer
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid #27272A",
                backgroundColor: "rgba(39, 39, 42, 0.4)",
                padding: "8px 16px",
                fontSize: 16,
                color: "#F4F4F5",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

