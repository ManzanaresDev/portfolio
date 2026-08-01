"use client";

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
    <div className="bio-section">
      <h2 className="title">{t("bio.title")}</h2>

      <div className="bio-grid">
        {/* GAUCHE */}
        <aside className="bio-left">
          <div className="bio-availability">
            <span className="bio-availability-dot"></span>
            <span>{t("bio.availability")}</span>
          </div>

          <div className="bio-identity">
            <h3 className="bio-name">
              Marcos
              <br />
              Manzanares
            </h3>

            <p className="bio-role">{t("bio.role")}</p>
          </div>

          <div className="bio-location">
            <MapPin size={14} />
            {t("bio.location")}
          </div>

          <div className="bio-skills">
            {SKILLS.map(({ icon, label }) => (
              <div key={label} className="bio-skill">
                <span className="bio-skill-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </aside>

        {/* DROITE */}
        <div className="bio-content">
          <p className="bio-text">
            <Trans
              i18nKey="bio.paragraph1"
              components={{
                1: <span className="bio-highlight" />,
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
                1: <span className="bio-highlight" />,
              }}
            />

            <br />
            <br />

            {t("bio.paragraph4")}
          </p>

          <a
            href="#contact"
            className="bio-button"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("bio.cta")}
          </a>
        </div>
      </div>
    </div>
  );
}
