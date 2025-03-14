import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Project } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxGalleryProps {
  projects: Project[];
  currentProject: Project;
  setCurrentProject: Dispatch<SetStateAction<Project | null>>;
  onClose: () => void;
}

export default function LightboxGallery({
  projects,
  currentProject,
  setCurrentProject,
  onClose
}: LightboxGalleryProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Disable scrolling when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Find current project index
  const currentIndex = projects.findIndex(p => p.id === currentProject.id);

  // Navigation functions
  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentProject(projects[prevIndex]);
    setIsLoading(true);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    setCurrentProject(projects[nextIndex]);
    setIsLoading(true);
  };

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentProject]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white hover:text-amber-500 transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

      {/* Previous button */}
      <button
        className="absolute left-4 md:left-8 text-white hover:text-amber-500 transition-colors"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <i className="fas fa-chevron-left text-3xl"></i>
      </button>

      {/* Main content */}
      <div className="max-w-4xl w-full">
        <Card className="bg-white rounded-lg overflow-hidden">
          <CardContent className="p-0">
            {isLoading && (
              <div className="w-full h-[50vh] md:h-[70vh] flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500"></div>
              </div>
            )}
            <img
              src={currentProject.image}
              alt={currentProject.alt}
              className={`w-full h-auto max-h-[70vh] object-contain ${isLoading ? 'hidden' : 'block'}`}
              onLoad={handleImageLoad}
            />
          </CardContent>
        </Card>
        
        <div className="bg-white p-6 rounded-b-lg mt-1">
          <h2 className="text-2xl font-bold mb-2">{currentProject.title}</h2>
          <p className="text-gray-600 mb-4">{currentProject.description}</p>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onClose}
              className="hover:bg-amber-50"
            >
              Cerrar
            </Button>
            <Button
              onClick={() => window.location.href = "#contacto"}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Solicitar presupuesto
            </Button>
          </div>
        </div>
      </div>

      {/* Next button */}
      <button
        className="absolute right-4 md:right-8 text-white hover:text-amber-500 transition-colors"
        onClick={goToNext}
        aria-label="Next image"
      >
        <i className="fas fa-chevron-right text-3xl"></i>
      </button>
    </div>
  );
}
