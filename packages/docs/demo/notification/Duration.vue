<script setup lang="ts">
import { MyNotification } from "@qiwen72/my-component";
import { h } from "vue";
const open1 = function () {
  MyNotification({
    title: "不关闭",
    message: "hihi",
    type: "success",
    duration: 0,
  });
};

const open2 = function () {
  MyNotification({
    title: "500",
    message: "hihi",
    type: "success",
    duration: 500,
  });
};
</script>
<template>
  <my-button @click="open1">Duration 0 不自动关闭</my-button>
  <my-button @click="open2">Duration 500</my-button>
</template>
