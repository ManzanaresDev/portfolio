// components/BackgroundLayer.tsx
import Image from "next/image";

export default function BackgroundLayer() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2147 30%, #1a3a6e 60%, #2563c4 85%, #4a9eff 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-12%" /* ← coupe le bord gauche */,
          width: "35%" /* ← pas toute la largeur */,
          height: "100%",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 20%, black 60%, transparent 85%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 20%, black 60%, transparent 85%)",
        }}
      >
        <Image
          src="/images/cabeza-marcos.avif"
          alt=""
          fill
          priority
          unoptimized
          className="hero-bg-img"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0.75,
          }}
        />
      </div>

      <div
        className="hero-bg-overlay"
        style={{ position: "absolute", inset: 0 }}
      />
    </div>
  );
}
