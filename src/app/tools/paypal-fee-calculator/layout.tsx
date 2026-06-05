import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayPal Fee Calculator - StartupAI Tools",
  description: "Figure out exactly how much PayPal will take from your transaction—or how much to invoice so you get the full amount.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
