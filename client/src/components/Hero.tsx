const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-traveling-in-a-camper-van-with-a-view-of-the-mountains-39659-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow">
          Convierte tu furgoneta<br/>en un hogar sobre ruedas
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto text-shadow">
          Camperizaciones personalizadas para vivir la aventura sin límites
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#projects" 
            className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg"
          >
            Descubre nuestros proyectos
          </a>
          <a 
            href="#contact" 
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-8 rounded-full backdrop-blur-sm transition-all duration-300 text-lg border border-white border-opacity-40"
          >
            Contactar
          </a>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white">
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
