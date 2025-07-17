<script setup lang="ts">
import { MyMessageBox } from "@qiwen72/my-component";
import { h } from "vue";
function openAlert() {
  MyMessageBox({
    title: "Message",
    message: h("p", null, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
}
</script>

<template>
  <my-button @click="openAlert" plain> Click to open the Vnode Box</my-button>
</template>
