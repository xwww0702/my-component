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
import useKeyMap from "./useKeyMap";
import { POPPER_OPTIONS, SELECT_CTX_KEY } from "./constants";
import {
  computed,
  ref,
  reactive,
  provide,
  type VNode,
  nextTick,
  watch,
  h,
  onMounted,
} from "vue";
import {
  useId,
  useFocusController,
  useClickOutside,
} from "@my-component/hooks";
import {
  find,
  noop,
  eq,
  filter,
  size,
  each,
  get,
  isFunction,
  map,
  assign,
  isNil,
  isBoolean,
  includes,
  debounce,
} from "lodash-es";

import MyOption from "./Option.vue";
import { MyTooltip } from "../Tooltip";
import { MyInput } from "../Input";
import { MyIcon } from "../Icon";
import { debugWarn, RenderVnode } from "@my-component/utils";

const COMPONENT_NAME = "Select";

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
const filteredChildren = ref<Map<VNode, SelectOptionProps>>(new Map());
const filteredOptions = ref(props.options ?? []);
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
    // const node = children.value[selectStates.highlightedIndex];
    const node = [...filteredChildren.value][
      selectStates.highlightedIndex
    ]?.[0];
    result = filteredChildren.value.get(node);
  } else {
    result = filteredOptions.value[selectStates.highlightedIndex];
  }
  return result;
});

const childrenOptions = computed(() => {
  if (!hasChildren.value) return [];
  return map(children.value, (item) => ({
    vNode: h(item),
    props: assign(item.props, {
      disabled:
        item.props?.disabled === true ||
        (!isNil(item.props?.disabled) && !isBoolean(item.props?.disabled)),
    }),
  }));
});

const hasData = computed(
  () =>
    (hasChildren.value && filteredChildren.value.size > 0) ||
    (!hasChildren.value && size(filteredOptions.value) > 0)
);
const isNoData = computed(() => {
  if (!props.filterable) return false;
  if (!hasData.value) return true;

  return false;
});
const lastIndex = computed(() =>
  hasChildren.value
    ? filteredChildren.value.size - 1
    : size(filteredOptions.value) - 1
);

const timeout = computed(() => (props.remote ? 300 : 100));

const filterPlaceholder = computed(() =>
  props.filterable && selectStates.selectedOption && isDropdownVisible.value
    ? selectStates.selectedOption.label
    : props.placeholder
);

const handleFilterDebounce = debounce(handleFilter, timeout.value);

const inputId = useId().value;
const {
  wrapperRef: inputWrapperRef,
  isFocus,
  handlerBlur,
  handlerFocus,
} = useFocusController(inputRef);
useClickOutside(selectRef, (e) => handleClickOutside(e));
const keyMap = useKeyMap({
  isDropdownVisible,
  controlVisible,
  selectStates,
  highlightedLine,
  handleSelect,
  hasData,
  lastIndex,
});
const focus: SelectInstance["focus"] = function () {
  inputRef.value?.focus();
};
const blur: SelectInstance["blur"] = function () {
  handleClickOutside();
};
function setFilteredChildren(opts: typeof childrenOptions.value) {
  filteredChildren.value.clear();
  each(opts, (item) => {
    filteredChildren.value.set(item.vNode, item.props as SelectOptionProps);
  });
}
function handleKeydown(e: KeyboardEvent) {
  keyMap.has(e.key) && keyMap.get(e.key)?.(e);
}
function handleFilter() {
  const searchKey = selectStates.inputValue;
  selectStates.highlightedIndex = -1;
  if (hasChildren.value) {
    // generateFilterChildren
    generateFilterChildren(searchKey);
    return;
  }
  //genenrateFilterOptions
  genenrateFilterOptions(searchKey);
}

async function generateFilterChildren(search: string) {
  if (!props.filterable) return;
  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    //remote search
    await callRemoteMethod(props.remoteMethod, search);
    //setFilteredChildren()
    setFilteredChildren(childrenOptions.value);
    return;
  }
  if (props.filterMethod && isFunction(props.filterMethod)) {
    //filter search
    const opts = map(props.filterMethod(search), "value");
    setFilteredChildren(
      filter(childrenOptions.value, (item) =>
        includes(opts, get(item, ["props", "value"]))
      )
    );
    return;
  }
  //default search
  setFilteredChildren(
    filter(childrenOptions.value, (item) =>
      includes(get(item, ["props", "value"]), search)
    )
  );
}
async function callRemoteMethod(method: Function, search: string) {
  if (!method || isFunction(method)) return;
  selectStates.loading = true;
  let result;
  try {
    result = await method(search);
  } catch (error) {
    debugWarn(error as Error);
    debugWarn(COMPONENT_NAME, "callRemote Method");
    return Promise.reject(error);
  }
  return result;
}
async function genenrateFilterOptions(search: string) {
  if (!props.filterable) return;
  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    //remote search
    filteredOptions.value = await callRemoteMethod(props.remoteMethod, search);
    return;
  }
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(search);
    return;
  }
  //default search
  filteredOptions.value = filter(props.options, (opt) =>
    includes(opt.label, search)
  );
}
function handleClickOutside(e?: Event) {
  //外部点击
  if (isFocus.value) {
    nextTick(() => handlerBlur(new FocusEvent("focus", e)));
  }
}
function controlVisible(visible: boolean) {
  if (!tooltipRef.value) return;
  get(tooltipRef, ["value", visible ? "show" : "hide"])?.();
  props.filterable && controlInputValue(visible);
  isDropdownVisible.value = visible;
  emits("visible-change", visible);
  selectStates.highlightedIndex = -1;
}
function controlInputValue(visible: boolean) {
  if (!props.filterable) return;
  if (visible) {
    if (selectStates.selectedOption) selectStates.inputValue = "";
    handleFilterDebounce();
    return;
  }
  selectStates.inputValue = selectStates.selectedOption?.value || "";
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
watch(
  () => props.options,
  (newVal) => {
    filteredOptions.value = newVal ?? [];
  }
);
watch(
  () => childrenOptions.value,
  (newVal) => setFilteredChildren(newVal)
);
onMounted(() => {
  setSelected();
});
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
            :placeholder="!filterable ? filterPlaceholder : placeholder"
            :readonly="!filterable || !isDropdownVisible"
            @focus="handlerFocus"
            @blur="handlerBlur"
            @input="handleFilterDebounce"
            @keydown="handleKeydown"
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
        <div class="er-select__nodata" v-else-if="filterable && isNoData">
          No Data
        </div>
        <ul class="er-select__menu">
          <template v-if="!hasChildren">
            <my-option
              v-for="item in filteredOptions"
              :key="item.value"
              v-bind="item"
            />
          </template>
          <template v-else>
            <template
              v-for="[vNode, _props] in filteredChildren"
              :key="_props.value"
            >
              <render-vnode :vNode="vNode"></render-vnode>
            </template>
          </template>
        </ul>
      </template>
    </my-tooltip>
  </div>
</template>
<style>
@import "./style.css";
</style>
