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
    // 한 테스트 안에서 lazy 라우트를 여러 번 오가므로 asyncUtilTimeout(4초)보다 넉넉하게 둡니다.
    testTimeout: 15000,
    exclude: ["node_modules", "dist", "build"],
  },
});
