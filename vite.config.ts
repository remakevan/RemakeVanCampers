import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "client", // Asegúrate de que apunta a la carpeta correcta
  build: {
    outDir: "dist", // Debe coincidir con el lugar donde se genera index.html
  },
  plugins: [react()],
});
