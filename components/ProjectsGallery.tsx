"use client";
import { useState } from "react";

const ALL_TAGS = [
  "React",
  "Next.js",
  "Vite",
  "TypeScript",
  "Node.js",
  "Express",
  "NestJS",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Mongoose",
  "Strapi",
  "Docker",
  "JWT",
  "REST API",
  "Socket.IO",
  "Git",
  "GitHub",
  "Vercel",
  "AWS",
  "Stripe",
];

const PROJECTS = [
  {
    title: "Zohre masajes (en espagnol)",
    desc: "Site d'annonce d'une professionnale du massage avec gestion d'avis",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Vercel"],
    link: "https://zohre-masajes.vercel.app/",
  },
  {
    title: "App de chat temps réel",
    desc: "Messagerie instantanée multi-salons avec authentification JWT et notifications push.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "Socket.IO",
      "MongoDB",
      "Mongoose",
      "JWT",
    ],
    link: "https://...",
  },
  // ... ajoute tes vrais projets ici
];

export default function ProjectsGallery() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const visibleProjects = PROJECTS.filter(
    (p) =>
      activeFilters.size === 0 ||
      [...activeFilters].every((f) => p.tags.includes(f)),
  );

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        padding: "60px 16px",
        maxWidth: 900,
        background: "transparent", // ✅ Fix 1 : plus de fond sombre
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: "#5ddfff",
          fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        Projets réalisés
      </h2>

      {/* FILTRES */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}
      >
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleFilter(tag)}
            style={{
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: "0.75rem",
              cursor: "pointer",
              border: "1px solid",
              borderColor: activeFilters.has(tag)
                ? "#2563c4"
                : "rgba(255,255,255,0.15)",
              background: activeFilters.has(tag)
                ? "rgba(37,99,196,0.25)"
                : "rgba(255,255,255,0.05)",
              color: activeFilters.has(tag)
                ? "#5ddfff"
                : "rgba(240,246,255,0.6)",
              transition: "all 0.15s",
            }}
          >
            {tag}
          </button>
        ))}

        {/* ✅ Fix 2 : bouton toujours visible, grisé si aucun filtre actif */}
        <button
          onClick={() => setActiveFilters(new Set())}
          disabled={activeFilters.size === 0}
          style={{
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: "0.75rem",
            cursor: activeFilters.size === 0 ? "default" : "pointer",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color:
              activeFilters.size === 0
                ? "rgba(240,246,255,0.2)"
                : "rgba(240,246,255,0.6)",
            transition: "all 0.15s",
          }}
        >
          ✕ Tout afficher
        </button>
      </div>

      <p
        style={{
          fontSize: "0.8rem",
          color: "rgba(240,246,255,0.4)",
          marginBottom: 24,
        }}
      >
        {visibleProjects.length} projet{visibleProjects.length > 1 ? "s" : ""}
      </p>

      {/* GRILLE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {visibleProjects.length === 0 ? (
          <p
            style={{
              color: "rgba(240,246,255,0.4)",
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "2rem 0",
            }}
          >
            Aucun projet ne correspond à ce filtre.
          </p>
        ) : (
          visibleProjects.map((p) => (
            <div
              key={p.title}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minHeight: 200,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "rgba(240,246,255,0.6)",
                  lineHeight: 1.5,
                }}
              >
                {p.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      fontSize: "0.7rem",
                      background: activeFilters.has(t)
                        ? "rgba(37,99,196,0.3)"
                        : "rgba(255,255,255,0.07)",
                      color: activeFilters.has(t)
                        ? "#5ddfff"
                        : "rgba(240,246,255,0.5)",
                      border: `1px solid ${activeFilters.has(t) ? "#2563c4" : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: "0.8rem",
                    color: "#5ddfff",
                    textDecoration: "none",
                    marginTop: "auto",
                  }}
                >
                  ↗ Voir le projet
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
