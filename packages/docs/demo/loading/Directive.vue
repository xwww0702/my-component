<script setup lang="ts">
import { ref } from "vue";
const isLoading = ref(true);
</script>
<template>
  <div class="main" v-loading="isLoading">
    <div class="son">nihao</div>
    <div class="son">hihi</div>
    <div class="son">bonjour</div>
  </div>
</template>
<style scoped>
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
