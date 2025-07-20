<script setup lang="ts">
import { reactive } from "vue";
import { MyMessage } from "@qiwen72/my-component";
const form = reactive({
  name: "",
  age: "",
  like: false,
});
const onSubmit = () => {
  MyMessage({
    message: "Submit Success",
    type: "success",
  });
};
</script>
<template>
  <my-form :model="form">
    <my-form-item label="name">
      <my-input v-model="form.name"></my-input>
    </my-form-item>
    <my-form-item label="age">
      <my-input v-model="form.age" type="textarea"></my-input>
    </my-form-item>
    <my-form-item label="like">
      <my-switch v-model="form.like"></my-switch>
    </my-form-item>
    <my-form-item>
      <my-button type="primary" @click="onSubmit">Submit</my-button>
      <my-button type="warning">Cancel</my-button>
    </my-form-item>
  </my-form>
</template>
<style></style>
