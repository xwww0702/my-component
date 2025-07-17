import Form from "./Form.vue";
import FormItem from "./FormItem.vue";
import { WithInstall } from "@my-component/utils";

export const MyForm = WithInstall(Form);
export const MyFormItem = WithInstall(FormItem);

export * from "./types";
export * from "./hooks";
