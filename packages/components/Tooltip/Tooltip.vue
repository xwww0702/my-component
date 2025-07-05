<script setup lang="ts">
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types'
import { ref, type Ref, computed, watchEffect, watch, onUnmounted } from 'vue'
import { debounce, isNil, type DebouncedFunc, bind } from 'lodash-es'
import { createPopper, type Instance } from '@popperjs/core'
import { useClickOutside } from '@my-component/hooks'
import useEvenstToTiggerNode from './useEventToTriggerNode'
interface _TooltipProps extends TooltipProps {
    virtualRef?: HTMLElement | null
    virtualTriggering?: boolean
}

defineOptions({
    name: "MyTooltip"
})
const props = withDefaults(defineProps<_TooltipProps>(), {
    trigger: "hover",
    placement: "bottom",
    content: "",
    transition: 'fade',
    showTimeout: 0,
    hideTimeout: 200,
})
const emits = defineEmits<TooltipEmits>()

const visible = ref(false)
const events: Ref<Record<string, EventListener>> = ref({})
const outerEvents: Ref<Record<string, EventListener>> = ref({})
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})

const containerNode = ref<HTMLElement | null>(null)
const _triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
const triggerNode = computed(() => {
    if (props.virtualTriggering) {
        return (
            (props.virtualRef as HTMLElement) ?? _triggerNode.value
        )
    }
    return _triggerNode.value as HTMLElement
})


const properOptions = computed(() => ({
    placement: props.placement,
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 9],
            },
        }
    ],
    ...props.popperOptions
}))
const openDelay = computed(() => {
    if (props.trigger === 'hover') {
        return props.showTimeout
    } else if (props.trigger === 'click') {
        return 0
    }
    return 0
})
const closeDelay = computed(() => {
    if (props.trigger === 'hover') {
        return props.hideTimeout
    } else if (props.trigger === 'click') {
        return 0
    }
    return 0
})
let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

function openFinal() {
    closeDebounce?.cancel()
    openDebounce?.()
}
function closeFinal() {
    openDebounce?.cancel()
    closeDebounce?.()

}
function togglePopper() {
    if (visible.value) {
        closeFinal()
    } else {
        openFinal()
    }
}
function attachEvents() {
    if (props.disabled || props.manual) return
    if (props.trigger === "hover") {
        events.value['mouseenter'] = openFinal
        outerEvents.value['mouseleave'] = closeFinal
        dropdownEvents.value['mouseenter'] = openFinal
        return
    }
    if (props.trigger === "click") {
        events.value['click'] = togglePopper
        return

    }
    if (props.trigger === 'contextmenu') {
        events.value['contextmenu'] = (e) => {
            e.preventDefault()
            openFinal()
        }
        return
    }
}
function setVisible(val: boolean) {
    if (props.disabled) return
    visible.value = val
    emits('visible-change', val)
}
let popperInstance: Instance | null = null
function destroyPopperInstance() {
    if (isNil(popperInstance)) return
    popperInstance.destroy()
    popperInstance = null
}
function resetEvents() {
    events.value = {}
    outerEvents.value = {}
    dropdownEvents.value = {}

    attachEvents()
}
const show: TooltipInstance['show'] = openFinal
const hide: TooltipInstance['hide'] = function () {
    openDebounce?.cancel()
    setVisible(false)
}
watch(visible, (val) => {
    if (!val) return
    if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, properOptions.value)
    }
}, { flush: 'post' })
watch(() => props.manual, (isManual) => {
    if (isManual) {
        resetEvents()
        return
    }
    attachEvents()
})
watch(() => props.trigger, (val, oldVal) => {
    if (val === oldVal) return
    openDebounce?.cancel()
    visible.value = false
    emits('visible-change', false)
    resetEvents()
})
watchEffect(() => {
    if (!props.manual) {
        attachEvents()
    }
    openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
    closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

useClickOutside(containerNode, () => {
    emits('click-outside')
    if (props.trigger === 'hover' || props.manual) return
    visible.value && closeFinal()
})
useEvenstToTiggerNode(props, triggerNode, events, () => {
    openDebounce?.cancel()
    setVisible(false)
})
onUnmounted(() => {
    destroyPopperInstance()
    openDebounce?.cancel()
    closeDebounce?.cancel()
})

defineExpose<TooltipInstance>({
    show,
    hide
})
</script>

<template>
    <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
        <div class="er-tooltip__trigger" ref="_triggerNode" v-on="events" v-if="!virtualTriggering">
            <slot></slot>
        </div>
        <slot name="default" v-else></slot>

        <transition :name="transition" @after-leave="destroyPopperInstance">
            <div class="er-tooltip__popper" ref="popperNode" v-on="dropdownEvents" v-if="visible">
                <slot name="content">
                    {{ content }}
                </slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import './style.css'
</style>