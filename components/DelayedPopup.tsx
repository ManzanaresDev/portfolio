// components/DelayedPopup.tsx
"use client";

import { useEffect, useState, ReactNode } from "react";

interface DelayedPopupProps {
  delay?: number; // délai en millisecondes (par défaut 5000ms = 5s)
  children: ReactNode;
  onClose?: () => void;
}

export default function DelayedPopup({
  delay = 5000,
  children,
  onClose,
}: DelayedPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "500px",
          width: "90%",
          position: "relative",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
<button
  onClick={handleClose}
  style={{
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    fontSize: "20px",
    lineHeight: 1,
    cursor: "pointer",
    color: "#001018", // ← couleur explicite, sombre sur fond blanc
  }}
  aria-label="Fermer"
>
  ✕
</button>
        {children}
      </div>
    </div>
  );
}