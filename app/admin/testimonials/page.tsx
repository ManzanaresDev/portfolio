import {
  getPendingTestimonials,
  approveTestimonial,
  deleteTestimonial,
} from "@/app/actions/testimonial";

export default async function AdminTestimonialsPage() {
  const pending = await getPendingTestimonials();

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
                {/* Infos client */}
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

                {/* Message */}
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

                {/* Date */}
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.72rem",
                    color: "rgba(240,246,255,0.25)",
                  }}
                >
                  Reçu le {new Date(t.created_at).toLocaleDateString("fr-FR")}
                </p>

                {/* Actions */}
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <form
                    action={async () => {
                      "use server";
                      await approveTestimonial(t.id);
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        padding: "8px 18px",
                        borderRadius: 8,
                        cursor: "pointer",
                        background: "rgba(52,211,153,0.15)",
                        color: "#34d399",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        border: "1px solid rgba(52,211,153,0.3)",
                      }}
                    >
                      ✓ Approuver
                    </button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      await deleteTestimonial(t.id);
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        padding: "8px 18px",
                        borderRadius: 8,
                        cursor: "pointer",
                        background: "rgba(239,68,68,0.1)",
                        color: "#f87171",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        border: "1px solid rgba(239,68,68,0.25)",
                      }}
                    >
                      ✕ Supprimer
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
