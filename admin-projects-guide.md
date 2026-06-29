# Admin — Gestion des projets

Ce guide couvre tout ce qu'il faut mettre en place pour gérer les projets depuis l'admin : schéma SQL, client Neon, Server Actions, et les pages/composants Next.js.

---

## Étape 1 — Schéma SQL

Exécute ce SQL directement dans la console Neon (onglet **SQL Editor**).

```sql
-- Table des projets
CREATE TABLE projects (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image      VARCHAR(500),
  link       VARCHAR(500),
  github     VARCHAR(500),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table des tags
CREATE TABLE tags (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Table de jointure many-to-many
CREATE TABLE project_tags (
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag_id     INTEGER NOT NULL REFERENCES tags(id)     ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);
```

> **Note** : Le `ON DELETE CASCADE` sur `project_tags` fait que supprimer un projet supprime automatiquement ses liaisons de tags, sans erreur de contrainte.

---

## Étape 2 — Client Neon

Crée le fichier `lib/db.ts` à la racine du projet.

```ts
// lib/db.ts
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default sql;
```

Vérifie que ta variable d'environnement est bien présente dans `.env.local` :

```
DATABASE_URL=postgresql://...
```

Si la variable s'appelle différemment (`NEON_DATABASE_URL`, etc.), adapte la ligne dans `lib/db.ts`.

---

## Étape 3 — Types partagés

Crée `lib/types.ts` pour éviter de dupliquer les types dans chaque fichier.

```ts
// lib/types.ts
export type Tag = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  github: string | null;
  sort_order: number;
  created_at: string;
  tags: Tag[];
};
```

---

## Étape 4 — Server Actions

Crée `app/actions/projects.ts`.

```ts
// app/actions/projects.ts
"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { Project, Tag } from "@/lib/types";

// ── Lecture ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const rows = await sql`
    SELECT
      p.*,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT('id', t.id, 'name', t.name)
          ORDER BY t.name
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'
      ) AS tags
    FROM projects p
    LEFT JOIN project_tags pt ON pt.project_id = p.id
    LEFT JOIN tags t           ON t.id = pt.tag_id
    GROUP BY p.id
    ORDER BY p.sort_order ASC, p.created_at DESC
  `;
  return rows as Project[];
}

export async function getAllTags(): Promise<Tag[]> {
  const rows = await sql`SELECT * FROM tags ORDER BY name ASC`;
  return rows as Tag[];
}

// ── Création ───────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  const title       = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image       = (formData.get("image") as string) || null;
  const link        = (formData.get("link") as string) || null;
  const github      = (formData.get("github") as string) || null;
  const sort_order  = Number(formData.get("sort_order") ?? 0);
  const tagIds      = formData.getAll("tag_ids").map(Number);

  const [project] = await sql`
    INSERT INTO projects (title, description, image, link, github, sort_order)
    VALUES (${title}, ${description}, ${image}, ${link}, ${github}, ${sort_order})
    RETURNING id
  `;

  if (tagIds.length > 0) {
    await Promise.all(
      tagIds.map((tag_id) =>
        sql`INSERT INTO project_tags (project_id, tag_id) VALUES (${project.id}, ${tag_id})`
      )
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ── Mise à jour ────────────────────────────────────────────────────────────

export async function updateProject(id: number, formData: FormData) {
  const title       = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image       = (formData.get("image") as string) || null;
  const link        = (formData.get("link") as string) || null;
  const github      = (formData.get("github") as string) || null;
  const sort_order  = Number(formData.get("sort_order") ?? 0);
  const tagIds      = formData.getAll("tag_ids").map(Number);

  await sql`
    UPDATE projects
    SET title=${title}, description=${description}, image=${image},
        link=${link}, github=${github}, sort_order=${sort_order}
    WHERE id=${id}
  `;

  // Réinitialise les tags puis réinsère
  await sql`DELETE FROM project_tags WHERE project_id=${id}`;
  if (tagIds.length > 0) {
    await Promise.all(
      tagIds.map((tag_id) =>
        sql`INSERT INTO project_tags (project_id, tag_id) VALUES (${id}, ${tag_id})`
      )
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ── Suppression ────────────────────────────────────────────────────────────

export async function deleteProject(id: number) {
  // project_tags supprimés automatiquement par ON DELETE CASCADE
  await sql`DELETE FROM projects WHERE id=${id}`;
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ── Gestion des tags ───────────────────────────────────────────────────────

export async function createTag(name: string): Promise<Tag> {
  const [tag] = await sql`
    INSERT INTO tags (name) VALUES (${name.trim()})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING *
  `;
  revalidatePath("/admin/projects");
  return tag as Tag;
}

export async function deleteTag(id: number) {
  // project_tags supprimés automatiquement par ON DELETE CASCADE
  await sql`DELETE FROM tags WHERE id=${id}`;
  revalidatePath("/admin/projects");
}
```

