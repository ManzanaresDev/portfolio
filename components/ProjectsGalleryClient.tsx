// components/ProjectsGalleryClient.tsx
"use client";
import type { Project } from "@/lib/types";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="marquee-card"
      style={{ display: "block", textDecoration: "none" }}
    >
      <div
        style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}
      >
        <Image
          src={project.image ?? ""}
          alt={project.title}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 28vw, 360px"
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

  // Duplicated once so the track can scroll from 0% to -50% and loop seamlessly.
  const track = [...projects, ...projects];

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
          width: 100%;
          min-width: 0;
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
          flex: 0 0 clamp(240px, 28vw, 360px);
          width: clamp(240px, 28vw, 360px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          transition: border-color 0.2s, transform 0.2s;
        }

        .marquee-card:hover {
          border-color: rgba(93, 223, 255, 0.35);
          transform: translateY(-2px);
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
            flex: 0 0 78vw;
            width: 78vw;
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
