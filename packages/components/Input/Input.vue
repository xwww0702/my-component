<script setup lang="ts">
import type { InputProps, InputEmits, InputInstance } from "./types";
import { ref, computed, watch, useAttrs, shallowRef, nextTick } from "vue";
import { useFocusController, useId } from "@my-component/hooks";
import Icon from "../Icon/Icon.vue";
import { noop, each } from "lodash-es";
import { useFormItem, useFormItemInputId, useFormDisabled } from "../Form";
import { debugWarn } from "@my-component/utils";
defineOptions({
  name: "MyInput",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const emit = defineEmits<InputEmits>();
const innerValue = ref(props.modelValue);
const pwdVisivble = ref(false);

const inputRef = shallowRef<HTMLInputElement>();
const textareaRef = shallowRef<HTMLTextAreaElement>();

const _ref = computed(() => inputRef.value || textareaRef.value);
// const isDisabled = computed(() => props.disabled);
const isDisabled = useFormDisabled();
const attrs = useAttrs();
const { formItem } = useFormItem();
const { inputId } = useFormItemInputId(props, formItem);

const showClear = computed(
  () =>
    props.clearable && !!innerValue.value && !isDisabled.value && isFocus.value
);
const showPwdArea = computed(
  () =>
    props.type === "password" &&
    !isDisabled.value &&
    props.showPassword &&
    !!innerValue.value
);

const { wrapperRef, isFocus, handlerBlur, handlerFocus } = useFocusController(
  _ref,
  {
    afterBlur() {
      //form校验
      formItem?.validate("blur").catch((err) => debugWarn(err));
    },
  }
);

const clear: InputInstance["clear"] = function () {
  innerValue.value = "";
  each(["input", "change", "update:modelValue"], (e) => emit(e as any, ""));
  emit("clear");
  //清空表单校验
  formItem?.clearValidate();
};
const focus: InputInstance["focus"] = async function () {
  await nextTick();
  _ref.value?.focus();
};
const blur: InputInstance["blur"] = async function () {
  _ref.value?.blur();
};
const select: InputInstance["select"] = async function () {
  _ref.value?.select();
};
function handleInput() {
  emit("input", innerValue.value);
  emit("update:modelValue", innerValue.value);
}

function handleChange() {
  emit("change", innerValue.value);
}

function togglePwdVisible() {
  pwdVisivble.value = !pwdVisivble.value;
}

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
    //表单验证
    formItem?.validate("change").catch((err) => debugWarn(err));
  }
);
defineExpose<InputInstance>({
  ref: _ref,
  focus,
  blur,
  select,
  clear,
});
</script>

<template>
  <div
    class="er-input"
    :class="{
      [`er-input--${type}`]: type,
      [`er-input--${size}`]: size,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="er-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="er-input__wrapper" ref="wrapperRef">
        <span v-if="$slots.prefix" class="er-input__prefix">
          <slot name="prefix"></slot>
        </span>

        <input
          class="er-input__inner"
          ref="inputRef"
          :id="inputId"
          :type="showPassword ? (pwdVisivble ? 'text' : 'password') : type"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          v-bind="attrs"
          @input="handleInput"
          @change="handleChange"
          @focus="handlerFocus"
          @blur="handlerBlur"
        />
        <span
          v-if="$slots.suffix || showClear || showPwdArea"
          class="er-input__suffix"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="er-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          ></Icon>
          <Icon
            icon="eye"
            class="er-input__password"
            v-if="showPwdArea && pwdVisivble"
            @click="togglePwdVisible"
          ></Icon>
          <Icon
            icon="eye-slash"
            class="er-input__password"
            v-if="showPwdArea && !pwdVisivble"
            @click="togglePwdVisible"
          ></Icon>
        </span>
      </div>
      <div v-if="$slots.append" class="er-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        class="er-textarea__wrapper"
        ref="textareaRef"
        :disabled="isDisabled"
        :id="inputId"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handlerFocus"
        @blur="handlerBlur"
      ></textarea>
    </template>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
