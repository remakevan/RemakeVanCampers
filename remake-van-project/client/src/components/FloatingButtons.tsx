import { useEffect, useState } from "react";

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll event to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle back to top button click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Back to Top Button */}
      <button
        id="back-to-top"
        className={`fixed bottom-8 right-8 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-600 transition-all duration-300 z-30 ${
          showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/34600123456"
        className="fixed bottom-8 left-8 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-30"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>
    </>
  );
}
