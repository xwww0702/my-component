<script setup lang="ts">
import { computed, reactive, ref, watch, nextTick, type Ref } from "vue";
import type { MessageBoxProps, MessageBoxAction } from "./types";
import { useId, useZIndex } from "@my-component/hooks";
import { typeIconMap } from "@my-component/utils";
import MyOverlay from "../Overlay/Overlay.vue";
import { MyIcon } from "../Icon";
import { MyButton } from "../Button";
import { MyInput, type InputInstance } from "../Input";
import { isFunction, isNil } from "lodash-es";
defineOptions({
  name: "MyMessageBox",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: "primary",
  roundButton: false,
  boxType: "",
  inputValue: "",
  inputPlaceholder: "Please input...",
  confirmButtonText: "Ok",
  cancelButtonText: "Cancel",
  showConfirmButton: true,
});

const { doAction } = props;
const { nextZIndex } = useZIndex();
const headerRef = ref<HTMLElement>();
const inputRef = ref<InputInstance>();
const inputId = useId();

const state = reactive({
  ...props,
  zIndex: nextZIndex(),
});

const hasMessage = computed(() => !!state.message);
const iconComponent = computed(
  () => state.icon ?? typeIconMap.get(state.type ?? "")
);
// prompt 打开时聚焦
watch(
  () => props.visible?.value,
  (val) => {
    if (val) state.zIndex = nextZIndex();
    if (props.boxType !== "prompt") return;
    if (!val) return;
    nextTick(() => {
      inputRef.value && inputRef.value.focus();
    });
  }
);

function handleWrapperClick() {
  props.closeOnClickModal && handleAction("close");
}
function handleInputEnter(e: KeyboardEvent) {
  if (state.inputType === "textarea") return;
  e.preventDefault();
  return handleAction("confirm");
}
function handleAction(action: MessageBoxAction) {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue);
}
function handleClose() {
  handleAction("close");
}
</script>
<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <my-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="er-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'er-message-box',
            {
              'is-center': state.center,
            },
          ]"
          @click.stop
        >
          <div
            v-if="!isNil(state.title)"
            ref="headerRef"
            class="er-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="er-message-box__title">
              <my-icon
                v-if="iconComponent && state.center"
                :class="{
                  [`er-icon-${state.type}`]: state.type,
                }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <button
              v-if="showClose"
              class="er-message-box__header-btn"
              @click.stop="handleClose"
            >
              <my-icon icon="xmark" />
            </button>
          </div>
          <div class="er-message-box__content">
            <my-icon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{
                [`er-icon-${state.type}`]: state.type,
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="er-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="er-message-box__input">
            <my-input
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="er-message-box__footer">
            <my-button
              v-if="state.showCancelButton"
              class="er-message-box__footer-btn er-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ state.cancelButtonText }}</my-button
            >
            <my-button
              v-show="state.showConfirmButton"
              class="er-message-box__footer-btn er-message-box__confirm-btn"
              :type="state.confirmButtonType ?? 'primary'"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ state.confirmButtonText }}</my-button
            >
          </div>
        </div>
      </div>
    </my-overlay>
  </transition>
</template>
<style scoped>
@import "./style.css";
</style>
