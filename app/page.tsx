import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import BioSection from "@/components/BioSection";
import TestimonialsSection from "@/components/TestimonialSection";
import ServicesSection from "@/components/ServiceSection";
import ContactSection from "@/components/ContactSection";
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

        <section id="bio" className="page-section">
          <BioSection />
        </section>

        <section id="projets" className="page-section">
          <ProjectsGallery />
        </section>

        <section id="services" className="page-section">
          <ServicesSection />
        </section>

        <section id="testimonials" className="page-section">
          <TestimonialsSection />
        </section>

        <section id="contact" className="page-section">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
