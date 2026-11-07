import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // In the monorepo build this becomes "/shopping-cart/". For standalone use it remains "/".
  base: process.env.APP_BASE_PATH || "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
