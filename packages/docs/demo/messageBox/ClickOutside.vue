<script setup lang="ts">
import { MyMessageBox, MyMessage } from "@qiwen72/my-component";

function openAlert() {
  MyMessageBox.confirm("This is a message", "Title", {
    type: "warning",
    closeOnClickModal: false,
  })
    .then((action) => {
      MyMessage.info(`action: ${action}`);
    })
    .catch((action) => {
      MyMessage.warning(`action: ${action}`);
    });
}

function openConfirm() {
  MyMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    { type: "warning", closeOnClickModal: true }
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
  <my-button @click="openAlert" plain> closeOnClickModal false</my-button>
  <my-button @click="openConfirm" plain>closeOnClickModal true</my-button>
</template>
