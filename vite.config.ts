import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [nitro(), react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
});
