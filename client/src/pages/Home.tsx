import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import ProjectsGallery from "@/components/ProjectsGallery";
import ProcessSection from "@/components/ProcessSection";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useEffect } from "react";

export default function Home() {
  // Initialize smooth scrolling
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' && target.hasAttribute('href')) {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset for navbar
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Animate elements when they are in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('[data-aos]');
      
      scrollElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
          element.classList.add('aos-animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);

  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <ProjectsGallery />
      <ProcessSection />
      <AboutUs />
      <Testimonials />
      <CTASection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
