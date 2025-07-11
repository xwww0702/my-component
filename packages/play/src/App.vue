<script setup>
import { ref } from "vue";
const options = ref([
  { value: "1", label: "1111" },
  { value: "2", label: "2111" },
]);
const value = ref("");
</script>

<template>
  <my-select v-model="value" :options="options" clearable></my-select>
  <div>{{ value }}</div>
</template>
