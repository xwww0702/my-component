import { defineConfig } from "vite";
import { resolve } from "path";
import { readdirSync, readdir } from "fs";
import { map, filter, delay, defer } from "lodash-es";

import dts from "vite-plugin-dts";
import shell from "shelljs";
import hooks from "./hooksPlugin";
import terser from "@rollup/plugin-terser";
import vue from "@vitejs/plugin-vue";

const TRY_MOVE_STYLES_DELAY = 1000; // 1 second
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

// function moveStyle() {
//   try {
//     readdirSync("./dist/es/theme"); // Ensure the file exists
//     shell.mv("./dist/es/theme", "./dist"); //全量引入
//   } catch (e) {
//     delay(moveStyle, TRY_MOVE_STYLES_DELAY);
//   }
// }

function moveStyle() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyle, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    hooks({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyle,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false, // 压缩代码
    cssCodeSplit: true, // 分离css
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "MyElement",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (assrtInfo) => {
          if (assrtInfo.name === "style.css") return "index.css";
          if (
            assrtInfo.type === "asset" &&
            /\.(css)$/i.test(assrtInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assrtInfo.name as string;
        },
        //分包
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";

          if (id.includes("/packages/hook")) return "hooks";

          if (
            id.includes("/packages/utils") ||
            id.includes("plugin-vue:export-helper")
          )
            return "utils";
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${item}`)) return item;
          }
        },
      },
    },
  },
});
