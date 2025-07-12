<script setup>
import { ref } from "vue";
const options = ref([
  { value: "1", label: "1111" },
  { value: "2", label: "2111" },
  { value: "3", label: "3111", disabled: true },
  { value: "4", label: "4111" },
]);
const value = ref("");
</script>

<template>
  <my-select v-model="value" clearable filterable>
    <my-option value="111ss" label="111"></my-option>
  </my-select>
</template>
