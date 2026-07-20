// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LegalNotice from "@/components/MentionsLegalesSection";
import PrivacyModal from "@/components/PrivacyModal";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";

const LINKS = [
  { key: "nav.Home", href: "#hero" },
  { key: "nav.Bio", href: "#bio" },
  { key: "nav.Projects", href: "#projets" },
  { key: "nav.Services", href: "#services" },
  { key: "nav.Testimonials", href: "#testimonials" },
  { key: "nav.Contact", href: "#contact" },
];

const LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);

  // Highlight du lien actif selon la section visible
  useEffect(() => {
    const ids = [
      "hero",
      "bio",
      "projets",
      "services",
      "testimonials",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );

        setActive(topMost.target.id);
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      },
    );

    const observe = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observe();
    const timer = setTimeout(observe, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Empêche le scroll du body quand une modale est ouverte
  useEffect(() => {
    if (legalOpen || privacyOpen || cookiePrefsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [legalOpen, privacyOpen, cookiePrefsOpen]);

  // Fermeture avec la touche Échap
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLegalOpen(false);
        setPrivacyOpen(false);
        setCookiePrefsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const openLegal = () => {
    setMenuOpen(false);
    setLegalOpen(true);
  };

  const openPrivacy = () => {
    setMenuOpen(false);
    setPrivacyOpen(true);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "transparent",
          backdropFilter: "blur(2px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Liens language */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color:
                    i18n.language === code
                      ? "#5ddfff"
                      : "rgba(240,246,255,0.45)",
                  transition: ".2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Liens sections */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 32 }}
            className="nav-desktop"
          >
            <div style={{ display: "flex", gap: 32 }}>
              {LINKS.map(({ key, href }) => {
                const id = href.replace("#", "");
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(href);
                    }}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      color:
                        active === id ? "#5ddfff" : "rgba(240,246,255,0.55)",
                      borderBottom:
                        active === id
                          ? "1px solid #5ddfff"
                          : "1px solid transparent",
                      paddingBottom: 2,
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                  >
                    {t(key)}
                  </a>
                );
              })}
            </div>

            {/* Liens secondaires (mentions légales / confidentialité), séparés visuellement */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderLeft: "1px solid rgba(240,246,255,0.2)",
                paddingLeft: 20,
                marginTop: 3, // légèrement plus bas que les autres liens
              }}
            >
              <a
                href="#confidentialite"
                onClick={(e) => {
                  e.preventDefault();
                  openPrivacy();
                }}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  textDecoration: "none",
                  color: "rgba(240,246,255,0.35)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(240,246,255,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(240,246,255,0.35)")
                }
              >
                {t("nav.privacy")}
              </a>

              <a
                href="#mentions-legales"
                onClick={(e) => {
                  e.preventDefault();
                  openLegal();
                }}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  textDecoration: "none",
                  color: "rgba(240,246,255,0.35)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(240,246,255,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(240,246,255,0.35)")
                }
              >
                {t("nav.legal")}
              </a>
              <a
                href="#cookies"
                onClick={(e) => {
                  e.preventDefault();
                  setCookiePrefsOpen(true);
                }}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  textDecoration: "none",
                  color: "rgba(240,246,255,0.35)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(240,246,255,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(240,246,255,0.35)")
                }
              >
                {t("nav.cookies")}
              </a>
            </div>
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="nav-burger"
            style={{
              background: "transparent",
              border: "1px solid rgba(240,246,255,0.4)",
              borderRadius: "12px",
              cursor: "pointer",
              color: "white",
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              padding: "10px 8px",
              transition: "all 0.2s ease",
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "rgba(240,246,255,0.9)",
                  borderRadius: 2,
                }}
              />
            ))}
          </button>
        </div>

        {/* Menu mobile déroulant */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(10,22,40,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {LINKS.map(({ key, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(href);
                }}
                style={{
                  color: "rgba(240,246,255,0.75)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {t(key)}
              </a>
            ))}

            {/* Liens secondaires en bas du menu mobile, plus petits */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: 16,
                marginTop: 4,
              }}
            >
              <a
                href="#confidentialite"
                onClick={(e) => {
                  e.preventDefault();
                  openPrivacy();
                }}
                style={{
                  color: "rgba(240,246,255,0.4)",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                {t("nav.privacy")}
              </a>

              <a
                href="#mentions-legales"
                onClick={(e) => {
                  e.preventDefault();
                  openLegal();
                }}
                style={{
                  color: "rgba(240,246,255,0.4)",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                {t("nav.legal")}
              </a>
              <a
                href="#cookies"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setCookiePrefsOpen(true);
                }}
                style={{
                  color: "rgba(240,246,255,0.4)",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                {t("nav.cookies")}
              </a>
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 640px) {
            .nav-desktop { display: none !important; }
            .nav-burger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Modale Mentions légales */}
      {legalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mentions légales"
          onClick={() => setLegalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(5,10,20,0.75)",
            backdropFilter: "blur(3px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0b1424",
              color: "rgba(240,246,255,0.9)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              maxWidth: 720,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "40px 32px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setLegalOpen(false)}
              aria-label="Fermer"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "1px solid rgba(240,246,255,0.3)",
                borderRadius: 8,
                color: "rgba(240,246,255,0.8)",
                width: 32,
                height: 32,
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <LegalNotice />
          </div>
        </div>
      )}

      {/* Modale Politique de confidentialité (simple consultation, pas de blocage à l'acceptation) */}
      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onAccept={() => {}}
      >
        <PrivacyPolicy />
      </PrivacyModal>
      <CookiePreferencesModal
        open={cookiePrefsOpen}
        onClose={() => setCookiePrefsOpen(false)}
      />
    </>
  );
}
