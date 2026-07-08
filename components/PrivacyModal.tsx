// components/PrivacyModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type PrivacyModalProps = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  children: React.ReactNode;
};

export default function PrivacyModal({
  open,
  onClose,
  onAccept,
  children,
}: PrivacyModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canAccept, setCanAccept] = useState(false);

  useEffect(() => {
    if (open) {
      const el = scrollRef.current;
      if (el) {
        el.scrollTop = 0;
      }
    }
  }, [open]);

  if (!open) return null;

  const handleScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setCanAccept(true);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5,10,20,.75)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 760,
          background: "#0b1424",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "white",
              fontSize: "1.1rem",
            }}
          >
            Politique de confidentialité
          </h2>

          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              cursor: "pointer",
              background: "transparent",
              color: "white",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            ✕
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
            padding: 24,
            color: "rgba(240,246,255,.82)",
            lineHeight: 1.8,
          }}
        >
          {children}
        </div>

        <div
          style={{
            padding: 24,
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {!canAccept && (
            <span
              style={{
                color: "#5ddfff",
                fontSize: ".85rem",
              }}
            >
              Faites défiler jusqu&apos;en bas pour pouvoir accepter la
              politique de confidentialité.
            </span>
          )}

          <button
            disabled={!canAccept}
            onClick={() => {
              onAccept();
              onClose();
            }}
            style={{
              height: 46,
              border: "none",
              borderRadius: 10,
              cursor: canAccept ? "pointer" : "not-allowed",
              background: "linear-gradient(135deg,#2563c4,#5ddfff)",
              color: "#081220",
              fontWeight: 600,
              opacity: canAccept ? 1 : 0.5,
            }}
          >
            J&apos;ai lu et compris cette politique
          </button>
        </div>
      </div>
    </div>
  );
}
