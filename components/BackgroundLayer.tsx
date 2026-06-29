// components/BackgroundLayer.tsx
import Image from "next/image";

export default function BackgroundLayer() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2147 30%, #1a3a6e 60%, #2563c4 85%, #4a9eff 100%)",
      }}
    >
      <Image
        src="/cabeza-marcos.png"
        alt=""
        fill
        priority
        className="hero-bg-img"
        style={{
          objectFit: "contain",
          objectPosition: "-230px 190px",
          mixBlendMode: "luminosity",
          opacity: 0.55,
        }}
      />
      <div
        className="hero-bg-overlay"
        style={{ position: "absolute", inset: 0 }}
      />
    </div>
  );
}
