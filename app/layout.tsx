import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
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

  metadataBase: new URL("https://codercatportfolio.vercel.app"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Marcos Manzanares | Développeur Web Full-Stack & Sécurité Web",

    description:
      "Découvrez mon portfolio, mes projets et mes compétences en développement web Full-Stack et sécurité des applications web.",

    url: "https://codercatportfolio.vercel.app",

    siteName: "Marcos Manzanares Portfolio",

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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr">
      <body>
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xbioj2zwkl");
            `,
          }}
        />

        {children}

        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
