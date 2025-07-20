<script setup lang="ts">
import { MyNotification } from "@qiwen72/my-component";
import { h } from "vue";
const open1 = function () {
  MyNotification({
    title: "Title",
    message: "hihi",
  });
};

const open2 = function () {
  MyNotification({
    title: "vNode",
    message: h("h1", "hihi我是h1 "),
  });
};
</script>
<template>
  <my-button @click="open1">Click-me</my-button>
  <my-button @click="open2">Click-me-Vnode</my-button>
  <my-button @click="$Notification.success('hihi')">$Notification</my-button>
</template>
