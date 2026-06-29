// app/actions/projects.ts
"use server";

import sql from "@/lib/database";
import { revalidatePath } from "next/cache";
import type { Project, Tag } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// Lecture
// ─────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const rows = await sql`
    SELECT
      p.*,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', t.id,
            'name', t.name
          )
          ORDER BY t.name
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'::json
      ) AS tags
    FROM projects p
    LEFT JOIN project_tags pt
      ON pt.project_id = p.id
    LEFT JOIN tags t
      ON t.id = pt.tag_id
    GROUP BY p.id
    ORDER BY p.sort_order ASC, p.created_at DESC;
  `;
  return rows as unknown as Project[];
}

export async function getAllTags(): Promise<Tag[]> {
  const rows = await sql`
    SELECT *
    FROM tags
    ORDER BY name ASC;
  `;
  return rows as unknown as Tag[];
}

// ─────────────────────────────────────────────────────────────
// Création
// ─────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "") || null;
  const link = String(formData.get("link") ?? "") || null;
  const github = String(formData.get("github") ?? "") || null;
  const sort_order = Number(formData.get("sort_order") || 0);

  const tagIds = formData
    .getAll("tag_ids")
    .map(Number)
    .filter((id) => Number.isInteger(id));

  const rows = await sql`
  INSERT INTO projects (
    title,
    description,
    image,
    link,
    github,
    sort_order
  )
  VALUES (
    ${title},
    ${description},
    ${image},
    ${link},
    ${github},
    ${sort_order}
  )
  RETURNING id;
`;

  const project = rows[0] as { id: number };

  for (const tagId of tagIds) {
    await sql`
      INSERT INTO project_tags (project_id, tag_id)
      VALUES (${project.id}, ${tagId});
    `;
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");

  return project;
}

// ─────────────────────────────────────────────────────────────
// Mise à jour
// ─────────────────────────────────────────────────────────────

export async function updateProject(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "") || null;
  const link = String(formData.get("link") ?? "") || null;
  const github = String(formData.get("github") ?? "") || null;
  const sort_order = Number(formData.get("sort_order") || 0);

  const tagIds = formData
    .getAll("tag_ids")
    .map(Number)
    .filter((id) => Number.isInteger(id));

  await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      image = ${image},
      link = ${link},
      github = ${github},
      sort_order = ${sort_order}
    WHERE id = ${id};
  `;

  await sql`
    DELETE FROM project_tags
    WHERE project_id = ${id};
  `;

  for (const tagId of tagIds) {
    await sql`
      INSERT INTO project_tags (project_id, tag_id)
      VALUES (${id}, ${tagId});
    `;
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ─────────────────────────────────────────────────────────────
// Suppression
// ─────────────────────────────────────────────────────────────

export async function deleteProject(id: number) {
  await sql`
    DELETE FROM projects
    WHERE id = ${id};
  `;

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ─────────────────────────────────────────────────────────────
// Tags
// ─────────────────────────────────────────────────────────────

export async function createTag(name: string): Promise<Tag> {
  const rows = await sql`
  INSERT INTO tags (name)
  VALUES (${name.trim()})
  ON CONFLICT (name)
  DO UPDATE SET name = EXCLUDED.name
  RETURNING *;
`;

  revalidatePath("/admin/projects");

  return rows[0] as Tag;
}

export async function deleteTag(id: number) {
  await sql`
    DELETE FROM tags
    WHERE id = ${id};
  `;

  revalidatePath("/admin/projects");
}
