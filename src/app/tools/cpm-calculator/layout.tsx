import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPM (Cost Per Mille) Calculator - StartupAI Tools",
  description: "Solve for campaign CPM, budget cost, or impressions based on your marketing metrics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
