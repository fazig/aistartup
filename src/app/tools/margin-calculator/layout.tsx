import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Margin & Markup Calculator - StartupAI Tools",
  description: "Solve for profit margins, markups, and calculate selling prices to hit target profit goals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
