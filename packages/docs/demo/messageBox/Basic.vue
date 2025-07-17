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
    { type: "warning" }
  )
    .then((action) => {
      MyMessage.info(`action: ${action}`);
    })
    .catch((action) => {
      MyMessage.warning(`action: ${action}`);
    });
}

function openPrompt() {
  MyMessageBox.prompt("请输入你的年龄", "Tip", { type: "info" })
    .then((value) => {
      MyMessage.info(`你的年龄: ${value}`);
    })
    .catch((action) => {
      MyMessage.warning(`action: ${action}`);
    });
}
</script>

<template>
  <my-button @click="openAlert" plain> Click to open the Alert</my-button>
  <my-button @click="openConfirm" plain> Click to open the Confirm</my-button>
  <my-button @click="openPrompt" plain> Click to open the Prompt</my-button>
</template>
