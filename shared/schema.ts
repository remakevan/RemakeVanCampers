import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Van Configurator Schema
export const vanOptions = {
  models: [
    { id: "ducato", name: "Fiat Ducato", basePrice: 8000 },
    { id: "sprinter", name: "Mercedes Sprinter", basePrice: 10000 },
    { id: "crafter", name: "Volkswagen Crafter", basePrice: 9500 },
    { id: "master", name: "Renault Master", basePrice: 8500 },
  ],
  sizes: [
    { id: "l1h1", name: "L1H1 (Pequeña)", priceModifier: 0 },
    { id: "l2h2", name: "L2H2 (Mediana)", priceModifier: 1500 },
    { id: "l3h2", name: "L3H2 (Grande)", priceModifier: 3000 },
    { id: "l3h3", name: "L3H3 (Extra Grande)", priceModifier: 4500 },
  ],
  interiorFeatures: [
    { id: "bed", name: "Cama", price: 600 },
    { id: "kitchen", name: "Cocina", price: 1200 },
    { id: "bathroom", name: "Baño", price: 1800 },
    { id: "heater", name: "Calefacción", price: 800 },
    { id: "solar", name: "Panel Solar", price: 1000 },
    { id: "electrical", name: "Sistema Eléctrico", price: 900 },
    { id: "water", name: "Sistema de Agua", price: 700 },
    { id: "storage", name: "Almacenamiento", price: 500 },
    { id: "seating", name: "Asientos Adicionales", price: 1100 },
    { id: "awning", name: "Toldo", price: 600 },
  ],
  materials: [
    { id: "basic", name: "Básico", priceModifier: 0 },
    { id: "standard", name: "Estándar", priceModifier: 1000 },
    { id: "premium", name: "Premium", priceModifier: 2500 },
  ]
};

export const vanConfigSchema = z.object({
  model: z.string(),
  size: z.string(),
  interiorFeatures: z.array(z.string()),
  materials: z.string(),
  contactInfo: z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    comments: z.string().optional(),
  })
});

export type VanConfigType = z.infer<typeof vanConfigSchema>;

export const vanConfigurations = pgTable("vanConfigurations", {
  id: serial("id").primaryKey(),
  model: text("model").notNull(),
  size: text("size").notNull(),
  interiorFeatures: text("interiorFeatures").array().notNull(),
  materials: text("materials").notNull(),
  contactInfo: json("contactInfo").notNull(),
  estimatedPrice: integer("estimatedPrice").notNull(),
  createdAt: text("createdAt").notNull(),
});

export const insertVanConfigSchema = createInsertSchema(vanConfigurations).pick({
  model: true,
  size: true,
  interiorFeatures: true,
  materials: true,
  contactInfo: true,
  estimatedPrice: true,
  createdAt: true,
});

export type InsertVanConfig = z.infer<typeof insertVanConfigSchema>;
export type VanConfiguration = typeof vanConfigurations.$inferSelect;
