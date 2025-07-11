<script setup lang="ts">
import type { configProviderProps } from './types'
import { provideGlobalConfig } from './hooks'
defineOptions({
    name: 'MyConfigProvider'
})
const props = defineProps<configProviderProps>()
const cofig = provideGlobalConfig(props)
</script>

<template>
    <slot name="default" :config="cofig"></slot>
</template>

<style scoped></style>