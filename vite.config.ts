import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);const isProduction = process.env.NODE_ENV === "production";

const basePath = isProduction ? "/assets/" : "/";
export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
  ],
  build: {
    outDir: "docs",
  }
});

