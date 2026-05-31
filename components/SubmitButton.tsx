// SubmitButton.tsx
"use client";
import { useFormStatus } from "react-dom";
import { Send } from "lucide-react";

const buttonStyle = {
  marginTop: 10,
  height: 54,
  border: "none",
  borderRadius: 14,
  cursor: "pointer",
  background: "linear-gradient(135deg, #2563c4 0%, #5ddfff 100%)",
  color: "white",
  fontSize: "0.95rem",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  width: "100%",
};

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" style={buttonStyle} disabled={pending}>
      {pending ? (
        "Envoi..."
      ) : (
        <>
          <Send size={18} />
          Envoyer le message
        </>
      )}
    </button>
  );
}
