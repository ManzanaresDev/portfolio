// sendEmail.ts
"use server";

import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contactSchema";

export async function sendEmail(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // validation côté serveur!
  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    throw new Error("Données invalides");
  }

  const { name, email, message } = result.data;

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
