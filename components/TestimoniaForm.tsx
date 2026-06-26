"use client";

import { useState } from "react";
import { createTestimonial } from "@/app/actions/testimonial";

const PROJECTS = [
  "Zohre masajes",
  "Old Books",
  "Gestion d'entreprise",
  "KinéApp",
  "Plateforme programmation",
  "La casita de la paella",
];

export default function TestimonialForm() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (rating === 0) {
      setError("Merci de donner une note.");
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
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
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
          Merci pour votre avis !
        </h3>
        <p style={{ color: "rgba(240,246,255,0.55)", fontSize: "0.875rem" }}>
          Il sera publié après validation.
        </p>
      </div>
    );
  }

  return (
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
            placeholder="Votre nom *"
            required
            style={inputStyle}
          />
        </div>
        <div>
          <input
            name="company"
            type="text"
            placeholder="Entreprise (optionnel)"
            style={inputStyle}
          />
        </div>
      </div>

      <select name="project" style={inputStyle}>
        <option value="">Projet concerné (optionnel)</option>
        {PROJECTS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        rows={4}
        placeholder="Votre témoignage *"
        required
        style={{ ...inputStyle, resize: "none" }}
      />

      {/* Étoiles */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: "0.8rem", color: "rgba(240,246,255,0.45)" }}>
          Note *
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

      {error && (
        <p style={{ color: "#ff6b6b", fontSize: "0.8rem", margin: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 4,
          height: 46,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          background: "linear-gradient(135deg, #2563c4, #5ddfff)",
          color: "#0a1628",
          fontWeight: 600,
          fontSize: "0.875rem",
          borderRadius: 10,
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {loading ? "Envoi..." : "Envoyer mon avis"}
      </button>

      <style>{`
        @media (max-width: 480px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
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
