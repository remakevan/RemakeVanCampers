import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 bg-white transition-all duration-800 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Equipo de Remake Van" 
              className="rounded-lg shadow-lg w-full h-128 object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Nosotros</h2>
            <p className="text-lg mb-6">
              Remake Van nace de nuestra propia experiencia de vida: viajamos, vivimos y disfrutamos 
              nuestras furgonetas, y queremos que nuestros clientes puedan hacer lo mismo. 
            </p>
            <p className="text-lg mb-8">
              Nos dedicamos a camperizar furgonetas a medida, diseñadas en función de las necesidades 
              de cada cliente, para que puedan viajar con total libertad y sentirse como en casa en cualquier lugar.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <i className="fas fa-tachometer-alt text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Experiencia</h3>
                  <p>Optimizamos cada centímetro de tu furgoneta con soluciones funcionales y personalizadas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <i className="fas fa-hand-holding-heart text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Cercanía</h3>
                  <p>Te acompañamos durante todo el proceso con un trato cercano y familiar.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <i className="fas fa-coins text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Precios justos</h3>
                  <p>Ofrecemos camperizaciones de calidad a precios competitivos sin sacrificar acabados.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <i className="fas fa-mountain text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Espíritu aventurero</h3>
                  <p>Creamos campers que inspiran a viajar y disfrutar de la vida sin ataduras.</p>
                </div>
              </div>
            </div>
            
            <a href="#contact" className="inline-flex items-center font-semibold text-primary hover:text-opacity-80 transition-colors">
              Conoce más sobre nosotros <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
