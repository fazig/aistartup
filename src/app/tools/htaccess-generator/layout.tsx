import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ".htaccess Redirect Generator - StartupAI Tools",
  description: "Instantly generate Apache server redirect rules to safely move your web pages without losing SEO rankings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
