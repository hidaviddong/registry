import { defineConfig } from "nitro";

export default defineConfig({
  serverDir: "./server",
  preset: "cloudflare-module",
  devServer: {
    runner: "node-worker",
  },
});
