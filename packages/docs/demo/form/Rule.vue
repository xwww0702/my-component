<script setup lang="ts">
import { reactive, ref } from "vue";
import { MyMessage, type FormInstance } from "@qiwen72/my-component";
const form = reactive({
  name: "",
  age: "",
  like: false,
});
const formRef = ref<FormInstance>();
const rules = reactive({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
});

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      MyMessage.success("submit!");
    }
  });
};
const reset = () => {
  formRef.value?.resetFields();
};
</script>
<template>
  <my-form :model="form" :rules="rules" ref="formRef">
    <my-form-item label="name" prop="name">
      <my-input v-model="form.name"></my-input>
    </my-form-item>
    <my-form-item label="age" prop="age">
      <my-input v-model="form.age" type="textarea"></my-input>
    </my-form-item>
    <my-form-item label="like" prop="like">
      <my-switch v-model="form.like"></my-switch>
    </my-form-item>
    <my-form-item>
      <my-button type="primary" @click="onSubmit">Submit</my-button>
      <my-button type="warning" @click="reset">Reset</my-button>
    </my-form-item>
  </my-form>
</template>
<style></style>
