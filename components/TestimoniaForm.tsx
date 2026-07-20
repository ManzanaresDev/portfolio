"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createTestimonial } from "@/app/actions/testimonial";
import PrivacyModal from "@/components/PrivacyModal";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const PROJECTS = [
  "Zohre masajes",
  "Old Books",
  "Gestion d'entreprise",
  "KinéApp",
  "Plateforme programmation",
  "La casita de la paella",
];

export default function TestimonialForm() {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (rating === 0) {
      setError(t("testimonialForm.errors.noRating"));
      return;
    }

    if (!consent) {
      setError(t("testimonialForm.errors.noConsent"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createTestimonial({
        client_name: data.get("client_name") as string,
        company: data.get("company") as string,
        project: data.get("project") as string,
        message: data.get("message") as string,
        rating,
      });
      setSuccess(true);
      form.reset();
      setRating(0);
      setConsent(false);
    } catch {
      setError(t("testimonialForm.errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "2.5rem" }}>🙏</span>
        <h3 style={{ color: "white", fontWeight: 600, margin: 0 }}>
          {t("testimonialForm.success.title")}
        </h3>
        <p style={{ color: "rgba(240,246,255,0.55)", fontSize: "0.875rem" }}>
          {t("testimonialForm.success.text")}
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          className="form-grid"
        >
          <div>
            <input
              name="client_name"
              type="text"
              placeholder={t("testimonialForm.namePlaceholder")}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <input
              name="company"
              type="text"
              placeholder={t("testimonialForm.companyPlaceholder")}
              style={inputStyle}
            />
          </div>
        </div>

        <select name="project" style={inputStyle}>
          <option value="">{t("testimonialForm.projectPlaceholder")}</option>
          {PROJECTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          rows={4}
          placeholder={t("testimonialForm.messagePlaceholder")}
          required
          style={{ ...inputStyle, resize: "none" }}
        />

        {/* Étoiles */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(240,246,255,0.45)" }}>
            {t("testimonialForm.ratingLabel")}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  color:
                    star <= (hovered || rating)
                      ? "#fbbf24"
                      : "rgba(255,255,255,0.2)",
                  transition: "color 0.15s",
                  padding: "0 2px",
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Consentement RGPD */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontSize: "0.8rem",
            color: "rgba(240,246,255,0.6)",
            lineHeight: 1.5,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{
              marginTop: 2,
              width: 16,
              height: 16,
              flexShrink: 0,
              accentColor: "#5ddfff",
              cursor: "pointer",
            }}
          />
          <span>
            {t("testimonialForm.consentText")}{" "}
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#5ddfff",
                textDecoration: "underline",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              {t("testimonialForm.consentLink")}
            </button>
            . *
          </span>
        </label>

        {error && (
          <p style={{ color: "#ff6b6b", fontSize: "0.8rem", margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !consent}
          style={{
            marginTop: 4,
            height: 46,
            border: "none",
            cursor: loading || !consent ? "not-allowed" : "pointer",
            background: "linear-gradient(135deg, #2563c4, #5ddfff)",
            color: "#0a1628",
            fontWeight: 600,
            fontSize: "0.875rem",
            borderRadius: 10,
            opacity: loading || !consent ? 0.5 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading
            ? t("testimonialForm.submitting")
            : t("testimonialForm.submit")}
        </button>

        <style>{`
          @media (max-width: 480px) {
            .form-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </form>

      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onAccept={() => setConsent(true)}
      >
        <PrivacyPolicy />
      </PrivacyModal>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "0.875rem",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none",
  fontFamily: "inherit",
};
