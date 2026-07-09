// components/CookiePreferencesModal.tsx
"use client";

import { useCookieConsent } from "@/contexte/CookieConsentContext";

export default function CookiePreferencesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { consent, acceptCookies, refuseCookies } = useCookieConsent();

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gérer les cookies"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(5,10,20,0.75)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0b1424",
          color: "rgba(240,246,255,0.9)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 520,
          width: "100%",
          padding: "32px 28px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "transparent",
            border: "1px solid rgba(240,246,255,0.3)",
            borderRadius: 8,
            color: "rgba(240,246,255,0.8)",
            width: 32,
            height: 32,
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <h3 style={{ margin: "0 0 12px", fontWeight: 600 }}>
          Gérer les cookies
        </h3>

        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(240,246,255,0.6)",
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          Nous utilisons Google Analytics et Microsoft Clarity pour mesurer
          l&apos;audience du site. Ces cookies ne sont pas essentiels et ne sont
          déposés qu&apos;avec votre consentement.
        </p>

        <p
          style={{
            fontSize: "0.75rem",
            color: "rgba(240,246,255,0.45)",
            marginBottom: 20,
          }}
        >
          Statut actuel :{" "}
          <strong>
            {consent === "accepted"
              ? "cookies acceptés"
              : consent === "refused"
                ? "cookies refusés"
                : "aucun choix"}
          </strong>
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => {
              refuseCookies();
              onClose();
            }}
            style={{
              flex: 1,
              padding: "10px 18px",
              fontSize: "0.8rem",
              fontWeight: 500,
              borderRadius: 10,
              border: "1px solid rgba(240,246,255,0.25)",
              background: "transparent",
              color: "rgba(240,246,255,0.8)",
              cursor: "pointer",
            }}
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => {
              acceptCookies();
              onClose();
            }}
            style={{
              flex: 1,
              padding: "10px 18px",
              fontSize: "0.8rem",
              fontWeight: 600,
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #2563c4, #5ddfff)",
              color: "#0a1628",
              cursor: "pointer",
            }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
