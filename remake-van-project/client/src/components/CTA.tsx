import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-white transition-all duration-800 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="bg-light rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-5xl mx-auto relative overflow-hidden">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary opacity-10 rounded-full transform -translate-x-16 translate-y-16"></div>
          
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">¿Listo para iniciar tu aventura?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Contacta con nosotros para comenzar a diseñar la campervan de tus sueños.
              Te asesoraremos y crearemos un presupuesto personalizado sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg"
              >
                Solicitar presupuesto
              </a>
              <a 
                href="https://wa.me/34612345678" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg flex items-center justify-center"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
