// components/dashboard/AdminTestimonialsList.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  approveTestimonial,
  deleteTestimonial,
} from "@/app/actions/testimonial";

type Testimonial = {
  id: number;
  client_name: string;
  company?: string;
  project?: string;
  message: string;
  rating: number;
  created_at: string;
};

export default function AdminTestimonialsList({
  initialPending,
}: {
  initialPending: Testimonial[];
}) {
  const [pending, setPending] = useState<Testimonial[]>(initialPending);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function handleApprove(id: number) {
    setLoadingId(id);
    try {
      await approveTestimonial(id);
      setPending((prev) => prev.filter((t) => t.id !== id));
      toast.success("Témoignage approuvé");
    } catch {
      toast.error("Erreur lors de l'approbation");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: number) {
    setLoadingId(id);
    try {
      await deleteTestimonial(id);
      setPending((prev) => prev.filter((t) => t.id !== id));
      toast.info("Témoignage supprimé");
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1628",
        color: "white",
        padding: "40px 24px",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1
          style={{
            color: "#5ddfff",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Modération des témoignages
        </h1>
        <p
          style={{
            color: "rgba(240,246,255,0.4)",
            fontSize: "0.875rem",
            marginBottom: 32,
          }}
        >
          {pending.length} avis en attente de validation
        </p>

        {pending.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "40px",
              textAlign: "center",
              color: "rgba(240,246,255,0.35)",
            }}
          >
            Aucun avis en attente 🎉
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {pending.map((t) => (
              <div
                key={t.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, color: "white" }}>
                      {t.client_name}
                    </p>
                    {t.company && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.8rem",
                          color: "rgba(240,246,255,0.4)",
                        }}
                      >
                        {t.company}
                      </p>
                    )}
                    {t.project && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.75rem",
                          color: "#5ddfff",
                        }}
                      >
                        {t.project}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          color:
                            s <= t.rating
                              ? "#fbbf24"
                              : "rgba(255,255,255,0.15)",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "rgba(240,246,255,0.65)",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                    borderLeft: "2px solid rgba(93,223,255,0.3)",
                    paddingLeft: 12,
                  }}
                >
                  &ldquo;{t.message}&rdquo;
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "0.72rem",
                    color: "rgba(240,246,255,0.25)",
                  }}
                >
                  Reçu le {new Date(t.created_at).toLocaleDateString("fr-FR")}
                </p>

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button
                    onClick={() => handleApprove(t.id)}
                    disabled={loadingId === t.id}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: "rgba(52,211,153,0.15)",
                      color: "#34d399",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      border: "1px solid rgba(52,211,153,0.3)",
                      opacity: loadingId === t.id ? 0.5 : 1,
                    }}
                  >
                    ✓ Approuver
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={loadingId === t.id}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: "rgba(239,68,68,0.1)",
                      color: "#f87171",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      border: "1px solid rgba(239,68,68,0.25)",
                      opacity: loadingId === t.id ? 0.5 : 1,
                    }}
                  >
                    ✕ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
