import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // The root workspace build sets this to "/deepotsav/" for the shared Vercel deployment.
  base: process.env.APP_BASE_PATH || "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
