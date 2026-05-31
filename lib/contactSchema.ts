// lib/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court (min 2 caractères)!"),
  email: z.string().email("Email invalide ' (caractère nom@server.dom)!"),
  message: z.string().min(10, "Message trop court  (min 10 caractères)!"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
