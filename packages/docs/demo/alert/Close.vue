<script setup>
import { ErMessage } from "eric-ui";

function handleClose() {
  ErMessage.info("close callback");
}
</script>
<template>
  <div class="basic block">
    <my-alert title="Unclosable alert" type="success" :closable="false" />
    <my-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
