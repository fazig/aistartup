import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WWW Redirect Checker - StartupAI Tools",
  description: "Analyze your domain's server headers to ensure canonical WWW & Non-WWW redirects are properly configured for SEO.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
