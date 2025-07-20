<script setup lang="ts">
import {
  cloneDeep,
  endsWith,
  filter,
  get,
  includes,
  isArray,
  isNil,
  isNumber,
  isString,
  keys,
  map,
  size,
  some,
} from "lodash-es";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import type {
  FormProps,
  FormContext,
  FormEmits,
  FormInstance,
  FormItemContext,
  FormItemInstance,
  FormItemProps,
  FormItemRule,
  FormValidateFailuer,
  ValidateStatus,
  FormValidateCallback,
} from "./types";
import Schema, { type RuleItem } from "async-validator";
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  ref,
  provide,
  type Ref,
  nextTick,
} from "vue";
import { useId } from "@my-component/hooks";

defineOptions({
  name: "MyFormItem",
});
const props = withDefaults(defineProps<FormItemProps>(), {
  required: void 0,
  showMessage: true,
});
const slots = defineSlots();
const ctx = inject(FORM_CTX_KEY);
const validateStatus: Ref<ValidateStatus> = ref("init");
const errorMsg = ref("");
const inputIds = ref<string[]>([]);
const labelId = useId().value;
//拿到表单项内部的值
const getValByProp = (target: Record<string, any> | void) => {
  if (target && props.prop && !isNil(get(target, props.prop))) {
    return get(target, props.prop);
  }
  return null;
};

const isDisabled = computed(() => ctx?.disabled || props.disabled);
const isRequired = computed(
  () =>
    (!ctx?.hideRequiredAsterisk && some(itemRules.value, "required")) ||
    props?.required
);
const innerVal = computed(() => {
  const model = ctx?.model;
  return getValByProp(model);
});
const porpString = computed(() => {
  if (!props.prop) return "";
  return isString(props.prop) ? props.prop : props.prop.join(".");
});
const itemRules = computed(() => {
  const { required } = props;
  const rules: FormItemRule[] = [];
  if (props.rules) {
    rules.push(...props.rules);
  }
  const formRules = ctx?.rules;
  if (formRules && props.prop) {
    const _rules = getValByProp(formRules);
    if (_rules) {
      rules.push(..._rules);
    }
  }
  if (!isNil(required)) {
    const requiredRules = filter(
      map(rules, (rule, i) => [rule, i]),
      (item: [FormItemRule, number]) => includes(keys(item[0]), "required")
    );

    if (size(requiredRules)) {
      for (const item of requiredRules) {
        const [rule, i] = item as [FormItemRule, number];
        if (rule.required === required) continue;
        rules[i] = { ...rule, required };
      }
    } else {
      rules.push({ required });
    }
  }

  return rules;
});

const hasLabel = computed(() => !!(props.label || slots.label));
const labelFor = computed(
  () => props.for || (inputIds.value.length ? inputIds.value[0] : "")
);
const currentLabel = computed(
  () => `${props.label ?? ""}${ctx?.labelSuffix ?? ""}`
);
const normalizeLabelWidth = computed(() => {
  const _normalizeStyle = (val: number | string) => {
    if (isNumber(val)) return `${val}px`;
    return endsWith(val, "px") ? val : `${val}px`;
  };
  if (props.labelWidth) return _normalizeStyle(props.labelWidth);
  if (ctx?.labelWidth) return _normalizeStyle(ctx?.labelWidth);
  return "150px";
});

let initialVal: any = null;
let isReseting: boolean = false;

function getTriggeredRules(trigger: string) {
  const rules = itemRules.value;
  if (!rules) return [];
  return filter(rules, (r) => {
    if (!r.trigger || !trigger) return true;
    if (isArray(r.trigger)) {
      return r.trigger.includes(trigger);
    }
    return r.trigger === trigger;
  }).map(({ trigger, ...rule }) => rule as RuleItem);
}

async function doValidate(rules: RuleItem[]) {
  const modleName = porpString.value;
  const validator = new Schema({ [modleName]: rules });
  return validator
    .validate({ [modleName]: innerVal.value }, { firstFields: true })
    .then(() => {
      validateStatus.value = "success";
      ctx?.emits("validate", props, true, "");
      return true;
    })
    .catch((err: FormValidateFailuer) => {
      const { errors } = err;
      validateStatus.value = "error";
      errorMsg.value =
        errors && size(errors) > 0 ? errors[0].message ?? "" : "";
      ctx?.emits("validate", props, false, errorMsg.value);
      return Promise.reject(err);
    });
}

const validate: FormItemInstance["validate"] = async function (
  trigger: string,
  callback?: FormValidateCallback
) {
  if (isReseting || !props.prop || isDisabled.value) return false;

  if (!validateStatus.value) {
    callback?.(false);
    return false;
  }

  const rules = getTriggeredRules(trigger);
  if (!size(rules)) {
    callback?.(true);
    return true;
  }

  validateStatus.value = "validating";

  return doValidate(rules)
    .then(() => {
      callback?.(true);
      return true;
    })
    .catch((err: FormValidateFailuer) => {
      const { fields } = err;
      callback?.(false, fields);
      return Promise.reject(fields);
    });
};

const resetField: FormItemContext["resetField"] = function () {
  const model = ctx?.model;
  if (model && porpString.value && !isNil(get(model, porpString.value))) {
    isReseting = true;
    model[porpString.value] = cloneDeep(initialVal);
  }
  nextTick(() => clearValidate());
};

const clearValidate: FormItemInstance["clearValidate"] = function () {
  validateStatus.value = "init";
  errorMsg.value = "";
  isReseting = false;
};

const addInputId: FormItemContext["addInputId"] = function (id) {
  if (!includes(inputIds.value, id)) inputIds.value.push(id);
};
const removeInputId: FormItemContext["removeInputId"] = function (id) {
  inputIds.value = filter(inputIds.value, (i) => i !== id);
};

const formItemCtx: FormItemContext = reactive({
  ...toRefs(props),
  disabled: isDisabled.value,
  validate,
  resetField,
  clearValidate,
  addInputId,
  removeInputId,
});

onMounted(() => {
  if (props.prop) {
    ctx?.addField(formItemCtx);
    initialVal = innerVal.value;
  }
});

onUnmounted(() => {
  if (!props.prop) return;
  ctx?.removeField(formItemCtx);
});

provide<FormItemContext>(FORM_ITEM_CTX_KEY, formItemCtx);

defineExpose<FormItemInstance>({
  validateMessage: errorMsg,
  validateStatus,
  validate,
  resetField,
  clearValidate,
});
</script>

<template>
  <div
    class="er-form-item"
    :class="{
      'is-error': validateStatus === 'error',
      'is-disabled': isDisabled,
      'is-required': isRequired,
      'asterisk-left': ctx?.requiredAsteriskPosition === 'left',
      'asterisk-right': ctx?.requiredAsteriskPosition === 'right',
    }"
  >
    <component
      v-if="hasLabel"
      class="er-form-item__label"
      :class="`position-${ctx?.labelPosition ?? `right`}`"
      :is="labelFor ? 'label' : 'div'"
      :id="labelId"
      :for="labelFor"
    >
      <slot name="label" :label="currentLabel">{{ currentLabel }}</slot>
    </component>
    <div class="er-form-item__content">
      <slot :validate="validate"></slot>
      <div class="er-form-item__error-msg" v-if="validateStatus === 'error'">
        <template v-if="ctx?.showMessage && showMessage">
          <slot name="error" :error="errorMsg">{{ errorMsg }}</slot>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "./style.css";

.er-form-item {
  --er-form-label-width: v-bind(normalizeLabelWidth) !important;
}
</style>
