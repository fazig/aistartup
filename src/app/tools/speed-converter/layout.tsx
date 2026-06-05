import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speed Converter - StartupAI Tools",
  description: "Convert velocity values between metric, imperial, maritime, and acoustic units instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
