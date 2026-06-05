import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount Calculator - StartupAI Tools",
  description: "Quickly figure out how much you save with any discount — enter a percentage or fixed amount and see the final price instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
