// This file would contain any data or API functions for the application
import { Project } from "./types";

// Example project data fetching function
export const getProjects = (): Promise<Project[]> => {
  // In a real application, this would be an API call
  // For now, we're returning a Promise with the static data
  return Promise.resolve([
    {
      id: 1,
      title: "Proyecto Nómada",
      description: "Diseño compacto para parejas aventureras",
      category: "interiores",
      image: "https://images.unsplash.com/photo-1612284532331-a99bb4aa2609?q=80&w=1932&auto=format&fit=crop",
      alt: "Interior de furgoneta camperizada"
    },
    {
      id: 2,
      title: "Proyecto Libertad",
      description: "Furgoneta 4x4 para terrenos difíciles",
      category: "exteriores",
      image: "https://images.unsplash.com/photo-1616190419596-e65cef84851d?q=80&w=1974&auto=format&fit=crop",
      alt: "Exterior de furgoneta camperizada"
    },
    // Additional projects would be here
  ]);
};

// Contact form submission function
export const submitContactForm = async (data: any): Promise<{ success: boolean }> => {
  // In a real application, this would send the data to a server
  // For now, we're simulating a successful submission
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
};
