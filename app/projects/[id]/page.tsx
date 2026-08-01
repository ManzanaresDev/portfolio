// app/projects/[id]/page.tsx
import { getProjectById } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

function GitHubIcon({ size = 18 }: { size?: number }) {
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

function GlobeIcon({ size = 18 }: { size?: number }) {
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) notFound();

  return (
    <main className="page-section" style={{ minHeight: "100vh" }}>
      <div className="section-container" style={{ color: "#fff" }}>
        <Link
          href="/"
          className="mobile-home-btn"
          aria-label="Retour au portfolio"
        >
          <Home size={20} />
        </Link>
        <Link
          href="/#projets"
          className="desktop-back-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
            textDecoration: "none",
            marginBottom: "clamp(24px, 4vw, 40px)",
            padding: "10px 4px",
            marginLeft: "-4px",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ← Retour aux projets
        </Link>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(240px, 40vw, 460px)",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: "clamp(24px, 4vw, 40px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Image
            src={project.image ?? ""}
            alt={project.title}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="100vw"
            priority
          />
        </div>

        <h1
          className="title"
          style={{ marginBottom: "clamp(0.75rem, 2vw, 1.25rem)" }}
        >
          {project.title}
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          {project.tags.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </div>

        <p
          className="section-text"
          style={{
            marginBottom: "clamp(24px, 4vw, 40px)",
            whiteSpace: "pre-line",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 22px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #2563c4, #5ddfff)",
                color: "#0a1628",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <GlobeIcon size={16} />
              Voir le site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 22px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <GitHubIcon size={16} />
              Voir le code
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
