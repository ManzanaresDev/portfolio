import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Portfolio — Digital Experiences",
  description: "Full-stack developer & product designer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const G_id = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="fr">
      <body>{children}</body>
      <GoogleAnalytics gaId={G_id} />
    </html>
  );
}
