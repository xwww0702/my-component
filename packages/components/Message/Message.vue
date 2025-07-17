<script setup lang="ts">
import type { MessageProps, MessageCompInstance } from './types'
import { computed, onMounted, ref, watch } from 'vue'
import { delay, bind } from 'lodash-es'
import { useOffset, useEventListener } from '@my-component/hooks'
import { getLastBottomOffset } from './methods'
import { typeIconMap, RenderVnode } from '@my-component/utils'
import { MyIcon } from '../Icon'
import { addUnit } from '@my-component/utils'
defineOptions({ name: "MyMessage" })
const props = withDefaults(defineProps<MessageProps>(), {
    type: "info",
    duration: 3000,
    offset: 10,
    transitionName: 'fade-up'
})

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info")

const customStyle = computed(() => ({
    top: addUnit(topOffset.value),
    zIndex: props.zIndex
}))

const boxHeight = ref(0) //高度

const { topOffset, bottomOffset } = useOffset({
    boxHeight,
    offset: props.offset,
    getLastBottomOffset: bind(getLastBottomOffset, props)
})


let timer: number
function startTimmer() {
    if (props.duration === 0) return //不会自动关闭
    timer = delay(close, props.duration)

}
function clearTimer() {
    clearTimeout(timer)
}

function close() {
    visible.value = false
}
watch(visible, (val) => {
    if (!val) boxHeight.value = -props.offset //使退出的动画更加流畅
})
useEventListener(document, 'keydown', (e: Event) => {
    const { code } = e as KeyboardEvent
    if (code === 'Escape') close()
})
onMounted(() => {
    visible.value = true
    startTimmer()
})
defineExpose<MessageCompInstance>({
    close,
    bottomOffset
})
</script>

<template>
    <Transition :name="transitionName" @enter="boxHeight = messageRef!.getBoundingClientRect().height"
        @after-leave="!visible && onDestory()">
        <div ref="messageRef" class="er-message" :class="{
            [`er-message--${type}`]: type,
            'is-close': showClose,
            'text-center': center,
        }" :style="customStyle" v-show="visible" role="alert" @mouseenter="clearTimer" @mouseleave="startTimmer">
            <my-icon class="er-message__icon" :icon="iconName" />
            <div class="er-message__content">
                <slot>
                    <render-vnode v-if="message" :vNode="message" />
                </slot>
            </div>
            <div class="er-message__close" v-if="showClose">
                <my-icon icon="xmark" @click.stop="close" />
            </div>
        </div>
    </Transition>
</template>

<style>
@import './style.css';
</style>