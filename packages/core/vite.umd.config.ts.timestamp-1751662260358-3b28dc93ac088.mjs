// vite.umd.config.ts
import { defineConfig } from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/vite@5.2.10_@types+node@20.19.1_sass@1.89.2_terser@5.43.1/node_modules/vite/dist/node/index.js";
import { readFileSync } from "fs";
import { resolve } from "path";
import { compression } from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/vite-plugin-compression2@2.2.0_rollup@4.44.1/node_modules/vite-plugin-compression2/dist/index.mjs";
import { delay } from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell2 from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
import vue from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.2.10_@types+node@20.19.1_sass@1.89.2_terser@5.43.1__vue@3.5.17_typescript@5.8.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// hooksPlugin.ts
import { each, isFunction } from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// vite.umd.config.ts
import terser from "file:///Users/lily/Documents/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/MyComponent/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.44.1/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "/Users/lily/Documents/\u524D\u7AEF\u5B66\u4E60/MyComponent/packages/core";
var TRY_MOVE_STYLES_DELAY = 1e3;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function moveStyle() {
  try {
    readFileSync("./dist/umd/index.css.gz");
    shell2.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (e) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}
var vite_umd_config_default = defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i
    }),
    hooksPlugin({
      rmFiles: ["./dist/umd/index.css", "./dist/umd/index.css.gz"],
      afterBuild: moveStyle
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      }
    })
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "MyElement",
      formats: ["umd"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        },
        assetFileNames: (assrtInfo) => {
          if (assrtInfo.name === "style.css") return "index.css";
          return assrtInfo.name;
        }
      }
    }
  }
});
export {
  vite_umd_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS51bWQuY29uZmlnLnRzIiwgImhvb2tzUGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2xpbHkvRG9jdW1lbnRzL1x1NTI0RFx1N0FFRlx1NUI2Nlx1NEU2MC9NeUNvbXBvbmVudC9wYWNrYWdlcy9jb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGlseS9Eb2N1bWVudHMvXHU1MjREXHU3QUVGXHU1QjY2XHU0RTYwL015Q29tcG9uZW50L3BhY2thZ2VzL2NvcmUvdml0ZS51bWQuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saWx5L0RvY3VtZW50cy8lRTUlODklOEQlRTclQUIlQUYlRTUlQUQlQTYlRTQlQjklQTAvTXlDb21wb25lbnQvcGFja2FnZXMvY29yZS92aXRlLnVtZC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXByZXNzaW9uIH0gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMlwiO1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tIFwibG9kYXNoLWVzXCI7XG5cbmltcG9ydCBzaGVsbCBmcm9tIFwic2hlbGxqc1wiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgaG9va3MgZnJvbSBcIi4vaG9va3NQbHVnaW5cIjtcbmltcG9ydCB0ZXJzZXIgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiO1xuY29uc3QgVFJZX01PVkVfU1RZTEVTX0RFTEFZID0gMTAwMDsgLy8gMSBzZWNvbmRcbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIjtcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcbmNvbnN0IGlzVGVzdCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIjtcblxuZnVuY3Rpb24gbW92ZVN0eWxlKCkge1xuICB0cnkge1xuICAgIHJlYWRGaWxlU3luYyhcIi4vZGlzdC91bWQvaW5kZXguY3NzLmd6XCIpOyAvLyBFbnN1cmUgdGhlIGZpbGUgZXhpc3RzXG4gICAgc2hlbGwuY3AoXCIuL2Rpc3QvdW1kL2luZGV4LmNzc1wiLCBcIi4vZGlzdC9pbmRleC5jc3NcIik7IC8vXHU1MTY4XHU5MUNGXHU1RjE1XHU1MTY1XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBkZWxheShtb3ZlU3R5bGUsIFRSWV9NT1ZFX1NUWUxFU19ERUxBWSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBjb21wcmVzc2lvbih7XG4gICAgICBpbmNsdWRlOiAvLihjanN8Y3NzKSQvaSxcbiAgICB9KSxcbiAgICBob29rcyh7XG4gICAgICBybUZpbGVzOiBbXCIuL2Rpc3QvdW1kL2luZGV4LmNzc1wiLCBcIi4vZGlzdC91bWQvaW5kZXguY3NzLmd6XCJdLFxuICAgICAgYWZ0ZXJCdWlsZDogbW92ZVN0eWxlLFxuICAgIH0pLFxuICAgIHRlcnNlcih7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IFtcImxvZ1wiXSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgcGFzc2VzOiAzLFxuICAgICAgICBnbG9iYWxfZGVmczoge1xuICAgICAgICAgIFwiQERFVlwiOiBKU09OLnN0cmluZ2lmeShpc0RldiksXG4gICAgICAgICAgXCJAUFJPRFwiOiBKU09OLnN0cmluZ2lmeShpc1Byb2QpLFxuICAgICAgICAgIFwiQFRFU1RcIjogSlNPTi5zdHJpbmdpZnkoaXNUZXN0KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3QvdW1kXCIsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9pbmRleC50c1wiKSxcbiAgICAgIG5hbWU6IFwiTXlFbGVtZW50XCIsXG4gICAgICBmb3JtYXRzOiBbXCJ1bWRcIl0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1widnVlXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGV4cG9ydHM6IFwibmFtZWRcIixcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogXCJWdWVcIixcbiAgICAgICAgfSxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NydEluZm8pID0+IHtcbiAgICAgICAgICBpZiAoYXNzcnRJbmZvLm5hbWUgPT09IFwic3R5bGUuY3NzXCIpIHJldHVybiBcImluZGV4LmNzc1wiO1xuICAgICAgICAgIHJldHVybiBhc3NydEluZm8ubmFtZSBhcyBzdHJpbmc7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2xpbHkvRG9jdW1lbnRzL1x1NTI0RFx1N0FFRlx1NUI2Nlx1NEU2MC9NeUNvbXBvbmVudC9wYWNrYWdlcy9jb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGlseS9Eb2N1bWVudHMvXHU1MjREXHU3QUVGXHU1QjY2XHU0RTYwL015Q29tcG9uZW50L3BhY2thZ2VzL2NvcmUvaG9va3NQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2xpbHkvRG9jdW1lbnRzLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVBRCVBNiVFNCVCOSVBMC9NeUNvbXBvbmVudC9wYWNrYWdlcy9jb3JlL2hvb2tzUGx1Z2luLnRzXCI7aW1wb3J0IHsgZWFjaCwgaXNGdW5jdGlvbiB9IGZyb20gXCJsb2Rhc2gtZXNcIjtcbmltcG9ydCBzaGVsbCBmcm9tIFwic2hlbGxqc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBob29rc1BsdWdpbih7XG4gIHJtRmlsZXMgPSBbXSxcbiAgYmVmb3JlQnVpbGQsXG4gIGFmdGVyQnVpbGQsXG59OiB7XG4gIHJtRmlsZXM/OiBzdHJpbmdbXTtcbiAgYmVmb3JlQnVpbGQ/OiBGdW5jdGlvbjtcbiAgYWZ0ZXJCdWlsZD86IEZ1bmN0aW9uO1xufSkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiaG9va3MtcGx1Z2luXCIsXG4gICAgYnVpbGRTdGFydCgpIHtcbiAgICAgIGVhY2gocm1GaWxlcywgKGZOYW1lKSA9PiBzaGVsbC5ybShcIi1yZlwiLCBmTmFtZSkpO1xuICAgICAgaXNGdW5jdGlvbihiZWZvcmVCdWlsZCkgJiYgYmVmb3JlQnVpbGQoKTtcbiAgICB9LFxuICAgIGJ1aWxkRW5kKGVycj86IEVycm9yKSB7XG4gICAgICAhZXJyICYmIGlzRnVuY3Rpb24oYWZ0ZXJCdWlsZCkgJiYgYWZ0ZXJCdWlsZCgpO1xuICAgIH0sXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNYLFNBQVMsb0JBQW9CO0FBQ25aLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLGFBQWE7QUFFdEIsT0FBT0EsWUFBVztBQUNsQixPQUFPLFNBQVM7OztBQ1A4VixTQUFTLE1BQU0sa0JBQWtCO0FBQy9ZLE9BQU8sV0FBVztBQUVILFNBQVIsWUFBNkI7QUFBQSxFQUNsQyxVQUFVLENBQUM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUNGLEdBSUc7QUFDRCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQ1gsV0FBSyxTQUFTLENBQUMsVUFBVSxNQUFNLEdBQUcsT0FBTyxLQUFLLENBQUM7QUFDL0MsaUJBQVcsV0FBVyxLQUFLLFlBQVk7QUFBQSxJQUN6QztBQUFBLElBQ0EsU0FBUyxLQUFhO0FBQ3BCLE9BQUMsT0FBTyxXQUFXLFVBQVUsS0FBSyxXQUFXO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBQ0Y7OztBRGJBLE9BQU8sWUFBWTtBQVRuQixJQUFNLG1DQUFtQztBQVV6QyxJQUFNLHdCQUF3QjtBQUM5QixJQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWE7QUFDeEMsSUFBTSxRQUFRLFFBQVEsSUFBSSxhQUFhO0FBQ3ZDLElBQU0sU0FBUyxRQUFRLElBQUksYUFBYTtBQUV4QyxTQUFTLFlBQVk7QUFDbkIsTUFBSTtBQUNGLGlCQUFhLHlCQUF5QjtBQUN0QyxJQUFBQyxPQUFNLEdBQUcsd0JBQXdCLGtCQUFrQjtBQUFBLEVBQ3JELFNBQVMsR0FBRztBQUNWLFVBQU0sV0FBVyxxQkFBcUI7QUFBQSxFQUN4QztBQUNGO0FBQ0EsSUFBTywwQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLElBQ0QsWUFBTTtBQUFBLE1BQ0osU0FBUyxDQUFDLHdCQUF3Qix5QkFBeUI7QUFBQSxNQUMzRCxZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUixjQUFjLENBQUMsS0FBSztBQUFBLFFBQ3BCLGVBQWU7QUFBQSxRQUNmLFFBQVE7QUFBQSxRQUNSLGFBQWE7QUFBQSxVQUNYLFFBQVEsS0FBSyxVQUFVLEtBQUs7QUFBQSxVQUM1QixTQUFTLEtBQUssVUFBVSxNQUFNO0FBQUEsVUFDOUIsU0FBUyxLQUFLLFVBQVUsTUFBTTtBQUFBLFFBQ2hDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDdEMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLEtBQUs7QUFBQSxJQUNqQjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsU0FBUyxZQUFhLFFBQU87QUFDM0MsaUJBQU8sVUFBVTtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsic2hlbGwiLCAic2hlbGwiXQp9Cg==
