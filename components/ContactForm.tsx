"use client";

import { sendEmail } from "@/app/actions/sendEmail";
import { createContactSchema, type ContactFormData } from "@/lib/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const contactSchema = useMemo(() => createContactSchema(t), [i18n.language]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setServerError("");

      await sendEmail(data);

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "contact_form_submit", {
          event_category: "engagement",
          event_label: "contact",
        });
      }

      setSuccess(true);
      reset();

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (error) {
      console.error(error);
      setServerError(t("contactForm.errorMessage"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {success && (
        <p
          style={{
            color: "#5ddfff",
            textAlign: "center",
          }}
        >
          {t("contactForm.successMessage")}
        </p>
      )}

      {serverError && (
        <p
          style={{
            color: "#ff6b6b",
            textAlign: "center",
          }}
        >
          {serverError}
        </p>
      )}
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder={t("contactForm.namePlaceholder")}
          style={inputStyle}
        />

        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder={t("contactForm.emailPlaceholder")}
          style={inputStyle}
        />

        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <div>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={t("contactForm.messagePlaceholder")}
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />

        {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          ...buttonStyle,
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? t("contactForm.submitting") : t("contactForm.submit")}
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px 20px",
  fontSize: "1rem",
  borderRadius: "12px",
  lineHeight: 1.5,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none",
};

const errorStyle = {
  color: "#ff6b6b",
  fontSize: "0.85rem",
  marginTop: "6px",
};

const buttonStyle = {
  marginTop: 10,
  height: 54,
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563c4 0%, #5ddfff 100%)",
  color: "white",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 12px",
  fontSize: "0.85rem",
  borderRadius: "10px",
  alignSelf: "flex-end",
  width: "100%",
};
