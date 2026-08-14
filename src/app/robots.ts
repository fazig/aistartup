import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aitoolspro.tech";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/tools/live-sports/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
