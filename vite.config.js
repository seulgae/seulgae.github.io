import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    rolldownOptions: {
      input: {
        site: "index.html",
        admin: "admin/index.html",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    exclude: ["node_modules", "dist", "build", "src/old/**"],
  },
});
