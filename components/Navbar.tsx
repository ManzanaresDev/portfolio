"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // Highlight du lien actif selon la section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    ["hero", "projets", "services", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "transparent",
        // backdropFilter: "blur(2px)",
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
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#hero");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <Image
            src="/coderCatLogo.png"
            alt="CoderCat"
            width={32}
            height={32}
          />
          <span
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
            }}
          >
            CoderCat
          </span>
        </a>

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
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-burger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "rgba(240,246,255,0.8)",
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
