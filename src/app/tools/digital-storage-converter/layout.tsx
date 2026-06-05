import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Storage Converter - StartupAI Tools",
  description: "Convert between bits, bytes, KB, MB, GB, TB, and PB. Compare Decimal (1000) vs Binary (1024) formats instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
