export default function CTASection() {
  return (
    <section className="py-20 bg-amber-500">
      <div className="container mx-auto px-4 text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para comenzar tu aventura?</h2>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
          Contáctanos hoy mismo y comienza a diseñar la furgoneta de tus sueños. ¡La libertad está a solo un paso!
        </p>
        <a 
          href="#contacto" 
          className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-900 font-medium py-4 px-10 rounded-lg transition-colors shadow-lg text-lg"
        >
          Solicitar presupuesto
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </section>
  );
}
