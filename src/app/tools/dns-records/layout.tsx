import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find DNS Records - StartupAI Tools",
  description: "Query Google's Public DNS to instantly check A, CNAME, MX, TXT, and NS records for any domain.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
