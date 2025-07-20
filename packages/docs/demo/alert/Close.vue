<script setup>
import { MyMessage } from "@qiwen72/my-component";

function handleClose() {
  MyMessage.info("close callback");
}
</script>
<template>
  <div class="basic block">
    <my-alert title="Unclosable alert" type="success" :closable="false" />
    <my-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
