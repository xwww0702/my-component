<script setup lang="ts">
import { MyPopConfirm, MyButton } from '@qiwen72/my-component';
function confirm() {
  console.log('confirm');
}
function cancel() {
  console.log('cancel');
}
</script>

<template>
  <MyPopConfirm title="querenshanchuma" @confirm="confirm" @cancel="cancel">
    <my-button type="primary" size="small">test</my-button>
  </MyPopConfirm>
</template>

<style scoped></style>
