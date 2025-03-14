// Project interface
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  alt: string;
}

// Contact form interface
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Testimonial interface
export interface Testimonial {
  id: number;
  name: string;
  project: string;
  quote: string;
  rating: number;
}
