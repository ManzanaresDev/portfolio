// components/HeroSection.tsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="hero-content">
      <div className="hero-logo">
        <Image
          src="/coderCatLogo.png"
          alt="CoderCat Logo"
          width={250}
          height={250}
        />
      </div>

      <div className="hero-text">
        <span className="title">Développement web & sécurité</span>
        <p className="hero-desc">
          « Je conçois pour les petites structures des sites web rapides,
          sécurisés et faciles à prendre en main, afin que vous soyez autonomes
          dès le premier jour. »
        </p>
      </div>
    </div>
  );
}
