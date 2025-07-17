import { defineConfig } from "vite";
import { readFileSync } from "fs";
import { resolve } from "path";
import { compression } from "vite-plugin-compression2";
import { delay } from "lodash-es";

import shell from "shelljs";
import vue from "@vitejs/plugin-vue";
import { hooksPlugin as hooks } from "@qiwen72/vite-plugins";
import terser from "@rollup/plugin-terser";
const TRY_MOVE_STYLES_DELAY = 1000; // 1 second
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyle() {
  try {
    readFileSync("./dist/umd/index.css.gz"); // Ensure the file exists
    shell.cp("./dist/umd/index.css", "./dist/index.css"); //全量引入
  } catch (e) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}
export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooks({
      rmFiles: ["./dist/umd/index.css", "./dist/umd/index.css.gz"],
      afterBuild: moveStyle,
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "MyElement",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assrtInfo) => {
          if (assrtInfo.name === "style.css") return "index.css";
          return assrtInfo.name as string;
        },
      },
    },
  },
});
