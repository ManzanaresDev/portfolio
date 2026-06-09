"use client";
import { useState } from "react";

const ALL_TAGS = [
  // Frontend
  "React",
  "Next.js",
  "TypeScript",
  "TailwindCSS",

  // Backend
  "Node.js",
  "REST API",

  // Bases de données & ORM
  "PostgreSQL",
  "Prisma",
  "Supabase",

  // CMS
  "Strapi",

  // Outils & Versioning
  "GitHub",

  // Déploiement & Cloud
  "Vercel",
  "Cloudinary",

  // Paiement
  "Stripe",
];

const PROJECTS = [
  {
    title: "Zohre masajes (en espagnol)",
    desc: "Site d'annonce d'une professionnelle du massage avec authentification pour la moderation des avis. Multilanguage.",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Vercel",
      "TailwindCSS",
    ],
    link: "https://zohre-masajes.vercel.app/",
    github: "https://github.com/ManzanaresDev/zohre-masajes",
  },
  {
    title: "Old Books (en espagnol)",
    desc: "Plateforme de vente de livres rares. Authentification pour la zone d'administration des livres (création, modification, suppresion et images). Gestion d'images: agrandissement des images. Support d'achat en ligne avec carte bancaire",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Vercel",
      "TailwindCSS",
      "Cloudinary",
      "Stripe",
    ],
    link: "https://old-books-six.vercel.app/",
    github:
      "https://github.com/ManzanaresDev/all/tree/main/projets/11-old-books",
  },
  {
    title: "Gestion de l'entreprise",
    desc: "Système de gestion de Base de données pour la gestion des clients, factures et devis d'une entreprise. Authentification d'accès",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Vercel",
      "TailwindCSS",
    ],
    link: "https://bbdd-eta.vercel.app/dashboard",
    github: "https://github.com/ManzanaresDev/bbdd",
  },
  {
    title: "KinéApp",
    desc: "Application web destiné à la gestion et planification de séances individuelles de rééducation adaptées, à réaliser en autonomie par le patient (type, durée, répétitions, etc.)",
    tags: ["Next.js", "TypeScript", "Prisma", "Vercel", "TailwindCSS"],
    link: "https://kine-app-lac.vercel.app/exercises",
    github: "https://github.com/ManzanaresDev/kine-app",
  },
  {
    title: "Plateforme programmation",
    desc: "Mrojet est une plateforme d’apprentissage et de pratique de la programmation en Python, conçue pour rendre l’exécution de code et la progression des utilisateurs simples et interactives.",
    tags: ["Next.js", "TypeScript", "Vercel", "TailwindCSS"],
    link: "https://kine-app-lac.vercel.app/exercises",
    github: "https://github.com/ManzanaresDev/plateforme-programmation",
  },
];

// Icône GitHub SVG inline
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

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
        background: "transparent",
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

              {/* Liens en bas de carte */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginTop: "auto",
                }}
              >
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: "0.8rem",
                      color: "#5ddfff",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    ↗ Visite mon projet
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(240,246,255,0.5)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(240,246,255,0.9)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(240,246,255,0.5)")
                    }
                  >
                    <GitHubIcon size={14} />
                    Visite le code source
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
