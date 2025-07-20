<script lang="ts" setup>
import { MyMessage } from "@qiwen72/my-component";

const openFn1 = () => {
  MyMessage.success("hihihihi");
};
const openFn2 = () => {
  MyMessage.warning("hihihihi");
};
const openFn3 = () => {
  MyMessage.error("hihihihi");
};
const openFn4 = () => {
  MyMessage.info("hihihihi");
};
</script>

<template>
  <my-button :plain="true" @click="openFn1">success</my-button>
  <my-button :plain="true" @click="openFn2">warning</my-button>
  <my-button :plain="true" @click="openFn3">error</my-button>
  <my-button :plain="true" @click="openFn4">info</my-button>
</template>
