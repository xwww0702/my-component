<script setup lang="ts">
import { MyNotification } from "@qiwen72/my-component";
import { h } from "vue";
const open1 = function () {
  MyNotification({
    title: "offset: 20",
    message: "hihi",
    type: "success",
    offset: 20,
  });
};

const open2 = function () {
  MyNotification({
    title: "offset: 40",
    message: "hihi",
    type: "success",
    offset: 40,
  });
};
</script>
<template>
  <my-button @click="open1">offset: 20</my-button>
  <my-button @click="open2">offset: 40</my-button>
</template>
