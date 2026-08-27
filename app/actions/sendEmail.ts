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

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; padding:0; background-color:#0a1628; font-family: Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a1628; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: rgba(18, 36, 63, 0.95); border: 1px solid rgba(93, 223, 255, 0.14); border-radius: 22px; overflow: hidden;">
                
                <!-- Header avec logo -->
                <tr>
                  <td align="center" style="padding: 36px 30px 24px 30px; border-bottom: 1px solid rgba(255,255,255,0.08);">
                    <img src="https://codercat.fr/coderCatLogo.png" alt="Logo" width="64" height="64" style="display:block; margin: 0 auto 12px auto; border-radius: 12px;" />
                    <p style="margin:0; color:#f0f6ff; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6;">
                      Nouveau message — Portfolio
                    </p>
                  </td>
                </tr>

                <!-- Badge -->
                <tr>
                  <td style="padding: 24px 30px 0 30px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color: rgba(93, 223, 255, 0.12); border: 1px solid rgba(93, 223, 255, 0.25); border-radius: 999px; padding: 5px 14px;">
                          <span style="color:#6fdfff; font-size: 12px; font-weight: 600;">✉ CONTACT</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Contenu -->
                <tr>
                  <td style="padding: 20px 30px 10px 30px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <p style="margin:0 0 4px 0; color: rgba(240,246,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em;">Nom</p>
                          <p style="margin:0; color:#f0f6ff; font-size: 16px; font-weight: 600;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <p style="margin:0 0 4px 0; color: rgba(240,246,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em;">Email</p>
                          <p style="margin:0;">
                            <a href="mailto:${email}" style="color:#4a9eff; font-size: 16px; font-weight: 600; text-decoration:none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 18px 0 6px 0;">
                          <p style="margin:0 0 8px 0; color: rgba(240,246,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em;">Message</p>
                          <p style="margin:0; color: rgba(240,246,255,0.85); font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA répondre -->
                <tr>
                  <td align="center" style="padding: 24px 30px 32px 30px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background: linear-gradient(135deg, #2563c4, #5ddfff); border-radius: 14px;">
                          <a href="mailto:${email}" style="display:inline-block; padding: 13px 28px; color:#0a1628; font-size: 14px; font-weight: 700; text-decoration:none;">
                            Répondre à ${name}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 18px 30px; background-color: rgba(10,22,40,0.5); border-top: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0; color: rgba(240,246,255,0.35); font-size: 11px;">
                      Message envoyé automatiquement depuis le formulaire de contact du portfolio
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `CODERCAT — PORTFOLIO — Nouveau message de ${name}`,
    html: emailHtml,
  });
}