// components/LanguageSlider.tsx
"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGS = ["fr", "es"] as const;

type Props = {
  /** "default" pour le menu, "compact" pour la barre du haut sur mobile */
  size?: "default" | "compact";
};

export default function LanguageSlider({ size = "default" }: Props) {
  const { i18n } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const current = LANGS.includes(i18n.language as (typeof LANGS)[number])
    ? (i18n.language as (typeof LANGS)[number])
    : "fr";

  const selectFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    const next = percent > 0.5 ? "es" : "fr";
    if (next !== i18n.language) i18n.changeLanguage(next);
  };

  const dims =
    size === "compact"
      ? { width: 108, height: 32, thumb: 52, font: "0.68rem" }
      : { width: 160, height: 44, thumb: 76, font: "0.8rem" };

  return (
    <div
      ref={trackRef}
      onPointerDown={(e) => {
        setDragging(true);
        selectFromClientX(e.clientX);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (dragging) selectFromClientX(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      role="radiogroup"
      aria-label="Choix de la langue"
      style={{
        position: "relative",
        width: dims.width,
        height: dims.height,
        background: "rgba(240,246,255,0.06)",
        borderRadius: dims.height / 2,
        border: "1px solid rgba(240,246,255,0.15)",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        touchAction: "pan-y",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {/* Labels en fond */}
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: dims.font,
          fontWeight: 600,
          color: "rgba(240,246,255,0.5)",
          pointerEvents: "none",
        }}
      >
        FR
      </span>
      <span
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: dims.font,
          fontWeight: 600,
          color: "rgba(240,246,255,0.5)",
          pointerEvents: "none",
        }}
      >
        ES
      </span>

      {/* Curseur / thumb */}
      <div
        role="radio"
        aria-checked={true}
        style={{
          position: "absolute",
          top: 2,
          left: current === "fr" ? 2 : `calc(100% - ${dims.thumb + 2}px)`,
          width: dims.thumb,
          height: dims.height - 4,
          borderRadius: (dims.height - 4) / 2,
          background: "#5ddfff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: dims.font,
          fontWeight: 700,
          color: "#04202e",
          transition: dragging ? "none" : "left 0.25s ease",
          pointerEvents: "none",
        }}
      >
        {current === "fr" ? "FR" : "ES"}
      </div>
    </div>
  );
}
