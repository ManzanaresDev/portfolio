"use client";

import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useCookieConsent } from "@/contexte/CookieConsentContext";
import PrivacyModal from "@/components/PrivacyModal";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export default function CookieBanner() {
  const { t } = useTranslation();
  const { hasChosen, acceptCookies, refuseCookies } = useCookieConsent();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  if (hasChosen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-label={t("cookieBanner.ariaLabel") as string}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "#0b1424",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          boxShadow: "0 -10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(240,246,255,0.75)",
            fontSize: "0.85rem",
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          <Trans
            i18nKey="cookieBanner.text"
            components={[
              <button
                key="privacy-link"
                type="button"
                onClick={() => setPrivacyOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "#5ddfff",
                  textDecoration: "underline",
                  cursor: "pointer",
                  font: "inherit",
                }}
              />,
              <strong key="manage-cookies" />,
            ]}
          />
        </p>

        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            onClick={refuseCookies}
            style={{
              padding: "10px 18px",
              fontSize: "0.8rem",
              fontWeight: 500,
              borderRadius: 10,
              border: "1px solid rgba(240,246,255,0.25)",
              background: "transparent",
              color: "rgba(240,246,255,0.8)",
              cursor: "pointer",
            }}
          >
            {t("cookieBanner.refuse")}
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            style={{
              padding: "10px 18px",
              fontSize: "0.8rem",
              fontWeight: 600,
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #2563c4, #5ddfff)",
              color: "#0a1628",
              cursor: "pointer",
            }}
          >
            {t("cookieBanner.accept")}
          </button>
        </div>
      </div>

      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onAccept={() => setPrivacyOpen(false)}
      >
        <PrivacyPolicy hideTitle />
      </PrivacyModal>
    </>
  );
}