---

## Étape 5 — Page d'accueil admin

Crée `app/admin/page.tsx`.

```tsx
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
```

---

## Étape 6 — Page serveur des projets

Crée `app/admin/projects/page.tsx`.

```tsx
// app/admin/projects/page.tsx
import { getProjects, getAllTags } from "@/app/actions/projects";
import AdminProjectsList from "@/app/admin/projects/AdminProjectsList";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const [projects, tags] = await Promise.all([getProjects(), getAllTags()]);
  return <AdminProjectsList initialProjects={projects} allTags={tags} />;
}
```

---

## Étape 7 — Composant client AdminProjectsList

Crée `app/admin/projects/AdminProjectsList.tsx`.

```tsx
// app/admin/projects/AdminProjectsList.tsx
"use client";

import { useState } from "react";
import {
  createProject,
  updateProject,
  deleteProject,
  createTag,
  deleteTag,
} from "@/app/actions/projects";
import type { Project, Tag } from "@/lib/types";

type Toast = { message: string; type: "success" | "error" } | null;

const EMPTY_FORM = {
  title: "",
  description: "",
  image: "",
  link: "",
  github: "",
  sort_order: "0",
  tag_ids: [] as number[],
};

export default function AdminProjectsList({
  initialProjects,
  allTags,
}: {
  initialProjects: Project[];
  allTags: Tag[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tags, setTags] = useState<Tag[]>(allTags);
  const [toast, setToast] = useState<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [newTagName, setNewTagName] = useState("");

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      image: p.image ?? "",
      link: p.link ?? "",
      github: p.github ?? "",
      sort_order: String(p.sort_order),
      tag_ids: p.tags.map((t) => t.id),
    });
    setShowForm(true);
  }

  function toggleTag(id: number) {
    setForm((f) => ({
      ...f,
      tag_ids: f.tag_ids.includes(id)
        ? f.tag_ids.filter((t) => t !== id)
        : [...f.tag_ids, id],
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("image", form.image);
      fd.append("link", form.link);
      fd.append("github", form.github);
      fd.append("sort_order", form.sort_order);
      form.tag_ids.forEach((id) => fd.append("tag_ids", String(id)));

      if (editingId !== null) {
        await updateProject(editingId, fd);
        showToast("Projet mis à jour", "success");
      } else {
        await createProject(fd);
        showToast("Projet créé", "success");
      }

      // Recharge la liste
      const res = await fetch("/admin/projects?_data=true").catch(() => null);
      if (!res) window.location.reload();

      setShowForm(false);
      setForm(EMPTY_FORM);
      setEditingId(null);
      window.location.reload();
    } catch {
      showToast("Une erreur est survenue", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer ce projet ?")) return;
    setLoading(true);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Projet supprimé", "error");
    } catch {
      showToast("Erreur lors de la suppression", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTag() {
    if (!newTagName.trim()) return;
    setLoading(true);
    try {
      const tag = await createTag(newTagName.trim());
      setTags((prev) => [...prev, tag].sort((a, b) => a.name.localeCompare(b.name)));
      setNewTagName("");
      showToast(`Tag "${tag.name}" créé`, "success");
    } catch {
      showToast("Erreur lors de la création du tag", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTag(id: number, name: string) {
    if (!confirm(`Supprimer le tag "${name}" ? Il sera retiré de tous les projets.`)) return;
    setLoading(true);
    try {
      await deleteTag(id);
      setTags((prev) => prev.filter((t) => t.id !== id));
      showToast(`Tag "${name}" supprimé`, "error");
    } catch {
      showToast("Erreur lors de la suppression du tag", "error");
    } finally {
      setLoading(false);
    }
  }

  // ── Styles partagés ──────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    color: "rgba(240,246,255,0.45)",
    marginBottom: 6,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  // ── Rendu ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1628",
        color: "white",
        padding: "40px 24px",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 1000,
            padding: "12px 20px",
            borderRadius: 12,
            background:
              toast.type === "success"
                ? "rgba(52,211,153,0.15)"
                : "rgba(239,68,68,0.15)",
            border: `1px solid ${toast.type === "success" ? "rgba(52,211,153,0.4)" : "rgba(239,68,68,0.4)"}`,
            color: toast.type === "success" ? "#34d399" : "#f87171",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          {toast.message}
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* En-tête */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{ color: "#5ddfff", fontSize: "1.5rem", fontWeight: 700, marginBottom: 4 }}
            >
              Gestion des projets
            </h1>
            <p style={{ color: "rgba(240,246,255,0.4)", fontSize: "0.875rem", margin: 0 }}>
              {projects.length} projet{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openCreate}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              background: "rgba(93,223,255,0.15)",
              color: "#5ddfff",
              border: "1px solid rgba(93,223,255,0.3)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            + Nouveau projet
          </button>
        </div>

        {/* Formulaire création / édition */}
        {showForm && (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(93,223,255,0.2)",
              borderRadius: 20,
              padding: "28px 24px",
              marginBottom: 32,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h2 style={{ color: "white", fontSize: "1rem", fontWeight: 700, margin: 0 }}>
              {editingId !== null ? "Modifier le projet" : "Nouveau projet"}
            </h2>

            {/* Titre */}
            <div>
              <label style={labelStyle}>Titre *</label>
              <input
                style={inputStyle}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Nom du projet"
              />
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description *</label>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description courte du projet"
              />
            </div>

            {/* Image */}
            <div>
              <label style={labelStyle}>Image (chemin ou URL)</label>
              <input
                style={inputStyle}
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="/images/mon-projet.jpg"
              />
            </div>

            {/* Lien + GitHub côte à côte */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Lien du site</label>
                <input
                  style={inputStyle}
                  value={form.link}
                  onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label style={labelStyle}>GitHub</label>
                <input
                  style={inputStyle}
                  value={form.github}
                  onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            {/* Ordre */}
            <div style={{ maxWidth: 140 }}>
              <label style={labelStyle}>Ordre d'affichage</label>
              <input
                type="number"
                style={inputStyle}
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
              />
            </div>

            {/* Sélection des tags */}
            <div>
              <label style={labelStyle}>Tags</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tags.map((tag) => {
                  const selected = form.tag_ids.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 6,
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        border: selected
                          ? "1px solid rgba(93,223,255,0.5)"
                          : "1px solid rgba(255,255,255,0.12)",
                        background: selected
                          ? "rgba(93,223,255,0.15)"
                          : "rgba(255,255,255,0.04)",
                        color: selected ? "#5ddfff" : "rgba(240,246,255,0.5)",
                        transition: "all 0.15s",
                      }}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button
                onClick={handleSubmit}
                disabled={loading || !form.title || !form.description}
                style={{
                  padding: "10px 22px",
                  borderRadius: 10,
                  background: "rgba(52,211,153,0.15)",
                  color: "#34d399",
                  border: "1px solid rgba(52,211,153,0.3)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {editingId !== null ? "Enregistrer" : "Créer"}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                style={{
                  padding: "10px 22px",
                  borderRadius: 10,
                  background: "transparent",
                  color: "rgba(240,246,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste des projets */}
        {projects.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 40,
              textAlign: "center",
              color: "rgba(240,246,255,0.35)",
            }}
          >
            Aucun projet pour l'instant.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "18px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ margin: "0 0 4px", fontWeight: 700, color: "white" }}>
                    {p.title}
                  </p>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "0.8rem",
                      color: "rgba(240,246,255,0.45)",
                      lineHeight: 1.5,
                    }}
                  >
                    {p.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {p.tags.map((t) => (
                      <span
                        key={t.id}
                        style={{
                          background: "rgba(93,223,255,0.08)",
                          color: "#5ddfff",
                          fontSize: "0.68rem",
                          padding: "2px 8px",
                          borderRadius: 4,
                          border: "1px solid rgba(93,223,255,0.2)",
                        }}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => openEdit(p)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(240,246,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={loading}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 8,
                      background: "rgba(239,68,68,0.1)",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.25)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gestion des tags */}
        <div
          style={{
            marginTop: 48,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "24px",
          }}
        >
          <h2
            style={{
              color: "rgba(240,246,255,0.7)",
              fontSize: "0.95rem",
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Gérer les tags
          </h2>

          {/* Créer un tag */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCreateTag(); }}
              placeholder="Nouveau tag (ex: Next.js)"
            />
            <button
              onClick={handleCreateTag}
              disabled={loading || !newTagName.trim()}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                background: "rgba(93,223,255,0.12)",
                color: "#5ddfff",
                border: "1px solid rgba(93,223,255,0.25)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                opacity: loading || !newTagName.trim() ? 0.4 : 1,
                whiteSpace: "nowrap",
              }}
            >
              Ajouter
            </button>
          </div>

          {/* Liste des tags existants */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map((tag) => (
              <div
                key={tag.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  padding: "4px 10px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "rgba(240,246,255,0.6)" }}>
                  {tag.name}
                </span>
                <button
                  onClick={() => handleDeleteTag(tag.id, tag.name)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(239,68,68,0.6)",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    padding: 0,
                    lineHeight: 1,
                  }}
                  title="Supprimer ce tag"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Étape 8 — Mettre à jour ProjectsGallery

Le composant `ProjectsGallery` doit maintenant lire les projets depuis la base de données au lieu de la liste statique. Transforme-le en **Server Component**.

```tsx
// components/ProjectsGallery.tsx  (Server Component — retire "use client")
import { getProjects } from "@/app/actions/projects";
import ProjectsGalleryClient from "./ProjectsGalleryClient";

