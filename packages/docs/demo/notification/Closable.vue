<script setup lang="ts">
import { MyNotification } from "@qiwen72/my-component";
import { h } from "vue";
const open1 = function () {
  MyNotification({
    title: "默认显示关闭按钮",
    message: "hihi",
    type: "success",
  });
};

const open2 = function () {
  MyNotification({
    title: "不显示关闭按钮",
    message: "hihi",
    type: "success",
    showClose: false,
  });
};
</script>
<template>
  <my-button @click="open1">默认显示关闭按钮</my-button>
  <my-button @click="open2">showClose: false</my-button>
</template>
