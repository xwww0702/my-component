import type { App, Plugin } from "vue";
import { each } from "lodash-es";
import {
  provideGlobalConfig,
  type configProviderProps,
} from "@my-component/components";
export function makeInstaller(componets: Plugin[]) {
  const installer = (app: App, opts?: configProviderProps) => {
    each(componets, (c) => app.use(c));
    if (opts) provideGlobalConfig(opts, app, true);
  };

  return installer as Plugin;
}

export default makeInstaller;
