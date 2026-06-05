import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Tag Generator - StartupAI Tools",
  description: "Create perfectly optimized SEO meta tags for your HTML documents to rank higher on Google.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