export default async function ProjectsGallery() {
  const projects = await getProjects();
  return <ProjectsGalleryClient projects={projects} />;
}
```

Puis renomme ton composant actuel en `ProjectsGalleryClient.tsx` et remplace la constante `PROJECTS` par une prop :

```tsx
// components/ProjectsGalleryClient.tsx
"use client";
import type { Project } from "@/lib/types";

export default function ProjectsGalleryClient({ projects }: { projects: Project[] }) {
  // Remplace PROJECTS par projects partout dans le composant
  // Remplace project.desc par project.description
  // Le reste du code est identique
}
```

> **Attention** : le champ s'appelle `description` en base (pas `desc`). Pense à adapter les références dans le JSX.

---

## Récapitulatif des fichiers créés / modifiés

```
lib/
  db.ts                              ← nouveau
  types.ts                           ← nouveau

app/
  actions/
    projects.ts                      ← nouveau
  admin/
    page.tsx                         ← nouveau (accueil admin)
    projects/
      page.tsx                       ← nouveau (page serveur)
      AdminProjectsList.tsx          ← nouveau (composant client)

components/
  ProjectsGallery.tsx                ← modifié (devient Server Component)
  ProjectsGalleryClient.tsx          ← nouveau (logique UI extraite)
```

---

## Note sur l'authentification

Pour l'instant les routes `/admin/*` ne sont pas protégées. Pour une protection rapide sans bibliothèque, tu peux ajouter un `middleware.ts` à la racine :

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const auth = req.cookies.get("admin_auth")?.value;
  if (auth === ADMIN_PASSWORD) return NextResponse.next();

  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = { matcher: ["/admin/:path*"] };
```

Puis crée une page de login basique `app/admin/login/page.tsx` qui set le cookie `admin_auth` via une Server Action. Dis-moi si tu veux ce fichier en détail.
