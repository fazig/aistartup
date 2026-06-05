import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX to Decimal Converter - StartupAI Tools",
  description: "Convert hexadecimal numbers (Base 16) to decimal values (Base 10) with an interactive step-by-step guide.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
