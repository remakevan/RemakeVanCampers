import { useState, useEffect } from "react";
import logo from "https://raw.githubusercontent.com/user-attachments/assets/main/REMAKEVAN_4500x3375_sin.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-secondary" : "bg-transparent backdrop-blur"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center">
            <img src={logo} alt="Remake Van Logo" className="h-8 md:h-10" />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#hero" className="font-medium text-white hover:text-primary transition-colors">Inicio</a>
            <a href="#about" className="font-medium text-white hover:text-primary transition-colors">Nosotros</a>
            <a href="#services" className="font-medium text-white hover:text-primary transition-colors">Servicios</a>
            <a href="#projects" className="font-medium text-white hover:text-primary transition-colors">Proyectos</a>
            <a href="#contact" className="font-medium bg-primary text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition-colors">Contacto</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none" 
            aria-label="Menu"
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white shadow-lg absolute w-full transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-4 py-5 space-y-4">
          <a 
            href="#hero" 
            className="block font-medium text-secondary hover:text-primary"
            onClick={closeMenu}
          >
            Inicio
          </a>
          <a 
            href="#about" 
            className="block font-medium text-secondary hover:text-primary"
            onClick={closeMenu}
          >
            Nosotros
          </a>
          <a 
            href="#services" 
            className="block font-medium text-secondary hover:text-primary"
            onClick={closeMenu}
          >
            Servicios
          </a>
          <a 
            href="#projects" 
            className="block font-medium text-secondary hover:text-primary"
            onClick={closeMenu}
          >
            Proyectos
          </a>
          <a 
            href="#contact" 
            className="block font-medium text-primary"
            onClick={closeMenu}
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
