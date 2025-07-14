<script setup lang="ts">
import type { SwitchEmits, SwitchInstance, SwitchProps } from "./types";
import { watch, computed, ref, onMounted } from "vue";
import { debugWarn } from "@my-component/utils";
import { useId } from "@my-component/hooks";
import { useFormDisabled, useFormItem, useFormItemInputId } from "../Form";
defineOptions({
  name: "MySwitch",
  inheritAttrs: false,
});

const emits = defineEmits<SwitchEmits>();
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
// const isDisabled = computed(() => props.disabled);
const isDisabled = useFormDisabled();
const innerValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement>();
const checked = computed(() => innerValue.value === props.activeValue);
// const inputId = useId().value;
const { formItem } = useFormItem();
const { inputId } = useFormItemInputId(props, formItem);
const focus: SwitchInstance["focus"] = () => {
  inputRef.value?.focus();
};
const handleChange = () => {
  if (isDisabled.value) return;
  const newVal = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newVal;
  emits("update:modelValue", newVal);
  emits("change", newVal);
};

onMounted(() => {
  inputRef.value!.checked = checked.value;
});
watch(checked, (val) => {
  inputRef.value!.checked = val;
  //form校验
  formItem?.validate("checked").catch((err) => debugWarn(err));
});
defineExpose<SwitchInstance>({
  checked,
  focus,
});
</script>
<template>
  <div
    class="er-switch"
    :class="{
      [`er-switch--${size}`]: size,
      'is-disabled': isDisabled,
      'is-checked': checked,
    }"
    @click="handleChange"
  >
    <input
      class="er-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :id="inputId"
      :name="name"
      :disabled="isDisabled"
      :checked="checked"
      @keydown.enter="handleChange"
    />
    <div class="er-switch__core">
      <div class="er-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="er-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="er-switch__core-action"></div>
    </div>
  </div>
</template>
<style>
@import "./style.css";
</style>
