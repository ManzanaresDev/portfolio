// components/AnalyticsScripts.tsx
"use client";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "@/contexte/CookieConsentContext";

export default function AnalyticsScripts({
  gaId,
  nonce,
}: {
  gaId?: string;
  nonce: string;
}) {
  const { consent } = useCookieConsent();

  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        nonce={nonce}
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
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </>
  );
}
