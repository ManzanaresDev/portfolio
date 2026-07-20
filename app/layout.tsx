// app/layout.tsx
import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsentProvider } from "@/contexte/CookieConsentContext";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsScripts from "@/components/AnalyticsScripts";

// translation
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcos Manzanares | Développeur Web Full-Stack & Sécurité Web",

  description:
    "Portfolio de Marcos Manzanares, développeur web Full-Stack spécialisé en React, Next.js, Node.js, Express, MongoDB et sécurité des applications web. Découvrez mes projets, compétences et réalisations.",

  keywords: [
    "Marcos Manzanares",
    "développeur web",
    "développeur full stack",
    "développeur MERN",
    "portfolio développeur",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "sécurité web",
    "cybersécurité",
    "OWASP",
    "MERN",
    "développeur Dunkerque",
    "Veilink",
    "TaskManager",
    "frontend",
    "backend",
    "développement web",
    "applications web",
  ],

  authors: [{ name: "Marcos Manzanares" }],
  creator: "Marcos Manzanares",
  publisher: "Marcos Manzanares",

  metadataBase: new URL("https://www.codercat.fr"),

  alternates: {
    canonical: "https://www.codercat.fr",
  },

  openGraph: {
    title: "Marcos Manzanares | Développeur Web Full-Stack & Sécurité Web",

    description:
      "Découvrez mon portfolio, mes projets et mes compétences en développement web Full-Stack et sécurité des applications web.",

    url: "https://www.codercat.fr",
    siteName: "CoderCat — Marcos Manzanares",

    locale: "fr_FR",

    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio de Marcos Manzanares - Développeur Web Full-Stack & Sécurité Web",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Marcos Manzanares | Développeur Web Full-Stack & Sécurité Web",

    description:
      "Portfolio professionnel présentant mes projets, compétences et expériences en développement web et sécurité applicative.",

    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr">
      <body>
        <Providers>
          <CookieConsentProvider>
            {children}

            <CookieBanner />
            <AnalyticsScripts gaId={gaId} nonce={nonce} />
          </CookieConsentProvider>
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
