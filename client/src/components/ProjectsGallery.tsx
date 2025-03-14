import { useState } from 'react';
import LightboxGallery from './LightboxGallery';
import { Project } from '@/lib/types';

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "Proyecto Nómada",
    description: "Diseño compacto para parejas aventureras",
    category: "interiores",
    image: "https://images.unsplash.com/photo-1612284532331-a99bb4aa2609?q=80&w=1932&auto=format&fit=crop",
    alt: "Interior de furgoneta camperizada"
  },
  {
    id: 2,
    title: "Proyecto Libertad",
    description: "Furgoneta 4x4 para terrenos difíciles",
    category: "exteriores",
    image: "https://images.unsplash.com/photo-1616190419596-e65cef84851d?q=80&w=1974&auto=format&fit=crop",
    alt: "Exterior de furgoneta camperizada"
  },
  {
    id: 3,
    title: "Proyecto Familia",
    description: "Diseño espacioso para viajes familiares",
    category: "completos",
    image: "https://images.unsplash.com/photo-1568844293986-ca011da26ff6?q=80&w=2070&auto=format&fit=crop",
    alt: "Proyecto completo de camperización"
  },
  {
    id: 4,
    title: "Proyecto Minimalista",
    description: "Diseño sencillo y funcional",
    category: "interiores",
    image: "https://images.unsplash.com/photo-1624286284556-d21de29ea06c?q=80&w=1974&auto=format&fit=crop",
    alt: "Interior minimalista de camper"
  },
  {
    id: 5,
    title: "Proyecto Aventura",
    description: "Preparada para cualquier terreno",
    category: "exteriores",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
    alt: "Furgoneta en paraje natural"
  },
  {
    id: 6,
    title: "Proyecto Panorama",
    description: "Con ventanas panorámicas para disfrutar del paisaje",
    category: "completos",
    image: "https://images.unsplash.com/photo-1602976615520-8e64fdeadc16?q=80&w=1939&auto=format&fit=crop",
    alt: "Furgoneta camperizada con vista panorámica"
  },
  {
    id: 7,
    title: "Proyecto Coastal",
    description: "Perfecta para viajes por la costa",
    category: "exteriores",
    image: "https://images.unsplash.com/photo-1510674485131-dc88d96369b4?q=80&w=2069&auto=format&fit=crop",
    alt: "Furgoneta camperizada en la playa"
  },
  {
    id: 8,
    title: "Proyecto Acogedor",
    description: "Interior cálido para sentirte como en casa",
    category: "interiores",
    image: "https://images.unsplash.com/photo-1594496479273-8102b9f6f26a?q=80&w=1950&auto=format&fit=crop",
    alt: "Interior acogedor de camper van"
  },
  {
    id: 9,
    title: "Proyecto Multiaventura",
    description: "Diseñada para múltiples actividades deportivas",
    category: "completos",
    image: "https://images.unsplash.com/photo-1620646233562-f2a31ad24425?q=80&w=2070&auto=format&fit=crop",
    alt: "Furgoneta camperizada multiaventura"
  },
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
