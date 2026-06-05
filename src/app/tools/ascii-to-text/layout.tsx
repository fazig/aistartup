import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ASCII to Text Converter - StartupAI Tools",
  description: "Convert numeric ASCII decimal codes back into readable text characters instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
