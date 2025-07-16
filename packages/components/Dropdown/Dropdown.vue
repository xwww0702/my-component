<script setup lang="ts">
import type {
  DropdownProps,
  DropdownEmits,
  DropdownContext,
  DropdownItemProps,
  DropdownInstance,
} from "./types";
import { useDisabledStyle } from "@my-component/hooks";
import type { TooltipInstance } from "../Tooltip/types";
import { computed, ref, provide } from "vue";
import { omit } from "lodash-es";
import { type ButtonInstance, MyButtonGroup, MyButton } from "../Button/index";
import { isNil } from "lodash-es";
import { DROPDOWN_CTX_KEY } from "./constants";
import DropdownItem from "./DropdownItem.vue";
import MyTooltip from "../Tooltip/Tooltip.vue";
defineOptions({
  name: "MyDropdown",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
});

const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();

const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();

// const virtualRef = computed(() => triggerRef.value?.ref ?? void 0)
const tooltipProps = computed(() => {
  return omit(props, [
    "items",
    "hide",
    "type",
    "size",
    "splitButton",
    "hideAfterClick",
  ]);
});
function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emits("command", e.command);
}
!TEST && useDisabledStyle(); //条件编译

provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});
defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
});
</script>

<template>
  <div class="er-dropdown" :class="{ 'is-disabled': props.disabled }">
    <my-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <my-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
      >
        <my-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </my-button>
        <my-button icon="angle-down" ref="triggerRef"></my-button>
      </my-button-group>
      <slot name="default" v-else></slot>
      <template #content>
        <div class="er-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <dropdown-item v-bind="item" />
            </template>
          </slot>
        </div>
      </template>
    </my-tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";

:deep(.er-button-group) {
  & > :last-child {
    padding: 5px;
  }
}
</style>
