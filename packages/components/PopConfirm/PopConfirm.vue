<script setup lang="ts">
import { ref, computed } from 'vue'
import { addUnit } from '@my-component/utils'
import type { PopconfirmEmits, PopconfirmProps } from './types'
import type { TooltipInstance } from '../Tooltip'
import MyTooltip from '../Tooltip/Tooltip.vue'
import MyIcon from '../Icon/Icon.vue'
import MyButton from '../Button/Button.vue'
defineOptions({
    name: 'MyPopConfirm'
})
const props = withDefaults(defineProps<PopconfirmProps>(), {
    title: "",
    confirmButtonType: "primary",
    icon: "question-circle",
    iconColor: "#f90",
    hideAfter: 200,
    width: 150,
    cancelButtonText: 'cancel',
    confirmButtonText: 'confirm'
})
const tooltipRef = ref<TooltipInstance>()
const style = computed(() => ({ width: addUnit(props.width) }))
const emits = defineEmits<PopconfirmEmits>()

function hidePopper() {
    tooltipRef.value?.hide()
}

function confirm(e: MouseEvent) {
    emits('confirm', e)
    hidePopper()
}

function cancel(e: MouseEvent) {
    emits('cancel', e)
    hidePopper()
}
</script>

<template>
    <my-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
        <template #content>
            <div class="er-popconfirm" :style="style">
                <div class="er-popconfirm__main">
                    <my-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor">
                    </my-icon>
                    {{ title }}
                </div>
                <div class="er-popconfirm__action">
                    <my-button class="er-popconfirm__cancel" size="small" :type="cancelButtonType" @click="cancel">
                        {{ cancelButtonText }}
                    </my-button>
                    <my-button class="er-popconfirm__confirm" size="small" :type="confirmButtonType" @click="confirm">
                        {{ confirmButtonText }}
                    </my-button>
                </div>
            </div>
        </template>
        <template v-if="$slots.default" #default>
            <slot name="default"></slot>
        </template>
        <template v-if="$slots.reference" #default>
            <slot name="reference"></slot>
        </template>
    </my-tooltip>
</template>

<style scoped>
@import "./style.css"
</style>