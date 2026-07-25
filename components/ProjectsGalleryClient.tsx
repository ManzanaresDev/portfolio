"use client";
import type { Project } from "@/lib/types";
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

function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  return (
    <div className="marquee-card">
      <div style={{ position: "relative", height: 170 }}>
        <Image
          src={project.image ?? ""}
          alt={project.title}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="340px"
        />
      </div>
      <div style={{ padding: "16px 18px" }}>
        <h3
          style={{
            color: "white",
            fontSize: "1rem",
            fontWeight: 700,
            margin: "0 0 6px",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "rgba(240,246,255,0.55)",
            fontSize: "0.8rem",
            lineHeight: 1.6,
            margin: "0 0 10px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginBottom: 10,
          }}
        >
          {project.tags.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              title={t("projects.viewSite")}
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
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              title={t("projects.viewCode")}
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
  );
}

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const { t } = useTranslation();

  // Duplicated once so the track can scroll from 0% to -50% and loop seamlessly.
  const track = [...projects, ...projects];

  return (
    <div>
      <h2 className="title">{t("projects.title")}</h2>

      <div className="marquee-viewport">
        <div
          className="marquee-track"
          style={{ ["--count" as string]: projects.length }}
        >
          {track.map((p, i) => (
            <ProjectCard key={`${p.id ?? p.title}-${i}`} project={p} />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-viewport {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black 40px,
            black calc(100% - 40px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 40px,
            black calc(100% - 40px),
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee-scroll calc(var(--count) * 8s) linear infinite;
        }

        .marquee-viewport:hover .marquee-track,
        .marquee-track:active {
          animation-play-state: paused;
        }

        .marquee-card {
          flex: 0 0 320px;
          width: 320px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
        }

        .marquee-card .tag {
          font-size: 0.7rem;
        }

        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .marquee-card {
            flex: 0 0 82vw;
            width: 82vw;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
