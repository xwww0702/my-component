<script setup>
function handleBtnClick() {
  console.log("btn click");
}
</script>

<template>
  <p>
    <my-button @click="handleBtnClick"> with throttle</my-button>
    <my-button :use-throttle="false" @click="handleBtnClick">without throttle</my-button>
  </p>
</template>
