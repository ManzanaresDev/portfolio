"use client";
// components/BioSection.tsx

import { Trans, useTranslation } from "react-i18next";
import { MapPin, Shield, Monitor, Smartphone } from "lucide-react";

export default function BioSection() {
  const { t } = useTranslation();

  const SKILLS = [
    { icon: <Monitor size={16} />, label: t("bio.skills.web") },
    { icon: <Smartphone size={16} />, label: t("bio.skills.mobile") },
    { icon: <Shield size={16} />, label: t("bio.skills.security") },
  ];

  return (
    <div>
      <span className="title">{t("bio.title")}</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: 48,
          alignItems: "flex-start",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "36px 40px",
        }}
        className="bio-grid"
      >
        {/* GAUCHE — identité */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            paddingRight: 40,
          }}
          className="bio-left"
        >
          {/* Disponibilité */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#34d399",
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.25)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#34d399",
                display: "inline-block",
                boxShadow: "0 0 6px #34d399",
              }}
            />
            {t("bio.availability")}
          </div>

          {/* Nom */}
          <div>
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                fontWeight: 700,
                color: "white",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Marcos Manzanares
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#5ddfff",
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              {t("bio.role")}
            </p>
          </div>

          {/* Localisation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              color: "rgba(240,246,255,0.45)",
            }}
          >
            <MapPin size={13} />
            {t("bio.location")}
          </div>

          {/* Spécialités */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: 4,
            }}
          >
            {SKILLS.map(({ icon, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.8rem",
                  color: "rgba(240,246,255,0.55)",
                }}
              >
                <span style={{ color: "#5ddfff" }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* DROITE — texte */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
              lineHeight: 1.8,
              color: "rgba(240,246,255,0.65)",
              margin: 0,
            }}
          >
            <Trans
              i18nKey="bio.paragraph1"
              components={{
                1: <span style={{ color: "#5ddfff", fontWeight: 500 }} />,
              }}
            />
            <br />
            <br />
            {t("bio.paragraph2")}
            <br />
            <br />
            <Trans
              i18nKey="bio.paragraph3"
              components={{
                1: <span style={{ color: "#5ddfff", fontWeight: 500 }} />,
              }}
            />
            <br />
            <br />
            {t("bio.paragraph4")}
          </p>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              marginTop: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #2563c4, #5ddfff)",
              color: "#0a1628",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
              width: "fit-content",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("bio.cta")}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .bio-grid {
            grid-template-columns: 1fr !important;
            padding: 24px 20px !important;
            gap: 24px !important;
          }
          .bio-left {
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding-bottom: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
