// components/HeroSection.tsx
"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="hero-content">
      <div className="hero-logo">
        <Image
          src="/coderCatLogo.png"
          alt="CoderCat Logo"
          width={500}
          height={500}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>

      <div className="hero-text">
        <h2 className="title">{t("hero.title")}</h2>
        <p className="hero-description">{t("hero.description")}</p>
      </div>
    </div>
  );
}
