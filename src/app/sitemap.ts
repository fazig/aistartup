import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  // We can default this to a placeholder or detect the deployment URL,
  // but a static domain configuration is standard for production builds.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aitoolspro.tech"; 

  // Read all directories inside src/app/tools to dynamically list every tool page
  const toolsDir = path.join(process.cwd(), "src/app/tools");
  let toolRoutes: string[] = [];
  try {
    if (fs.existsSync(toolsDir)) {
      const files = fs.readdirSync(toolsDir);
      const excludedTools = new Set(["live-sports"]);
      toolRoutes = files.filter(file => {
        const fullPath = path.join(toolsDir, file);
        return (
          fs.statSync(fullPath).isDirectory() &&
          fs.existsSync(path.join(fullPath, "page.tsx")) &&
          !excludedTools.has(file)
        );
      });
    }
  } catch (e) {
    console.error("Failed to read tools directory for sitemap generation:", e);
  }

  const buildDate = new Date();
  
  const staticRoutes = [
    "",
    "/tools",
    "/free-sumo-tools",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookie-policy",
    "/disclaimer",
    "/remove-background"
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: buildDate,
    changeFrequency: ["", "/tools", "/free-sumo-tools", "/blog"].includes(route) ? "daily" : "monthly",
    priority: route === "" ? 1.0 : (["/tools", "/free-sumo-tools", "/blog", "/remove-background"].includes(route) ? 0.9 : (["/about", "/contact"].includes(route) ? 0.5 : 0.3)),
  }));

  const toolEntries: MetadataRoute.Sitemap = toolRoutes.map(route => {
    let mtime = buildDate;
    try {
      mtime = fs.statSync(path.join(toolsDir, route, "page.tsx")).mtime;
    } catch (e) {
      // ignore
    }
    return {
      url: `${baseUrl}/tools/${route}`,
      lastModified: mtime,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...staticEntries,
    ...toolEntries,
    ...BLOG_POSTS.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  ];

  return sitemapEntries;
}
