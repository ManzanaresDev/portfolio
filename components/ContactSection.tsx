// components/ContactSection.tsx
"use client";

import { useTranslation } from "react-i18next";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <div style={{ width: "100%" }}>
      <h2 className="title">{t("contact.title")}</h2>{" "}
      <p
        style={{
          width: "100%",
          maxWidth: "70ch",
          fontSize: "clamp(0.9rem, 1vw + 0.7rem, 1rem)",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.75,
          marginBottom: "clamp(20px, 3vw, 32px)",
        }}
      >
        {t("contact.description")}
      </p>
      <div
        style={{
          width: "100%",
          borderRadius: 20,
          padding:
            "clamp(20px, 5vw, 40px) clamp(16px, 5vw, 50px)" /* ← responsive */,
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 8px",
              borderRadius: 999,
              fontSize: "0.7rem",
              color: "#5ddfff",
              background: "rgba(93,223,255,0.08)",
              border: "1px solid rgba(93,223,255,0.25)",
            }}
          >
            🔒 {t("contact.secureBadge")}
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
