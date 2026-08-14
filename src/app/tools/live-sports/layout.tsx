import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Sports Scores",
  description: "Live sports scoreboard utility.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LiveSportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
