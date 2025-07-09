<script setup lang="ts">
import { MyMessageBox, MyMessage } from "@qiwen72/my-component";

function openConfirm() {
  MyMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    { type: "warning" }
  )
    .then((action) => {
      MyMessage.info(`action: ${action}`);
    })
    .catch((action) => {
      MyMessage.warning(`action: ${action}`);
    });
}
</script>

<template>
  <my-button @click="openConfirm" plain> Click to open the Confirm</my-button>
</template>
