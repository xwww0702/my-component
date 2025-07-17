<script setup lang="ts">
import { MyMessageBox, MyMessage } from "@qiwen72/my-component";
import { delay } from "lodash-es";

async function openAlert() {
  try {
    const action = await MyMessageBox({
      title: "My Custom Box",
      message: "hihihi",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      type: "danger",
      icon: "spin",
      beforeClose(action, instance, done) {
        if (action !== "confirm") {
          done();
          return;
        }

        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";
        delay(() => {
          done();
          delay(() => (instance.confirmButtonLoading = false), 1000);
        }, 3000);
      },
    });
    MyMessage.success("success");
  } catch (action) {
    MyMessage.warning(`action:${action}`);
  }
}
</script>

<template>
  <my-button @click="openAlert" plain> click me</my-button>
</template>
