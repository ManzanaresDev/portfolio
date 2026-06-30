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

        <section
          id="bio"
          className="section-style"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <BioSection />
        </section>

        <section
          id="projets"
          className="section-style section-offset"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <ProjectsGallery />
        </section>

        <section
          id="services"
          className="section-style"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <ServicesSection />
        </section>

        <section
          id="testimonials"
          className="section-style"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <TestimonialsSection />
        </section>

        <section
          id="contact"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            paddingLeft: "clamp(1rem, 4vw, 2rem)",
            paddingRight: "clamp(1rem, 4vw, 2rem)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ContactSection />
        </section>
      </main>
    </>
  );
}
