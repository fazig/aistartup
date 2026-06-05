import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Rewriting Tool - StartupAI Tools",
  description: "Convert long, ugly dynamic URLs with query parameters into clean, SEO-friendly static URLs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
