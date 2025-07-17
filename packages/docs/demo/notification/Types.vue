<script setup lang="ts">
import { MyNotification } from "@qiwen72/my-component";
import { h } from "vue";
const open1 = function () {
  MyNotification({
    title: "success",
    message: "hihi",
    type: "success",
  });
};

const open2 = function () {
  MyNotification({
    title: "warning",
    message: "hihi",
    type: "warning",
  });
};

const open3 = function () {
  MyNotification({
    title: "info",
    message: "hihi",
    type: "info",
  });
};

const open4 = function () {
  MyNotification({
    title: "error",
    message: "hihi",
    type: "error",
  });
};
</script>
<template>
  <my-button @click="open1">Success</my-button>
  <my-button @click="open2">Warning</my-button>
  <my-button @click="open3">info</my-button>
  <my-button @click="open4">error</my-button>
</template>
