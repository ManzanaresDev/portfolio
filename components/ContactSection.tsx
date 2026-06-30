// components/ContactSection.tsx
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          borderRadius: 20,
          padding:
            "clamp(20px, 5vw, 40px) clamp(16px, 5vw, 50px)" /* ← responsive */,
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
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

        <ContactForm />
      </div>
    </div>
  );
}
