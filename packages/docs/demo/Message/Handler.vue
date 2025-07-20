<script lang="ts" setup>
import { MyMessage } from "@qiwen72/my-component";

const openFn1 = () => {
  MyMessage.success({
    message: "hihihih center",
    showClose: true,
    center: true,
  });
};
</script>

<template>
  <my-button type="primary" @click="$message.closeAll()">close All</my-button>
  <my-button :plain="true" @click="openFn1">center</my-button>
</template>
