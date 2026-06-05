import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Tax Calculator - StartupAI Tools",
  description: "Quickly calculate sales tax or reverse-calculate the pre-tax price. Includes common tax rate presets.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
