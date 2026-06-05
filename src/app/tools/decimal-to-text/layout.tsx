import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decimal to Text Converter - StartupAI Tools",
  description: "Translate a sequence of Unicode decimal values back into readable text characters with immediate safety validations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
