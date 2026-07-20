"use client";
import type { Project } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

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

function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const project = projects[current];

  return (
    <div>
      <h2 className="title">{t("projects.title")}</h2>

      {/* SLIDE — desktop uniquement */}
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          minHeight: 340,
        }}
        className="carousel-slide"
      >
        {/* IMAGE GAUCHE */}
        <div style={{ position: "relative", minHeight: 280 }}>
          <Image
            src={project.image ?? ""}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top",
              maskImage:
                "linear-gradient(to right, black 40%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 40%, transparent 100%)",
            }}
            priority
          />
        </div>

        {/* TEXTE DROITE */}
        <div
          style={{
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
            zIndex: 1,
            background:
              "linear-gradient(to right, transparent, rgba(10,22,40,0.95) 30%)",
            backdropFilter: "blur(0px)",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(240,246,255,0.35)",
              letterSpacing: "0.1em",
              fontWeight: 500,
            }}
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <h3
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 700,
              color: "white",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(240,246,255,0.6)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((t) => (
              <span key={t.id} className="tag">
                {t.name}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                title={t("projects.viewSite")}
                style={{
                  color: "#5ddfff",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <GlobeIcon size={16} />
                {t("projects.viewSite")}
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                title={t("projects.viewCode")}
                style={{
                  color: "rgba(240,246,255,0.55)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <GitHubIcon size={16} />
                {t("projects.viewCode")}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* DOTS — desktop uniquement */}
      <div
        className="desktop-dots"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 20,
        }}
      >
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={t("projects.dotLabel", { number: i + 1 })}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: i === current ? 4 : "50%",
              background: i === current ? "#5ddfff" : "rgba(240,246,255,0.25)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* SCROLL HORIZONTAL — mobile uniquement */}
      <div className="mobile-scroll">
        {projects.map((p, i) => (
          <div key={i} className="mobile-card">
            <div style={{ position: "relative", height: 160 }}>
              <Image
                src={p.image ?? ""}
                alt={p.title}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div style={{ padding: "14px 16px" }}>
              <h3
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 700,
                  margin: "0 0 6px",
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: "rgba(240,246,255,0.55)",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  margin: "0 0 10px",
                }}
              >
                {p.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  marginBottom: 10,
                }}
              >
                {p.tags.map((t) => (
                  <span key={t.id} className="tag">
                    {t.name}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#5ddfff",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <GlobeIcon size={14} />
                    {t("projects.viewSite")}
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "rgba(240,246,255,0.45)",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <GitHubIcon size={14} />
                    {t("projects.viewCode")}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
  /* Desktop */
  .carousel-slide { display: grid; }
  .desktop-dots { display: flex; }
  .mobile-scroll { display: none; }

  /* Mobile */
  @media (max-width: 640px) {
    .carousel-slide { display: none !important; }
    .desktop-dots { display: none !important; }

    .mobile-scroll {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 12px;
      scrollbar-width: none;
      width: 100%;
      max-width: 100vw;
    }
    .mobile-scroll::-webkit-scrollbar {
      display: none;
    }
    .mobile-card {
      flex: 0 0 85%;
      max-width: 85vw;
      scroll-snap-align: start;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.04);
    }
    .mobile-card .tag {
      font-size: 0.65rem !important;
      padding: 2px 8px !important;
    }
    .mobile-card a {
      font-size: 0.75rem !important;
    }
  }

  @media (max-width: 480px) {
    .mobile-card {
      flex: 0 0 90%;
      max-width: 90vw;
    }
  }
`}</style>
    </div>
  );
}
