import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#131114" }}>
        <svg width="140" height="140" viewBox="0 0 64 64">
          <path d="M14 18 Q16 40 32 41 Q48 40 50 18 Z" fill="#ff6a47" />
          <path
            d="M14 18 Q16 40 32 41 Q48 40 50 18 Z M32 41 L32 52 M23 54 Q32 50 41 54"
            fill="none"
            stroke="#f4eadb"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="18" r="7" fill="#a7afff" />
        </svg>
      </div>
    ),
    size,
  );
}
