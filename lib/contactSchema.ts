// lib/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court (min 2 caractères)!"),
  email: z.string().email("Email invalide ' (format nom@server.dom)!"),
  message: z.string().min(10, "Message trop court  (min 10 caractères)!"),
  website: z.string().optional(),
  formLoadedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
