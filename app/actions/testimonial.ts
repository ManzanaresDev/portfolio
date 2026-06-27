"use server";

import { neon } from "@neondatabase/serverless";
import { unstable_noStore as noStore } from "next/cache";

const sql = neon(process.env.DATABASE_URL!);

export type Testimonial = {
  id: number;
  client_name: string;
  company?: string;
  project?: string;
  message: string;
  rating: number;
  approved: boolean;
  created_at: string;
};

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

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  noStore();
  const rows = await sql`
    SELECT * FROM testimonials
    WHERE approved = true
    ORDER BY created_at DESC
  `;
  return rows as Testimonial[];
}

export async function getPendingTestimonials(): Promise<Testimonial[]> {
  noStore();
  const rows = await sql`
    SELECT * FROM testimonials
    WHERE approved = false
    ORDER BY created_at DESC
  `;
  return rows as Testimonial[];
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
