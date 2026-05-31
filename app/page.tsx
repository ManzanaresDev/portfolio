"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);
  // @todo: bouton spinner
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* BACKGROUND */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(135deg, #0a1628 0%, #0d2147 30%, #1a3a6e 60%, #2563c4 85%, #4a9eff 100%)",
        }}
      >
        <img
          src="/cabeza-marcos.png"
          alt=""
          style={{
            position: "absolute",
            left: isMobile ? "-300px" : "-250px",
            bottom: isMobile ? "-120px" : "-200px",
            height: isMobile ? "90vh" : "115vh",
            width: "auto",
            objectFit: "cover",
            objectPosition: "top center",
            mixBlendMode: "luminosity",
            opacity: 0.55,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isMobile
              ? "linear-gradient(to bottom, rgba(10,22,40,0.45) 0%, rgba(10,22,40,0.95) 100%)"
              : "linear-gradient(to right, transparent 10%, rgba(10,22,40,0.45) 40%, rgba(10,22,40,0.85) 65%, rgba(10,22,40,0.97) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,22,40,0.9) 0%, transparent 18%)",
          }}
        />
      </div>

      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(135deg, rgba(10,22,40,0.55) 0%, rgba(13,33,71,0.45) 35%, rgba(26,58,110,0.35) 65%, rgba(37,99,196,0.25) 85%, rgba(74,158,255,0.15) 100%)",
        }}
      />

      <main
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "60px 16px" : "20px",
          overflowX: "hidden",
        }}
      >
        {/* LIGHTS */}
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,196,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(40px)",
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: "fixed",
            bottom: "15%",
            right: "15%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(93,223,255,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(50px)",
            zIndex: 2,
          }}
        />

        {/* GRID */}
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "minmax(300px, 1fr) minmax(340px, 520px)",
            gap: "clamp(32px, 6vw, 120px)",
            alignItems: "center",
            padding: isMobile ? "0" : "0 80px",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: isMobile ? "center" : "left",
              alignItems: isMobile ? "center" : "flex-start",
              order: isMobile ? 1 : 0,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(0.5rem, 1.5vw, 3.5rem)",
                lineHeight: 1,
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.04em",
                marginBottom: "28px",
              }}
            >
              Marcos Manzanares
              <span
                style={{
                  color: "#5ddfff",
                  fontSize: "clamp(3rem, 3vw, 2rem)",
                  lineHeight: 1.3,
                  display: "block",
                  marginTop: "22px",
                  fontWeight: 700,
                }}
              >
                Développement web sur mesure et sécurité informatique
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                lineHeight: 1.8,
                color: "rgba(240,246,255,0.65)",
                maxWidth: isMobile ? "100%" : 520,
                margin: isMobile ? "0 auto" : 0,
              }}
            >
              “ Je propose aux petites structures des sites web modernes
              intégrant dès le départ les bonnes pratiques de sécurité ”
            </p>
          </div>

          {/* RIGHT */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
              order: isMobile ? 2 : 0,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 520,
                borderRadius: 24,
                padding: isMobile ? "28px 22px" : "38px 34px",
                backdropFilter: "blur(18px)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ marginBottom: 30 }}>
                <h2
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  Contact
                </h2>

                <p
                  style={{
                    color: "rgba(240,246,255,0.5)",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                  }}
                >
                  Parlez-moi de votre projet.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
