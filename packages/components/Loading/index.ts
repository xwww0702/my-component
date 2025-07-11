import { vLoading } from "./directive";
import { Loading } from "./service";
import type { App } from "vue";

export const MyLoading = {
  name: "MyLoading",
  install(app: App) {
    app.directive("loading", vLoading); //挂载全局指令
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};
export default MyLoading;
export {
  vLoading,
  vLoading as MyLoadingDirective,
  Loading as MyLoadingService,
};
export * from "./types";
