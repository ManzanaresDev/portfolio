"use client";

import { sendEmail } from "@/app/actions/sendEmail";
import { contactSchema, type ContactFormData } from "@/lib/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

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

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      await sendEmail(formData);

      setSuccess(true);
      reset();

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (error) {
      console.error(error);
      setServerError("Une erreur est survenue lors de l'envoi du message.");
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
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Nom"
          style={inputStyle}
        />

        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          style={inputStyle}
        />

        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <div>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Votre message"
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />

        {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          ...buttonStyle,
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? "Envoi..." : "Envoyer"}
      </button>

      {success && (
        <p
          style={{
            color: "#5ddfff",
            textAlign: "center",
          }}
        >
          Message envoyé avec succès.
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
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none",
  fontSize: "0.95rem",
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
  borderRadius: 14,
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563c4 0%, #5ddfff 100%)",
  color: "white",
  fontSize: "0.95rem",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};
