"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Bio", href: "#bio" },
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        // borderBottom: "1px solid rgba(255,255,255,0.08)",
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
          justifyContent: "flex-end",
        }}
      >
        {/* Liens desktop */}
        <div style={{ display: "flex", gap: 32 }} className="nav-desktop">
          {LINKS.map(({ label, href }) => {
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
                  color: active === id ? "#5ddfff" : "rgba(240,246,255,0.55)",
                  borderBottom:
                    active === id
                      ? "1px solid #5ddfff"
                      : "1px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Burger mobile */}
        {/* Burger mobile */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-burger"
          style={{
            background: "transparent",
            border: "1px solid rgba(240,246,255,0.4)",
            borderRadius: "12px", // Coins arrondis
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
          {LINKS.map(({ label, href }) => (
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
              {label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
