import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: `
  //     default-src 'self';
  //     script-src 'self';
  //     style-src 'self' 'unsafe-inline';
  //     img-src 'self' data: https:;
  //     font-src 'self' https://fonts.gstatic.com;
  //     connect-src 'self';
  //     object-src 'none';
  //     frame-ancestors 'none';
  //     base-uri 'self';
  //     form-action 'self';
  //     upgrade-insecure-requests;
  //   `.replace(/\n/g, ""),
  // },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Ajoute ici les autres options de configuration Next.js si nécessaire
};

export default nextConfig;
