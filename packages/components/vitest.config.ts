// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define: {
    PROD: JSON.stringify(process.env.NODE_ENV === "production"),
    DEV: JSON.stringify(process.env.NODE_ENV === "development"),
    TEST: JSON.stringify(process.env.NODE_ENV === "test"),
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});

// "test": "vitest --coverage"
