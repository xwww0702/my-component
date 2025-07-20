<script setup lang="ts">
import { MyMessageBox, MyMessage } from "@qiwen72/my-component";

function openAlert() {
  MyMessageBox.alert("This is a message", "Title")
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
    { type: "warning", showClose: false }
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
  <my-button @click="openAlert" plain> showClose true</my-button>
  <my-button @click="openConfirm" plain>showClose false</my-button>
</template>
