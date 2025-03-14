import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white bg-opacity-95 shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/logo-black.svg" 
            alt="Remake Van Logo" 
            className="h-12"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://i.ibb.co/cQKkqh4/remake-Van-logo.png";
            }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a 
            href="#inicio" 
            className={`font-medium ${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            Inicio
          </a>
          <a 
            href="#proyectos" 
            className={`font-medium ${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            Proyectos
          </a>
          <a 
            href="#nosotros" 
            className={`font-medium ${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            Sobre nosotros
          </a>
          <a 
            href="#contacto" 
            className={`font-medium ${isScrolled ? 'text-gray-900' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            Contacto
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden focus:outline-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white w-full py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-4">
            <a 
              href="#inicio" 
              className="font-medium text-gray-900 hover:text-amber-500 transition-colors"
              onClick={handleLinkClick}
            >
              Inicio
            </a>
            <a 
              href="#proyectos" 
              className="font-medium text-gray-900 hover:text-amber-500 transition-colors"
              onClick={handleLinkClick}
            >
              Proyectos
            </a>
            <a 
              href="#nosotros" 
              className="font-medium text-gray-900 hover:text-amber-500 transition-colors"
              onClick={handleLinkClick}
            >
              Sobre nosotros
            </a>
            <a 
              href="#contacto" 
              className="font-medium text-gray-900 hover:text-amber-500 transition-colors"
              onClick={handleLinkClick}
            >
              Contacto
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
