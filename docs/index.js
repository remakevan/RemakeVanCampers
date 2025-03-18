// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var vanOptions = {
  models: [
    { id: "ducato", name: "Fiat Ducato", basePrice: 8e3 },
    { id: "sprinter", name: "Mercedes Sprinter", basePrice: 1e4 },
    { id: "crafter", name: "Volkswagen Crafter", basePrice: 9500 },
    { id: "master", name: "Renault Master", basePrice: 8500 }
  ],
  sizes: [
    { id: "l1h1", name: "L1H1 (Peque\xF1a)", priceModifier: 0 },
    { id: "l2h2", name: "L2H2 (Mediana)", priceModifier: 1500 },
    { id: "l3h2", name: "L3H2 (Grande)", priceModifier: 3e3 },
    { id: "l3h3", name: "L3H3 (Extra Grande)", priceModifier: 4500 }
  ],
  interiorFeatures: [
    { id: "bed", name: "Cama", price: 600 },
    { id: "kitchen", name: "Cocina", price: 1200 },
    { id: "bathroom", name: "Ba\xF1o", price: 1800 },
    { id: "heater", name: "Calefacci\xF3n", price: 800 },
    { id: "solar", name: "Panel Solar", price: 1e3 },
    { id: "electrical", name: "Sistema El\xE9ctrico", price: 900 },
    { id: "water", name: "Sistema de Agua", price: 700 },
    { id: "storage", name: "Almacenamiento", price: 500 },
    { id: "seating", name: "Asientos Adicionales", price: 1100 },
    { id: "awning", name: "Toldo", price: 600 }
  ],
  materials: [
    { id: "basic", name: "B\xE1sico", priceModifier: 0 },
    { id: "standard", name: "Est\xE1ndar", priceModifier: 1e3 },
    { id: "premium", name: "Premium", priceModifier: 2500 }
  ]
};
var vanConfigSchema = z.object({
  model: z.string(),
  size: z.string(),
  interiorFeatures: z.array(z.string()),
  materials: z.string(),
  contactInfo: z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Email inv\xE1lido"),
    phone: z.string().optional(),
    comments: z.string().optional()
  })
});
var vanConfigurations = pgTable("vanConfigurations", {
  id: serial("id").primaryKey(),
  model: text("model").notNull(),
  size: text("size").notNull(),
  interiorFeatures: text("interiorFeatures").array().notNull(),
  materials: text("materials").notNull(),
  contactInfo: json("contactInfo").notNull(),
  estimatedPrice: integer("estimatedPrice").notNull(),
  createdAt: text("createdAt").notNull()
});
var insertVanConfigSchema = createInsertSchema(vanConfigurations).pick({
  model: true,
  size: true,
  interiorFeatures: true,
  materials: true,
  contactInfo: true,
  estimatedPrice: true,
  createdAt: true
});

// server/storage.ts
var MemStorage = class {
  users;
  vanConfigurations;
  currentUserId;
  currentVanConfigId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.vanConfigurations = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentVanConfigId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Van configuration methods
  async getVanConfiguration(id) {
    return this.vanConfigurations.get(id);
  }
  async createVanConfiguration(config) {
    const id = this.currentVanConfigId++;
    const vanConfig = { ...config, id };
    this.vanConfigurations.set(id, vanConfig);
    return vanConfig;
  }
  async getAllVanConfigurations() {
    return Array.from(this.vanConfigurations.values());
  }
  calculateVanPrice(model, size, interiorFeatures, materials) {
    const selectedModel = vanOptions.models.find((m) => m.id === model);
    const basePrice = selectedModel ? selectedModel.basePrice : 0;
    const selectedSize = vanOptions.sizes.find((s) => s.id === size);
    const sizeModifier = selectedSize ? selectedSize.priceModifier : 0;
    let featuresTotal = 0;
    interiorFeatures.forEach((featureId) => {
      const feature = vanOptions.interiorFeatures.find((f) => f.id === featureId);
      if (feature) {
        featuresTotal += feature.price;
      }
    });
    const selectedMaterials = vanOptions.materials.find((m) => m.id === materials);
    const materialsModifier = selectedMaterials ? selectedMaterials.priceModifier : 0;
    const totalPrice = basePrice + sizeModifier + featuresTotal + materialsModifier;
    return totalPrice;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Por favor complete todos los campos requeridos."
        });
      }
      return res.status(200).json({
        success: true,
        message: "Mensaje recibido correctamente. Nos pondremos en contacto pronto."
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al procesar su solicitud. Por favor, int\xE9ntelo de nuevo m\xE1s tarde."
      });
    }
  });
  app2.get("/api/van-options", async (_req, res) => {
    try {
      return res.status(200).json({
        success: true,
        data: vanOptions
      });
    } catch (error) {
      console.error("Error fetching van options:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al obtener las opciones de configuraci\xF3n. Por favor, int\xE9ntelo de nuevo m\xE1s tarde."
      });
    }
  });
  app2.post("/api/calculate-van-price", async (req, res) => {
    try {
      const { model, size, interiorFeatures, materials } = req.body;
      if (!model || !size || !interiorFeatures || !materials) {
        return res.status(400).json({
          success: false,
          message: "Por favor, proporcione todos los par\xE1metros necesarios."
        });
      }
      const price = storage.calculateVanPrice(model, size, interiorFeatures, materials);
      return res.status(200).json({
        success: true,
        data: { price }
      });
    } catch (error) {
      console.error("Error calculating van price:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al calcular el precio. Por favor, int\xE9ntelo de nuevo m\xE1s tarde."
      });
    }
  });
  app2.post("/api/van-configurations", async (req, res) => {
    try {
      const validationResult = vanConfigSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Datos de configuraci\xF3n inv\xE1lidos.",
          errors: validationResult.error.format()
        });
      }
      const config = validationResult.data;
      const estimatedPrice = storage.calculateVanPrice(
        config.model,
        config.size,
        config.interiorFeatures,
        config.materials
      );
      const savedConfig = await storage.createVanConfiguration({
        ...config,
        estimatedPrice,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      return res.status(201).json({
        success: true,
        data: savedConfig
      });
    } catch (error) {
      console.error("Error saving van configuration:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al guardar su configuraci\xF3n. Por favor, int\xE9ntelo de nuevo m\xE1s tarde."
      });
    }
  });
  app2.get("/api/van-configurations", async (_req, res) => {
    try {
      const configurations = await storage.getAllVanConfigurations();
      return res.status(200).json({
        success: true,
        data: configurations
      });
    } catch (error) {
      console.error("Error fetching van configurations:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al obtener las configuraciones. Por favor, int\xE9ntelo de nuevo m\xE1s tarde."
      });
    }
  });
  app2.get("/api/van-configurations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID de configuraci\xF3n inv\xE1lido."
        });
      }
      const configuration = await storage.getVanConfiguration(id);
      if (!configuration) {
        return res.status(404).json({
          success: false,
          message: "Configuraci\xF3n no encontrada."
        });
      }
      return res.status(200).json({
        success: true,
        data: configuration
      });
    } catch (error) {
      console.error("Error fetching van configuration:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al obtener la configuraci\xF3n. Por favor, int\xE9ntelo de nuevo m\xE1s tarde."
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
