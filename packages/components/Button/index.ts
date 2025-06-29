import Button from "./Button.vue";
import { WithInstall } from "@my-component/utils";
import ButtonGroup from "./ButtonGroup.vue";
export const MyButton = WithInstall(Button);
export const MyButtonGroup = WithInstall(ButtonGroup);
export * from "./types";
