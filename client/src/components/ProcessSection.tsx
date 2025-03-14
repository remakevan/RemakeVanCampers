export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo trabajamos?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Te acompañamos en todo el proceso para crear la furgoneta de tus sueños, desde el diseño hasta la entrega.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
            <h3 className="text-xl font-bold mb-4">Diseño y Planificación</h3>
            <p className="text-gray-600">
              Nos reunimos contigo para entender tus necesidades y crear un diseño personalizado que se adapte a tu estilo de vida.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
            <h3 className="text-xl font-bold mb-4">Construcción y Adaptación</h3>
            <p className="text-gray-600">
              Transformamos tu furgoneta, optimizando cada centímetro con soluciones funcionales y de alta calidad.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
            <h3 className="text-xl font-bold mb-4">Entrega y Soporte</h3>
            <p className="text-gray-600">
              Te entregamos tu furgoneta lista para la aventura y te ofrecemos soporte continuo para resolver cualquier duda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
