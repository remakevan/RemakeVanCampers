import { users, type User, type InsertUser, type VanConfiguration, type InsertVanConfig, vanOptions } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Van configurations
  getVanConfiguration(id: number): Promise<VanConfiguration | undefined>;
  createVanConfiguration(config: InsertVanConfig): Promise<VanConfiguration>;
  getAllVanConfigurations(): Promise<VanConfiguration[]>;
  calculateVanPrice(model: string, size: string, interiorFeatures: string[], materials: string): number;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vanConfigurations: Map<number, VanConfiguration>;
  currentUserId: number;
  currentVanConfigId: number;

  constructor() {
    this.users = new Map();
    this.vanConfigurations = new Map();
    this.currentUserId = 1;
    this.currentVanConfigId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Van configuration methods
  async getVanConfiguration(id: number): Promise<VanConfiguration | undefined> {
    return this.vanConfigurations.get(id);
  }

  async createVanConfiguration(config: InsertVanConfig): Promise<VanConfiguration> {
    const id = this.currentVanConfigId++;
    const vanConfig: VanConfiguration = { ...config, id };
    this.vanConfigurations.set(id, vanConfig);
    return vanConfig;
  }

  async getAllVanConfigurations(): Promise<VanConfiguration[]> {
    return Array.from(this.vanConfigurations.values());
  }

  calculateVanPrice(model: string, size: string, interiorFeatures: string[], materials: string): number {
    // Find the base price for the model
    const selectedModel = vanOptions.models.find(m => m.id === model);
    const basePrice = selectedModel ? selectedModel.basePrice : 0;
    
    // Add size price modifier
    const selectedSize = vanOptions.sizes.find(s => s.id === size);
    const sizeModifier = selectedSize ? selectedSize.priceModifier : 0;
    
    // Calculate interior features total
    let featuresTotal = 0;
    interiorFeatures.forEach(featureId => {
      const feature = vanOptions.interiorFeatures.find(f => f.id === featureId);
      if (feature) {
        featuresTotal += feature.price;
      }
    });
    
    // Add materials price modifier
    const selectedMaterials = vanOptions.materials.find(m => m.id === materials);
    const materialsModifier = selectedMaterials ? selectedMaterials.priceModifier : 0;
    
    // Calculate total
    const totalPrice = basePrice + sizeModifier + featuresTotal + materialsModifier;
    
    return totalPrice;
  }
}

export const storage = new MemStorage();
