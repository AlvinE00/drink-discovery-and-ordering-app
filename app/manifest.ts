import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Midnight Citrus",
    short_name: "Midnight Citrus",
    description: "Find your drink at the party.",
    start_url: "/",
    display: "standalone",
    background_color: "#131114",
    theme_color: "#131114",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
