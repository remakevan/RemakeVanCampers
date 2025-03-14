import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    quote: "Remake Van superó todas nuestras expectativas. Han convertido nuestra furgoneta en un hogar completo y acogedor. La atención personalizada y el asesoramiento fueron excelentes.",
    name: "Miguel y Rosa",
    vanModel: "Mercedes Sprinter",
    initials: "MR"
  },
  {
    id: 2,
    quote: "Increíble el aprovechamiento del espacio que han logrado en nuestra furgoneta. Calidad, diseño y funcionalidad todo en uno. Ahora viajamos con total comodidad.",
    name: "Laura C.",
    vanModel: "Fiat Ducato",
    initials: "LC"
  },
  {
    id: 3,
    quote: "Profesionales y cercanos. Han entendido perfectamente lo que buscábamos y nos han asesorado durante todo el proceso. El resultado es espectacular y a un precio muy razonable.",
    name: "Javier A.",
    vanModel: "Volkswagen Crafter",
    initials: "JA"
  },
  {
    id: 4,
    quote: "Llevamos más de un año viajando en nuestra camper y todo funciona perfectamente. La calidad de los materiales y el trabajo es excepcional. Totalmente recomendable.",
    name: "Sara M.",
    vanModel: "Ford Transit",
    initials: "SM"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-secondary text-white transition-all duration-800 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="font-accent text-primary text-2xl">Testimonios</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Descubre las experiencias de quienes ya disfrutan de su hogar sobre ruedas.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id} 
                className="bg-white bg-opacity-5 p-8 rounded-lg backdrop-blur-sm border border-white border-opacity-10"
              >
                <div className="text-primary mb-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="italic mb-6 text-gray-200">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                    <span className="font-bold text-white">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.vanModel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
