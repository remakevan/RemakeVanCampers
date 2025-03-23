export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre las experiencias de quienes ya disfrutan de su furgoneta Remake Van.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-6">
              <div className="text-amber-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <p className="text-gray-600 mb-6 italic">
              "Buscábamos algo minimalista pero funcional y lo conseguimos. El equipo nos asesoró en todo momento y el resultado superó nuestras expectativas."
            </p>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Elena</h4>
                <p className="text-sm text-gray-500">Proyecto Minimalista</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
