import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comma Separator Tool - StartupAI Tools",
  description: "Convert a list of items into a comma-separated string or split them back out — with tons of separator and formatting options.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
