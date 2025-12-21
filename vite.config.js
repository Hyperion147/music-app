<<<<<<< HEAD
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

=======
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
>>>>>>> 6f57040 (firebase context ,)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // This matches any request starting with /api
      "/api": {
        target: "https://saavn.sumit.co",
        changeOrigin: true,
        // Optional: keeps the /api prefix or removes it based on what the API expects
        // If the API URL is https://saavn.sumit.co/api/..., leave this out.
        // If the API URL is https://saavn.sumit.co/songs/..., keep this rewrite:
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
