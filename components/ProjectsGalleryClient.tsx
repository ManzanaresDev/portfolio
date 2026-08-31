// components/ProjectsGalleryClient.tsx
"use client";
import type { Project } from "@/lib/types";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";

function ProjectCard({
  project,
  isNew = false,
}: {
  project: Project;
  isNew?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="grid-card"
      style={{ display: "block", textDecoration: "none", position: "relative" }}
    >
      {isNew && <span className="new-badge">Nouveau</span>}
      <div
        style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}
      >
        <Image
          src={project.image ?? ""}
          alt={project.title}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
        />
      </div>
      <div style={{ padding: "16px 18px" }}>
        <h3
          style={{
            color: "white",
            fontSize: "1rem",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const { t } = useTranslation();

  return (
    <div className="section-container" style={{ color: "#fff" }}>
      {/* ── Hero ── */}
      <div style={{ marginBottom: "clamp(32px, 6vw, 56px)" }}>
        <h2 className="title">{t("projects.title")}</h2>
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            width: "100%",
            minWidth: 0,
            margin: 0,
          }}
        >
          {t("projects.intro1")}
        </p>
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            width: "100%",
            minWidth: 0,
            margin: "16px 0 0",
          }}
        >
          {t("projects.intro2")}
        </p>
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            width: "100%",
            minWidth: 0,
            margin: "16px 0 0",
          }}
        >
          {t("projects.intro3")}
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard
            key={`${p.id ?? p.title}-${i}`}
            project={p}
            isNew={i === projects.length - 1}
          />
        ))}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }

        .grid-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          transition: border-color 0.2s, transform 0.2s;
        }

        .grid-card:hover {
          border-color: rgba(93, 223, 255, 0.35);
          transform: translateY(-2px);
        }

        .grid-card .tag {
          font-size: 0.7rem;
        }

        .new-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          background: rgba(93, 223, 255, 0.9);
          color: #001018;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}