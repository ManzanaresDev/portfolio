// components/ProjectPopupContent.tsx
import type { Project } from "@/lib/types";
import Image from "next/image";
import { resolveImagePath } from "@/lib/image";

export default function ProjectPopupContent({ project }: { project: Project }) {
  return (
    <div>
      <span
        style={{
          display: "inline-block",
          background: "rgba(93, 223, 255, 0.9)",
          color: "#001018",
          fontSize: "0.7rem",
          fontWeight: 700,
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: "999px",
          marginBottom: "12px",
        }}
      >
        Nouveau projet
      </span>

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "16px",
          background: "#eee",
        }}
      >
        {project.image && (
          <Image
            // src={project.image}
            src={resolveImagePath(project.image) ?? "/images/placeholder.jpg"}
            alt={project.title}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="90vw"
          />
        )}
      </div>

      <h2 style={{ margin: "0 0 8px", fontSize: "1.25rem", fontWeight: 700, color: "#001018" }}>
        {project.title}
      </h2>

      <p style={{ margin: "0 0 12px", color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>
        {project.description}
      </p>

      {project.tags.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag.id}
              style={{
                fontSize: "0.7rem",
                background: "rgba(0,0,0,0.06)",
                color: "#001018",
                padding: "3px 8px",
                borderRadius: "999px",
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
      <a
      
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#001018",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: 600,
        }}
      >
        Voir le projet →
      </a>
    </div>
  );
}