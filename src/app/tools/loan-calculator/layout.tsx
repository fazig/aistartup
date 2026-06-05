import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan & EMI Calculator - StartupAI Tools",
  description: "Calculate your monthly EMI payments, total interest, and see a visual breakdown of your loan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
