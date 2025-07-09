<script setup lang="ts">
import { reactive } from "vue";
const form = reactive({
  name: "",
  desc: "",
});
</script>

<template>
  <my-input v-model="form.name" show-password type="password" />
</template>
