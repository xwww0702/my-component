import ConfigProvider from "./ConfigProvider.vue";
import { WithInstall } from "@my-component/utils";

export const MyConfigProvider = WithInstall(ConfigProvider);
export * from "./types";
export * from "./hooks";
