<script setup lang="ts">
import { isString } from "lodash-es";
import type { LoadingOptions } from "./types";
import { computed, type Ref } from "vue";
import { MyIcon } from "../Icon";
defineOptions({
  name: "MyLoading",
  inheritAttrs: false,
});
const props = defineProps<LoadingOptions>();
const iconName = computed(() => {
  if (isString(props.spinner)) {
    return props.spinner;
  }
  return "spinner";
});
</script>
<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="(props.visible as Ref).value"
      class="er-loading er-loading__mask"
      :class="{ 'is-fullscreen': fullscreen }"
    >
      <div class="er-loading__spinner">
        <my-icon v-if="props.spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="er-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<style>
@import "./style.css";
.er-loading {
  --er-loading-bg-color: v-bind(background) !important;
  --er-loading-z-index: v-bind(zIndex) !important;
}
</style>
