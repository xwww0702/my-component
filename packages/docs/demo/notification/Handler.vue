<script setup lang="ts">
import { MyNotification } from "@qiwen72/my-component";
import { h } from "vue";
const open1 = function () {
  MyNotification({
    title: "offset: 20",
    message: "hihi",
    type: "success",
    position: "top-right",
  });
};

const open2 = function () {
  MyNotification({
    title: "offset: 40",
    message: "hihi",
    type: "success",
    position: "top-left",
  });
};
const open3 = function () {
  MyNotification({
    title: "offset: 40",
    message: "hihi",
    type: "success",
    position: "bottom-right",
  });
};
const open4 = function () {
  MyNotification({
    title: "offset: 40",
    message: "hihi",
    type: "success",
    position: "bottom-left",
  });
};
</script>
<template>
  <my-button @click="open1">top-right</my-button>
  <my-button @click="open2">top-left</my-button>
  <my-button @click="open3">bottom-right</my-button>
  <my-button @click="open4">bottom-left</my-button>
  <my-button @click="$Notification.closeAll()">Close All</my-button>
</template>
