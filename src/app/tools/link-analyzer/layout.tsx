import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Link Analyzer - StartupAI Tools",
  description: "Scan any webpage to instantly calculate the exact ratio of Internal vs. External outbound links for SEO auditing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
