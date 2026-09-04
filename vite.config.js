import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Both dev server and preview serve index.html for any unknown path
  // so React Router handles all /projects/:slug routes correctly.
  server:  { historyApiFallback: true },
  preview: { historyApiFallback: true },
});
