<script setup lang="ts">
import { each, filter, includes, indexOf, size } from "lodash-es";
import type {
  FormProps,
  FormContext,
  FormEmits,
  FormInstance,
  FormItemContext,
  FormItemInstance,
  FormItemProps,
  FormItemRule,
} from "./types";
import { FORM_CTX_KEY } from "./constants";
import { reactive, toRefs, provide } from "vue";
import type { ValidateFieldsError } from "async-validator";
defineOptions({
  name: "MyForm",
});
const props = withDefaults(defineProps<FormProps>(), {
  showMessage: true,
  hideRequiredAsterisk: false,
  requiredAsteriskPosition: "left",
  labelPosition: "right",
});
const emits = defineEmits<FormEmits>();
const fileds: FormItemContext[] = [];

async function doValidateField(fileds: FormItemContext[] = []) {
  let validateErrors: ValidateFieldsError = {};
  for (const field of fileds) {
    try {
      await field.validate("");
    } catch (error) {
      validateErrors = {
        ...validateErrors,
        ...(error as ValidateFieldsError),
      };
    }
  }
  if (!size(Object.keys(validateErrors))) return true;
  return Promise.reject(validateErrors);
}

const addField: FormContext["addField"] = function (filed) {
  if (!filed.prop) return;
  fileds.push(filed);
};

const removeField: FormContext["removeField"] = function (filed) {
  if (!filed.prop) return;
  fileds.splice(fileds.indexOf(filed), 1);
};

const validate: FormInstance["validate"] = function (callback) {
  return validateField([], callback); //空数组为校验所有的
};

const validateField: FormInstance["validateField"] = async function (
  keys,
  callback
) {
  //   const filterArr = size(keys)
  //     ? filter(fileds, (field) => includes(keys, field.prop))
  //     : fileds; //空数组为校验所有的
  try {
    const result = await doValidateField(filterFields(fileds, keys ?? []));
    if (result === true) {
      callback?.(result);
    }
    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    const invalidFields = error as ValidateFieldsError;
    callback?.(false, invalidFields);
    return Promise.reject(invalidFields);
  }
};

const resetFields: FormInstance["resetFields"] = function (keys) {
  each(filterFields(fileds, keys ?? []), (field) => field.resetField());
};

const clearValidate: FormInstance["clearValidate"] = function (keys) {
  each(filterFields(fileds, keys ?? []), (field) => field.clearValidate());
};

function filterFields(fields: FormItemContext[], keys: string[]) {
  return size(keys)
    ? filter(fields, (filter) => includes(keys, filter.prop))
    : fields;
}

const formCtx: FormContext = reactive({
  ...toRefs(props),
  emits,
  addField,
  removeField,
});
provide<FormContext>(FORM_CTX_KEY, formCtx);

defineExpose<FormInstance>({
  validate,
  validateField,
  resetFields,
  clearValidate,
});
</script>
<template>
  <form class="er-form">
    <slot></slot>
  </form>
</template>
<style scoped>
@import "./style.css";
</style>
