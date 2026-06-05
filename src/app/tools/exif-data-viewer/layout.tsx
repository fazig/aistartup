import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EXIF Data Viewer - StartupAI Tools",
  description: "Extract and read the hidden metadata (camera settings, date, GPS location) secretly embedded inside your photos.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
