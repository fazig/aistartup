import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open All URLs - StartupAI Tools",
  description: "Paste a massive list of website links and instantly open all of them simultaneously in new browser tabs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
