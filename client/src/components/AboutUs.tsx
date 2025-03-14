export default function AboutUs() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <img 
              src="/assets/PHOTO-2023-04-18-12-49-12.jpg" 
              alt="Remake Van - Interior de furgoneta camperizada" 
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
                <p className="text-center text-sm mt-2">Diseñamos cada furgoneta adaptada a tus necesidades y gustos, con un trato familiar y cercano.</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-tools text-amber-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-lg text-center">Calidad y Experiencia</h3>
                <p className="text-center text-sm mt-2">Con nuestra trayectoria, sabemos cómo optimizar espacios y aplicar soluciones funcionales y estéticas.</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-euro-sign text-amber-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-lg text-center">Precios Accesibles</h3>
                <p className="text-center text-sm mt-2">Al no tener gastos de local, ofrecemos camperizaciones de calidad a precios más competitivos.</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-mountain text-amber-500 text-3xl mb-3"></i>
                <h3 className="font-semibold text-lg text-center">Espíritu Aventurero</h3>
                <p className="text-center text-sm mt-2">Creamos campers que inspiran a viajar, explorar y disfrutar de la vida sin ataduras.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16" data-aos="fade-up">
          <h3 className="text-2xl font-bold mb-6 text-center">Nuestra Visión</h3>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Convertirnos en una empresa referente en la camperización personalizada en España, reconocida por nuestra capacidad de optimizar el espacio, encontrar soluciones innovadoras y crear furgonetas con una estética llamativa y funcional. Queremos que más personas descubran el estilo de vida camper con la mejor calidad y un servicio cercano y accesible.
          </p>
        </div>
      </div>
    </section>
  );
}
