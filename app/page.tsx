"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ProjectsGallery from "@/components/ProjectsGallery";

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);

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
        {!isMobile && (
          <Image
            src="/cabeza-marcos.png"
            alt="background"
            fill
            priority
            style={{
              objectFit: "contain",
              objectPosition: "-230px 190px",
              mixBlendMode: "luminosity",
              opacity: 0.55,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isMobile
              ? "linear-gradient(to bottom, rgba(10,22,40,0.55), rgba(10,22,40,0.97))"
              : "linear-gradient(to right, transparent 10%, rgba(10,22,40,0.45) 40%, rgba(10,22,40,0.9) 100%)",
          }}
        />
      </div>
      {/* TOP LOGO CENTRÉ */}
      <div
        style={{
          position: "fixed",
          top: isMobile ? 22 : 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      >
        <Image
          src="/cabeza-marcos.png"
          alt="background"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: isMobile ? "left bottom" : "left bottom",
            transform: isMobile ? "none" : "translateX(-38%)",
            mixBlendMode: "luminosity",
            opacity: 0.55,
          }}
        />
      </div>
      <main
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "center",
          padding: isMobile ? "30px 16px 40px" : "20px",
          overflowY: isMobile ? "auto" : "visible",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 100,
            alignItems: "center",
            transform: isMobile ? "none" : "translateX(120px)",
          }}
        >
          {/* LEFT TEXT */}
          <div
            style={{
              textAlign: isMobile ? "center" : "left",
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            <Image
              src="/coderCatLogo.png"
              alt="CoderCat Logo"
              width={isMobile ? 80 : 140}
              height={isMobile ? 80 : 140}
              style={{
                marginBottom: 10,
                alignSelf: isMobile ? "center" : "flex-start",
              }}
            />

            <span
              style={{
                color: "#5ddfff",
                fontSize: "clamp(1.2rem, 4vw, 2.1rem)",
                fontWeight: 700,
                letterSpacing: "0.05em",
                marginBottom: 8,
                whiteSpace: "nowrap",
              }}
            >
              Développement web & sécurité
            </span>

            <p
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1.3rem)",
                lineHeight: 1.5,
                color: "rgba(240,246,255,0.65)",
                maxWidth: 520,
              }}
            >
              « Je conçois pour les petites structures des sites web rapides,
              sécurisés et faciles à prendre en main, afin que vous soyez
              autonomes dès le premier jour. »
            </p>
          </div>

          {/* RIGHT FORM */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 460,
                borderRadius: 20,
                padding: isMobile ? "16px 14px" : "22px 26px",
                backdropFilter: "blur(16px)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {/* HEADER - Contact + badge sur la même ligne */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? "1.1rem" : "1.3rem",
                    fontWeight: 600,
                    color: "white",
                    margin: 0,
                  }}
                >
                  Contact
                </h2>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontSize: "0.7rem",
                    color: "#5ddfff",
                    background: "rgba(93,223,255,0.08)",
                    border: "1px solid rgba(93,223,255,0.25)",
                  }}
                >
                  🔒 Formulaire sécurisé
                </div>
              </div>

              {/* FORM */}
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      {/* GALERIE PROJETS */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "#0a1628",
          width: "100%",
        }}
      >
        <ProjectsGallery />
      </div>
    </>
  );
}
