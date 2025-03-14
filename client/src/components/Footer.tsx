export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="text-center md:text-left">
            <img 
              src="/logo-white.svg" 
              alt="Remake Van Logo" 
              className="h-12 mb-4 mx-auto md:mx-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://i.ibb.co/cQKkqh4/remake-Van-logo.png";
                target.className = "h-12 mb-4 mx-auto md:mx-0 invert";
              }}
            />
            <p className="max-w-xs mx-auto md:mx-0 text-gray-400">
              Diseñamos y camperizamos furgonetas personalizadas para que vivas la aventura sin límites.
            </p>
          </div>
          
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#inicio" className="text-gray-400 hover:text-amber-500 transition-colors">Inicio</a>
              <a href="#proyectos" className="text-gray-400 hover:text-amber-500 transition-colors">Proyectos</a>
              <a href="#nosotros" className="text-gray-400 hover:text-amber-500 transition-colors">Sobre nosotros</a>
              <a href="#contacto" className="text-gray-400 hover:text-amber-500 transition-colors">Contacto</a>
            </nav>
          </div>
          
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <i className="fab fa-youtube text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <i className="fab fa-pinterest text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Remake Van. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
