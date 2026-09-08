import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StartupAI Tools | Free Developer & Web Utilities",
    short_name: "StartupAI",
    description: "100+ free, fast browser-based tools for developers, creators, and marketers.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#2563eb",
    orientation: "portrait",
    categories: ["utilities", "productivity", "developer tools", "finance"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
      },
    ],
  };
}
