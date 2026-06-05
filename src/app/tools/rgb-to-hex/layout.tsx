import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RGB to Hex Converter - StartupAI Tools",
  description: "Instantly convert RGB color codes into HEX format, or vice-versa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
