// lib/contactSchema.ts
import { z } from "zod";
import type { TFunction } from "i18next";

// Schéma traduit, utilisé côté client (ContactForm.tsx)
export const createContactSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(2, t("errors.nameTooShort")),
    email: z.string().email(t("errors.emailInvalid")),
    message: z.string().min(10, t("errors.messageTooShort")),
    website: z.string().optional(),
    formLoadedAt: z.number().optional(),
  });

// Schéma statique, utilisé côté serveur (sendEmail.ts) — validation de sécurité, pas d'UX
export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  website: z.string().optional(),
  formLoadedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
