// components/HeroSection.tsx
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function HeroSection() {
  return (
    <div className="hero-grid" style={{ width: "100%", maxWidth: "1200px" }}>
      {/* LEFT TEXT */}
      <div className="hero-text">
        <Image
          src="/coderCatLogo.png"
          alt="CoderCat Logo"
          width={140}
          height={140}
          style={{ marginBottom: 30, alignSelf: "center" }}
        />

        <span
          style={{
            color: "#5ddfff",
            fontSize: "clamp(1.2rem, 4vw, 2.1rem)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            marginBottom: 8,
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
          sécurisés et faciles à prendre en main, afin que vous soyez autonomes
          dès le premier jour. »
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
            padding: "22px 26px",
            backdropFilter: "blur(16px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
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
                fontSize: "1.3rem",
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
          {/* ...reste du formulaire */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
