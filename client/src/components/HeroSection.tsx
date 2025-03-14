import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
        // Fallback to poster/image if autoplay fails
      });
    }
  }, []);

  return (
    <section id="inicio" className="relative h-[90vh] overflow-hidden">
      {/* Overlay with gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 to-black/30"></div>
      
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=2070&auto=format&fit=crop"
      >
        <source src="/attached_assets/Gen-3 Alpha Turbo 431170585, A cinematic aerial , Cropped - ZeCxX-9-LA, M 5.mp4" type="video/mp4" />
        {/* Fallback image for browsers that don't support video */}
        <img 
          src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=2070&auto=format&fit=crop" 
          alt="Camper van parked with mountain view" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <div className="max-w-xl" data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Construimos la furgoneta de tus sueños
          </h1>
          <p className="text-xl text-white mb-10 max-w-lg">
            Diseñamos y camperizamos furgonetas personalizadas para que vivas la aventura sin límites.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#proyectos" 
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg inline-flex items-center"
            >
              Descubre más
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a 
              href="#contacto" 
              className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
