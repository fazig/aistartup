import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Generator - StartupAI Tools",
  description: "Instantly generate a basic privacy policy for your website, blog, or app to comply with AdSense and app store requirements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
