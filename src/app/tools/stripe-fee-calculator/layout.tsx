import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe Fee Calculator - StartupAI Tools",
  description: "Calculate Stripe processing fees and know exactly how much to invoice to receive your target amount.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
