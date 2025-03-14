import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { vanConfigSchema, vanOptions } from "@shared/schema";
import { z } from "zod";

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

  // Get van configurator options
  app.get('/api/van-options', async (_req, res) => {
    try {
      return res.status(200).json({ 
        success: true, 
        data: vanOptions 
      });
    } catch (error) {
      console.error('Error fetching van options:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Hubo un error al obtener las opciones de configuración. Por favor, inténtelo de nuevo más tarde.' 
      });
    }
  });

  // Calculate van price
  app.post('/api/calculate-van-price', async (req, res) => {
    try {
      const { model, size, interiorFeatures, materials } = req.body;
      
      // Basic validation
      if (!model || !size || !interiorFeatures || !materials) {
        return res.status(400).json({
          success: false,
          message: 'Por favor, proporcione todos los parámetros necesarios.'
        });
      }

      // Calculate price
      const price = storage.calculateVanPrice(model, size, interiorFeatures, materials);
      
      return res.status(200).json({
        success: true,
        data: { price }
      });
    } catch (error) {
      console.error('Error calculating van price:', error);
      return res.status(500).json({
        success: false, 
        message: 'Hubo un error al calcular el precio. Por favor, inténtelo de nuevo más tarde.'
      });
    }
  });

  // Submit van configuration
  app.post('/api/van-configurations', async (req, res) => {
    try {
      // Validate request body
      const validationResult = vanConfigSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: 'Datos de configuración inválidos.',
          errors: validationResult.error.format()
        });
      }
      
      const config = validationResult.data;
      
      // Calculate price
      const estimatedPrice = storage.calculateVanPrice(
        config.model, 
        config.size, 
        config.interiorFeatures, 
        config.materials
      );
      
      // Save configuration
      const savedConfig = await storage.createVanConfiguration({
        ...config,
        estimatedPrice,
        createdAt: new Date().toISOString(),
      });
      
      return res.status(201).json({
        success: true,
        data: savedConfig
      });
    } catch (error) {
      console.error('Error saving van configuration:', error);
      return res.status(500).json({
        success: false,
        message: 'Hubo un error al guardar su configuración. Por favor, inténtelo de nuevo más tarde.'
      });
    }
  });

  // Get all van configurations
  app.get('/api/van-configurations', async (_req, res) => {
    try {
      const configurations = await storage.getAllVanConfigurations();
      
      return res.status(200).json({
        success: true,
        data: configurations
      });
    } catch (error) {
      console.error('Error fetching van configurations:', error);
      return res.status(500).json({
        success: false,
        message: 'Hubo un error al obtener las configuraciones. Por favor, inténtelo de nuevo más tarde.'
      });
    }
  });

  // Get a specific van configuration
  app.get('/api/van-configurations/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de configuración inválido.'
        });
      }
      
      const configuration = await storage.getVanConfiguration(id);
      
      if (!configuration) {
        return res.status(404).json({
          success: false,
          message: 'Configuración no encontrada.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: configuration
      });
    } catch (error) {
      console.error('Error fetching van configuration:', error);
      return res.status(500).json({
        success: false,
        message: 'Hubo un error al obtener la configuración. Por favor, inténtelo de nuevo más tarde.'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
