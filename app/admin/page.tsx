"use client";
// app/admin/page.tsx
import Link from "next/link";

const ADMIN_CARDS = [
  {
    href: "/admin/testimonials",
    title: "Témoignages",
    description: "Modérer les avis en attente de validation.",
    icon: "💬",
  },
  {
    href: "/admin/projects",
    title: "Projets",
    description: "Créer, éditer et supprimer les projets du portfolio.",
    icon: "🗂️",
  },
];

export default function AdminPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1628",
        color: "white",
        padding: "60px 24px",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1
          style={{
            color: "#5ddfff",
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Administration
        </h1>
        <p
          style={{
            color: "rgba(240,246,255,0.4)",
            fontSize: "0.875rem",
            marginBottom: 48,
          }}
        >
          Gestion du portfolio
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {ADMIN_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(93,223,255,0.35)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(93,223,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.04)";
                }}
              >
                <span style={{ fontSize: "2rem" }}>{card.icon}</span>
                <h2
                  style={{
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: "16px 0 8px",
                  }}
                >
                  {card.title}
                </h2>
                <p
                  style={{
                    color: "rgba(240,246,255,0.45)",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
