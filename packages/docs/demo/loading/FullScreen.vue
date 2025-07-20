<script setup lang="ts">
import { ref } from "vue";
import { MyLoading } from "@qiwen72/my-component";
const isLoading = ref(false);

const fullScreen = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};

const createFullscreen = () => {
  const myLoading = MyLoading.service({
    lock: true,
    spinner: "circle-notch",
  });
  setTimeout(() => {
    myLoading.close();
  }, 2000);
};
</script>
<template>
  <div class="main" v-loading.fullscreen.lock="isLoading">
    <div class="son">nihao</div>
    <div class="son">hihi</div>
    <div class="son">bonjour</div>
  </div>
  <my-button @click="fullScreen">directive Fullscreen</my-button>
  <my-button @click="createFullscreen">service Fullscreen</my-button>
</template>
<style>
.main {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  height: 400px;
  align-items: center;
}
.son {
  flex: 1;
  height: 100px;
}
</style>
