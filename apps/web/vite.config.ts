import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT as string) : 3000,
    hmr: true,
  },
  build: {
    outDir: "dist",
    ssr: true,
    rollupOptions: {
      input: {
        client: resolve(__dirname, "index.html"),
      },
    },
  },
  ssr: {
    noExternal: ["react", "react-dom"],
  },
});
