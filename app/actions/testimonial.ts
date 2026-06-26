"use server";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function createTestimonial(data: {
  client_name: string;
  company?: string;
  project?: string;
  message: string;
  rating: number;
}) {
  await sql`
    INSERT INTO testimonials (client_name, company, project, message, rating)
    VALUES (${data.client_name}, ${data.company ?? null}, ${data.project ?? null}, ${data.message}, ${data.rating})
  `;
}

export async function getApprovedTestimonials() {
  const rows = await sql`
    SELECT * FROM testimonials
    WHERE approved = true
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function getPendingTestimonials() {
  const rows = await sql`
    SELECT * FROM testimonials
    WHERE approved = false
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function approveTestimonial(id: number) {
  await sql`
    UPDATE testimonials SET approved = true WHERE id = ${id}
  `;
}

export async function deleteTestimonial(id: number) {
  await sql`
    DELETE FROM testimonials WHERE id = ${id}
  `;
}
