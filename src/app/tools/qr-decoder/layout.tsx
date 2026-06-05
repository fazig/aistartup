import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Decoder - StartupAI Tools",
  description: "Instantly decode QR codes from image files or directly through your live device webcam. Everything is processed locally in your browser—no uploads required.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
