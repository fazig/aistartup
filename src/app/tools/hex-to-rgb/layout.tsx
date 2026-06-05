import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX to RGB Converter - StartupAI Tools",
  description: "Instantly convert hexadecimal web colors into standard RGB values for CSS and graphic design.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
