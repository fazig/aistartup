import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder - StartupAI Tools",
  description: "Safely encode URL parameters or decode messy web addresses back to plain text.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
