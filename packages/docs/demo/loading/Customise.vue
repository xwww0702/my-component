<script setup lang="ts">
import { ref } from "vue";
const isLoading = ref(true);
</script>
<template>
  <div
    class="main"
    v-loading.lock="isLoading"
    er-loading-spinner="circle-notch"
  >
    <div class="son">nihao</div>
    <div class="son">hihi</div>
    <div class="son">bonjour</div>
  </div>
  <div class="main" v-loading.lock="isLoading" style="margin-top: 10px">
    <div class="son">nihao</div>
    <div class="son">hihi</div>
    <div class="son">bonjour</div>
  </div>
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
