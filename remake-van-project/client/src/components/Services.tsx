import { useIntersectionObserver } from "../hooks/use-intersection-observer";
import { useRef } from "react";

const processSteps = [
  {
    id: 1,
    title: "Consulta y Diseño Personalizado",
    description: "Evaluamos tus necesidades, presupuesto y estilo de viaje para diseñar la distribución perfecta para tu campervan. Te mostramos opciones y materiales."
  },
  {
    id: 2,
    title: "Aislamiento e Instalaciones Básicas",
    description: "Aislamos térmicamente tu furgoneta y realizamos las instalaciones eléctricas, de agua y gas necesarias para tu autonomía."
  },
  {
    id: 3,
    title: "Mobiliario a Medida",
    description: "Fabricamos muebles adaptados al espacio de tu furgoneta, optimizando cada centímetro para maximizar funcionalidad y estética."
  },
  {
    id: 4,
    title: "Acabados y Detalles",
    description: "Instalamos los acabados finales, detalles decorativos y accesorios que harán de tu furgoneta un verdadero hogar sobre ruedas."
  },
  {
    id: 5,
    title: "Entrega y Explicación",
    description: "Te entregamos tu camper lista para la aventura y te explicamos detalladamente el funcionamiento de todos los sistemas."
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  return (
    <section 
      id="services" 
      ref={sectionRef}
      className={`py-20 bg-light transition-all duration-800 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="font-accent text-primary text-2xl">Nuestros Servicios</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">El proceso de camperización</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Convertimos tu furgoneta en un hogar sobre ruedas, adaptado a tus necesidades y estilo de vida.
            Con nuestro proceso paso a paso, garantizamos un resultado excepcional.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative pl-14 pb-12 last:pb-0 process-step">
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">{step.id}</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-lg">{step.description}</p>
              
              {/* Line connecting steps, except for the last step */}
              {index !== processSteps.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-primary"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Solicita presupuesto
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
