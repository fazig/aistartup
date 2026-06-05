import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Hex Converter - StartupAI Tools",
  description: "Convert plain text strings into hexadecimal codes. Perfect for developers working with raw buffers and encodings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
