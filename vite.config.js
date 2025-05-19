import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["room.svg"],
      manifest: {
        name: "room",
        short_name: "room",
        description: "room reservation system",
        theme_color: "#191919",
        icons: [
          {
            src: "room-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "room-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "room-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
