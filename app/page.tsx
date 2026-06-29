// app/page.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import BioSection from "@/components/BioSection";
import TestimonialsSection from "@/components/TestimonialSection";
import ServicesSection from "@/components/ServiceSection";
import BackgroundLayer from "@/components/BackgroundLayer";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <BackgroundLayer />

      <main className="main-wrapper">
        <section id="hero" className="hero-padding hero-main">
          <HeroSection />
        </section>
        <section id="bio">
          <BioSection />
        </section>
        <section id="projets" className="section-offset">
          <ProjectsGallery />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </main>
    </>
  );
}
