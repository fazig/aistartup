import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Calculator - StartupAI Tools",
  description: "Calculate Goods and Services Tax (GST) easily by adding or removing tax values for invoices.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
