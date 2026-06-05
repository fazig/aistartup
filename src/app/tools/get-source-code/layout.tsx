import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Source Code of Webpage - StartupAI Tools",
  description: "Instantly extract and view the raw HTML source code of any URL on the internet.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
