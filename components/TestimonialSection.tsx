"use client";

import { useState, useEffect } from "react";
import {
  getApprovedTestimonials,
  type Testimonial,
} from "@/app/actions/testimonial";
import TestimonialForm from "@/components/TestimoniaForm";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getApprovedTestimonials();
      setTestimonials(data);
    };

    load();

    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Témoignages clients</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          alignItems: "start",
        }}
        className="testimonials-layout"
      >
        {/* COLONNE GAUCHE : témoignages */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {testimonials.length > 0 ? (
            testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37, 99, 196, 0.75), rgba(93, 223, 255, 0.75))",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: "20px 22px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "8px 20px",
                }}
                className="testimonial-card"
              >
                {/* COLONNE GAUCHE de la carte : étoiles + message */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "0.9rem",
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
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(240,246,255,0.65)",
                      lineHeight: 1.65,
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{t.message}&rdquo;
                  </p>
                </div>

                {/* COLONNE DROITE de la carte : auteur */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: 4,
                    textAlign: "right",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "white",
                    }}
                  >
                    {t.client_name}
                  </p>
                  {t.company && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
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
                        fontSize: "0.72rem",
                        color: "#5ddfff",
                      }}
                    >
                      {t.project}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                color: "rgba(240,246,255,0.3)",
                fontSize: "0.875rem",
                fontStyle: "italic",
              }}
            >
              Les premiers avis arrivent bientôt...
            </p>
          )}
        </div>
        {/* COLONNE DROITE: formulaire */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "28px 32px",
          }}
          className="testimonial-form-wrapper"
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "white",
              margin: "0 0 20px",
            }}
            className="testimonial-form-title"
          >
            Laisser un témoignage
          </h3>
          <TestimonialForm />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .testimonials-layout { grid-template-columns: 1fr !important; }
          .testimonial-form-wrapper { padding: 20px 16px !important; }
          .testimonial-card { grid-template-columns: 1fr !important; text-align: left !important; }
          .testimonial-card > div:last-child { text-align: left !important; align-items: flex-start !important; }
        }

        @media (max-width: 480px) {
          .testimonial-form-title { font-size: 0.95rem !important; }
        }
      `}</style>
    </div>
  );
}
