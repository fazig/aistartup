import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hex to Text Converter - StartupAI Tools",
  description: "Decode hexadecimal character strings back into readable plain text instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
