import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to ASCII Converter - StartupAI Tools",
  description: "Convert plain text characters into their corresponding decimal ASCII numerical codes instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
