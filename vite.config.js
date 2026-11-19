import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postMetaPlugin from "./scripts/postMetaPlugin.js";

export default defineConfig({
  plugins: [postMetaPlugin(), react()],
  build: {
    outDir: "build",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    exclude: ["node_modules", "dist", "build"],
  },
});
