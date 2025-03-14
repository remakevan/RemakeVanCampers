import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Por favor complete todos los campos requeridos.' 
        });
      }
      
      // In a real application, you would save this data or send an email
      // For now, we'll just return a success response
      
      return res.status(200).json({ 
        success: true, 
        message: 'Mensaje recibido correctamente. Nos pondremos en contacto pronto.' 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Hubo un error al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
