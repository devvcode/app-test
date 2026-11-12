import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // The root monorepo build injects this app's deployment path.
  base: process.env.APP_BASE_PATH || "/",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true }
});
