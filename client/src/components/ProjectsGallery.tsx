import { useState } from 'react';
import LightboxGallery from './LightboxGallery';
import { Project } from '../lib/types';

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "Proyecto Nómada",
    description: "Diseño compacto para parejas aventureras",
    category: "interiores",
    image: "/assets/PHOTO-2023-04-18-12-49-12.jpg",
    alt: "Interior de furgoneta camperizada"
  },
  {
    id: 3,
    title: "Proyecto Familia",
    description: "Diseño espacioso para viajes familiares",
    category: "completos",
    image: "/assets/20241220_123330.jpg",
    alt: "Proyecto completo de camperización"
  },
  {
    id: 4,
    title: "Proyecto Minimalista",
    description: "Diseño sencillo y funcional",
    category: "exteriores",
    image: "/assets/furgoneta_playa.jpg",
    alt: "Furgoneta en la playa con paisaje"
  },
  {
    id: 6,
    title: "Proyecto Panorama",
    description: "Con ventanas panorámicas para disfrutar del paisaje",
    category: "completos",
    image: "/assets/20241220_123330.jpg",
    alt: "Furgoneta camperizada con vista panorámica"
  }
];

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Handle opening the lightbox
  const openLightbox = (project: Project) => {
    setCurrentProject(project);
    setLightboxOpen(true);
  };

  return (
    <section id="proyectos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Proyectos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada furgoneta es única y se adapta a las necesidades de cada cliente. Descubre algunos de nuestros trabajos.
          </p>
        </div>
        
        {/* Gallery Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10" data-aos="fade-up" data-aos-delay="100">
          <button 
            className={`py-2 px-6 rounded-full transition-colors ${
              activeFilter === 'all' 
                ? 'bg-amber-500 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`py-2 px-6 rounded-full transition-colors ${
              activeFilter === 'interiores' 
                ? 'bg-amber-500 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveFilter('interiores')}
          >
            Interiores
          </button>
          <button 
            className={`py-2 px-6 rounded-full transition-colors ${
              activeFilter === 'exteriores' 
                ? 'bg-amber-500 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveFilter('exteriores')}
          >
            Exteriores
          </button>
          <button 
            className={`py-2 px-6 rounded-full transition-colors ${
              activeFilter === 'completos' 
                ? 'bg-amber-500 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveFilter('completos')}
          >
            Proyectos completos
          </button>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={`${150 + project.id * 50}`}
            >
              <div 
                className="relative group cursor-pointer" 
                onClick={() => openLightbox(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.alt} 
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="mb-4">{project.description}</p>
                    <span className="inline-block bg-amber-500 rounded-full px-4 py-1 text-sm font-semibold">
                      Ver detalles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12" data-aos="fade-up">
          <a 
            href="#contacto" 
            className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Quiero mi furgoneta personalizada
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>

      {/* Lightbox Gallery */}
      {lightboxOpen && currentProject && (
        <LightboxGallery 
          projects={projects}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
