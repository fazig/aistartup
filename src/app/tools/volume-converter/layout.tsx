import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volume Converter - StartupAI Tools",
  description: "Convert between liters, gallons, cups, fluid ounces, milliliters, and cubic dimensions instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
