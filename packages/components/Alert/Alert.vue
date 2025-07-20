<script lang="ts" setup>
import type { AlertProps, AlertEmits, AlertInstance } from './types'
import { computed, ref } from 'vue'
import { typeIconMap } from '@my-component/utils'
import MyIcon from '../Icon/Icon.vue'
defineOptions({
    name: 'MyAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
    effect: "light",
    type: "info",
    closable: true,
})
const emits = defineEmits<AlertEmits>()
const slots = defineSlots()
const visible = ref(true)

function close() {
    visible.value = false
    emits('close')
}
function open() {
    visible.value = true
}
defineExpose<AlertInstance>({
    close,
    open,
})

const iconName = computed(() => typeIconMap.get(props.type) || 'circle-info')
const withDescription = computed(() => slots.description || props.description)
</script>


<template>
    <transition name="er-alert-fade">
        <div v-show="visible" class="er-alert" role="alert" :class="{
            [`er-alert__${type}`]: type,
            [`er-alert__${effect}`]: effect,
            'text-center': center,
        }">
            <my-icon v-if="showIcon" class="er-alert__icon" :class="{ 'big-icon': withDescription }" :icon="iconName" />
            <div class="er-alert__content">
                <span class="er-alert__title" :class="{ 'with-desc': withDescription }"
                    :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
                    <slot name="title">{{ title }}</slot>
                </span>
                <p class="er-alert__description">
                    <slot>{{ description }}</slot>
                </p>
                <div class="er-alert__close" v-if="closable">
                    <my-icon @click.stop="close" icon="xmark" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
@import './style.css';
</style>