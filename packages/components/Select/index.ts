import Select from "./Select.vue";
import Option from "./Option.vue";

import { WithInstall } from "@my-component/utils";

export const MySelect = WithInstall(Select);
export const MyOption = WithInstall(Option);
export * from "./types";
