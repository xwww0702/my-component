<script lang="ts" setup>
import type {
  SelectProps,
  SelectEmits,
  SelectContext,
  SelectInstance,
  SelectStates,
  SelectOptionProps,
} from "./types";
import type { TooltipInstance } from "../Tooltip";
import type { InputInstance } from "../Input";

import { POPPER_OPTIONS, SELECT_CTX_KEY } from "./constants";
import {
  computed,
  ref,
  reactive,
  provide,
  type VNode,
  nextTick,
  watch,
} from "vue";
import {
  useId,
  useFocusController,
  useClickOutside,
} from "@my-component/hooks";
import { find, noop, eq, filter, size, each, get, isFunction } from "lodash-es";

import MyOption from "./Option.vue";
import { MyTooltip } from "../Tooltip";
import { MyInput } from "../Input";
import { MyIcon } from "../Icon";
defineOptions({
  name: "MySelect",
});
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});
const emits = defineEmits<SelectEmits>();
const slots = defineSlots();

const selectRef = ref<HTMLElement>();
const tooltipRef = ref<TooltipInstance>();
const inputRef = ref<InputInstance>();

const isDropdownVisible = ref(false);

const initialOption = findOption(props.modelValue);

const selectStates = reactive<SelectStates>({
  highlightedIndex: -1,
  inputValue: initialOption?.label ?? "",
  loading: false,
  mouseHover: false,
  selectedOption: initialOption,
});

const isDisabled = computed(() => props.disabled);
const children = computed(() =>
  filter(slots.default?.(), (child) => eq(child.type, MyOption))
);
const hasChildren = computed(() => size(children.value) > 0);
const showClear = computed(
  () =>
    props.clearable && selectStates.mouseHover && selectStates.inputValue !== ""
);
const highlightedLine = computed(() => {
  let result: SelectOptionProps | void;
  if (hasChildren.value) {
    const node = children.value[selectStates.highlightedIndex];
    result = node?.props?.value;
  } else {
    result = props.options[selectStates.highlightedIndex];
  }
});

const inputId = useId().value;
const {
  wrapperRef: inputWrapperRef,
  isFocus,
  handlerBlur,
  handlerFocus,
} = useFocusController(inputRef);
useClickOutside(selectRef, (e) => handleClickOutside(e));
const focus: SelectInstance["focus"] = function () {
  inputRef.value?.focus();
};
const blur: SelectInstance["blur"] = function () {
  handleClickOutside();
};
function handleClickOutside(e?: Event) {
  //外部点击
  if (isFocus.value) {
    nextTick(() => handlerBlur(new FocusEvent("focus", e)));
  }
}
function controlVisible(visible: boolean) {
  if (!tooltipRef.value) return;
  get(tooltipRef, ["value", visible ? "show" : "hide"])?.();
  isDropdownVisible.value = visible;
  emits("visible-change", visible);
  selectStates.highlightedIndex = -1;
}
function handleClear() {
  inputRef.value?.clear();
  selectStates.inputValue = "";
  selectStates.selectedOption = null;

  emits("clear");
  each(["change", "update:modelValue"], (k) => emits(k as any, ""));
  //form Item clear 的逻辑
}
function toggleVisible() {
  if (isDisabled.value) return;
  controlVisible(!isDropdownVisible.value);
}
function findOption(value: string) {
  return find(props.options, (opt) => opt.value === value);
}
function renderLabel(opt: SelectOptionProps): VNode | string {
  if (isFunction(props.renderLabel)) {
    return props.renderLabel(opt);
  }
  return opt.label;
}
function handleSelect(opt: SelectOptionProps) {
  if (opt.disabled) return;
  selectStates.inputValue = opt.label;
  selectStates.selectedOption = opt;
  each(["change", "update:modelValue"], (k) => emits(k as any, opt.value));
  controlVisible(false);
  inputRef.value?.focus();
}
function setSelected() {
  const opt = findOption(props.modelValue);
  if (!opt) return;
  selectStates.inputValue = opt.label;
  selectStates.selectedOption = opt;
}
watch(
  () => props.modelValue,
  (val) => {
    //表单校验
    setSelected();
  }
);
provide<SelectContext>(SELECT_CTX_KEY, {
  handleSelect,
  selectStates,
  renderLabel,
  highlightedLine,
});

defineExpose({
  blur,
  focus,
});
</script>

<template>
  <div
    ref="selectRef"
    class="er-select"
    :class="{
      'is-disabled': isDisabled,
    }"
    @click.stop="toggleVisible"
    @mouseenter="selectStates.mouseHover = true"
    @mouseleave="selectStates.mouseHover = false"
  >
    <my-tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popper-options="POPPER_OPTIONS"
      @click-outside="controlVisible(false)"
      manual
    >
      <template #default>
        <div ref="inputWrapperRef">
          <my-input
            ref="inputRef"
            v-model="selectStates.inputValue"
            :id="inputId"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :readonly="!filterable || !isDropdownVisible"
            @focus="handlerFocus"
            @blur="handlerBlur"
          >
            <template #suffix>
              <my-icon
                v-if="showClear"
                icon="circle-xmark"
                class="er-input__clear"
                @click.stop="handleClear"
                @mousedown.prevent="noop"
              />
              <my-icon
                v-else
                class="header-angle"
                icon="angle-down"
                :class="{ 'is-active': isDropdownVisible }"
              />
            </template>
          </my-input>
        </div>
      </template>
      <template #content>
        <div class="er-select__loading" v-if="selectStates.loading">
          <my-icon icon="spinner" spin />
        </div>
        <ul class="er-select__menu">
          <template v-if="!hasChildren">
            <my-option
              v-for="item in options"
              :key="item.value"
              v-bind="item"
            />
          </template>
          <template v-else>
            <slot></slot>
          </template>
        </ul>
      </template>
    </my-tooltip>
  </div>
</template>
<style>
@import "./style.css";
</style>
