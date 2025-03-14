export default function AboutUs() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <img 
              src="https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=2070&auto=format&fit=crop" 
              alt="Equipo de Remake Van trabajando en una furgoneta" 
              className="w-full h-auto rounded-xl shadow-lg"
              loading="lazy"
            />
          </div>
          
          <div className="md:w-1/2" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Remake Van</h2>
            <p className="text-lg text-gray-700 mb-6">
              Remake Van nace de nuestra propia experiencia de vida: viajamos, vivimos y disfrutamos nuestras furgonetas, y queremos que nuestros clientes puedan hacer lo mismo.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Nos dedicamos a camperizar furgonetas a medida, diseñadas en función de las necesidades de cada cliente, para que puedan viajar con total libertad y sentirse como en casa en cualquier lugar.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-hands-helping text-amber-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-lg text-center">Personalización y Cercanía</h3>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-tools text-amber-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-lg text-center">Calidad y Experiencia</h3>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-euro-sign text-amber-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-lg text-center">Precios Justos</h3>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-mountain text-amber-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-lg text-center">Espíritu Aventurero</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
