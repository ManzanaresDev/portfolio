// sendEmail.ts
"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { contactSchema } from "@/lib/contactSchema";
import { rateLimit } from "@/lib/rateLimit";

export async function sendEmail(data: unknown) {
  // validation côté serveur!
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Données invalides");
  }

  const { name, email, message, website } = result.data;

  // Honeypot validation!
  if (website?.trim()) {
    return;
  }

  //   Rate limit validation!
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip, 3000)) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `CODERCAT - PORTFOLIO - message`,
    html: `
      <p><strong>name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `,
  });
}
