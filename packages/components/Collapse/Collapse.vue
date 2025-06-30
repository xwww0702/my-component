<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from "./types";
import { COLLAPSE_CTX_KEY } from "./constants";
import { debugWarn } from "../../utils/error";
import { provide, ref, watch, watchEffect } from "vue";

defineOptions({
    name: "MyCollapse",
})
const COMP_NAME = "MyCollapse" as const
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref(props.modelValue);

if (props.accordion && activeNames.value.length > 1) {
    console.warn("Accordion mode only allows one active item.");
}

function handleItemClick(item: CollapseItemName) {
    let _activeNames = [...activeNames.value];
    if (props.accordion) {
        _activeNames = [_activeNames[0] === item ? "" : item];
        updateActiveNames(_activeNames);
        return
    } else {
        const index = _activeNames.indexOf(item);
        if (index > -1) {
            _activeNames.splice(index, 1);
        } else {
            _activeNames.push(item);
        }
        updateActiveNames(_activeNames);
    }
}
function updateActiveNames(newNames: CollapseItemName[]) {
    activeNames.value = newNames;
    emits("update:modelValue", newNames);
    emits("change", newNames);
}
watch(
    () => props.modelValue,
    (newValue) => {
        updateActiveNames(newValue);
    }
);
watchEffect(() => {
    if (props.accordion && activeNames.value.length > 1) {
        updateActiveNames([activeNames.value[0]]);
        debugWarn(COMP_NAME, "Accordion mode only allows one active item.")
    }
});
provide(COLLAPSE_CTX_KEY, {
    activeNames,
    handleItemClick,
});
</script>

<template>
    <div class="er-collapse">
        <slot></slot>
    </div>
</template>

<style scoped>
@import './style.css'
</style>