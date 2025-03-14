export default function ValueProposition() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Por qué elegir Remake Van?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Remake Van nace de nuestra propia experiencia de vida: viajamos, vivimos y disfrutamos nuestras furgonetas, y queremos que nuestros clientes puedan hacer lo mismo.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 mt-1 text-amber-500">
                  <i className="fas fa-check-circle text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Experiencia en optimización de espacios</h3>
                  <p className="text-gray-600">Aplicamos nuestro conocimiento en reformas para aprovechar cada centímetro de la furgoneta.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 text-amber-500">
                  <i className="fas fa-check-circle text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Soluciones personalizadas</h3>
                  <p className="text-gray-600">No hay dos campers iguales, cada una se adapta a la forma de viajar de su dueño.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 text-amber-500">
                  <i className="fas fa-check-circle text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Precios accesibles</h3>
                  <p className="text-gray-600">Nos adaptamos a tus necesidades para ofrecerte la mejor calidad al mejor precio.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/2" data-aos="fade-left">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1627607419034-189c99f87f5f?q=80&w=1974&auto=format&fit=crop"
                alt="Interior de camper van con diseño personalizado" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-medium">Diseño llamativo y acogedor para sentirte como en casa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
