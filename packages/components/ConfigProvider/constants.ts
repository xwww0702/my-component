import type { configProviderProps } from "./types";
import type { InjectionKey, Ref } from "vue";

export type ConfigProviderContext = Partial<configProviderProps>;

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol();
