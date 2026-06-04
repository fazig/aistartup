import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  // We can default this to a placeholder or detect the deployment URL,
  // but a static domain configuration is standard for production builds.
  const baseUrl = "https://www.aitoolspro.tech"; 

  // Read all directories inside src/app/tools to dynamically list every tool page
  const toolsDir = path.join(process.cwd(), "src/app/tools");
  let toolRoutes: string[] = [];
  try {
    if (fs.existsSync(toolsDir)) {
      const files = fs.readdirSync(toolsDir);
      toolRoutes = files.filter(file => {
        const fullPath = path.join(toolsDir, file);
        return fs.statSync(fullPath).isDirectory();
      });
    }
  } catch (e) {
    console.error("Failed to read tools directory for sitemap generation:", e);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-sumo-tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...toolRoutes.map(route => ({
      url: `${baseUrl}/tools/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  ];

  return sitemapEntries;
}
