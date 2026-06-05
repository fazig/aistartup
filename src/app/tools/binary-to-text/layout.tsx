import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary to Text Converter - StartupAI Tools",
  description: "Decode binary code (zeros and ones) back into readable English plain text in real-time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
