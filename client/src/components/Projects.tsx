import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";

const projects = [
  {
    id: 1,
    title: "Furgoneta Mercedes Sprinter",
    description: "Camperización completa con baño y cocina integrados",
    imageSrc: "https://images.unsplash.com/photo-1532416126106-7ea8a1dc1635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Interior camperizado de Mercedes Sprinter"
  },
  {
    id: 2,
    title: "Volkswagen Crafter",
    description: "Diseño minimalista con cama fija y paneles solares",
    imageSrc: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Interior minimalista en Volkswagen Crafter"
  },
  {
    id: 3,
    title: "Fiat Ducato",
    description: "Camper familiar con literas y amplio espacio de almacenamiento",
    imageSrc: "https://images.unsplash.com/photo-1536613968087-0e9694e15b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Interior de Fiat Ducato camperizada para familia"
  },
  {
    id: 4,
    title: "Ford Transit",
    description: "Camperización con oficina móvil integrada",
    imageSrc: "https://images.unsplash.com/photo-1507397628177-1056bad5f3d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Ford Transit con oficina móvil"
  },
  {
    id: 5,
    title: "Renault Master",
    description: "Van de lujo con acabados premium y cocina completa",
    imageSrc: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Interior de lujo en Renault Master"
  },
  {
    id: 6,
    title: "Iveco Daily",
    description: "Diseño modular adaptable para diferentes usos",
    imageSrc: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    alt: "Iveco Daily con diseño modular"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={`py-20 bg-white transition-all duration-800 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="font-accent text-primary text-2xl">Nuestro Trabajo</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">Proyectos de camperización</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Descubre algunos de nuestros proyectos y déjate inspirar para tu próxima aventura sobre ruedas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => openLightbox(index)}>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src={project.imageSrc} 
                  alt={project.alt} 
                  className="w-full h-72 object-cover transition-all duration-300 transform group-hover:scale-105" 
                  loading="lazy"
                />
              </div>
              <h3 className="font-heading font-semibold text-xl mt-4 mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#contact" className="inline-flex items-center font-semibold text-primary hover:text-opacity-80 transition-colors">
            Ver todos los proyectos <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
      
      {/* Lightbox component */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={projects.map(project => ({
          src: project.imageSrc,
          alt: project.alt,
          title: project.title,
          description: project.description
        }))}
        currentIndex={currentImage}
        setCurrentIndex={setCurrentImage}
      />
    </section>
  );
};

export default Projects;
