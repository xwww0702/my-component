<script lang="ts" setup>
import { reactive, ref } from "vue";
import { MyMessage, type FormInstance } from "@qiwen72/my-component";

const formRef = ref<FormInstance>();
const form = reactive({
  name: "",
  region: "",
  delivery: false,
  desc: "",
});

const options = ref([
  { value: "beijing", label: "Zone One" },
  { value: "shanghai", label: "Zone Two" },
]);

const rules = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
});

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    console.log(valid);
    if (valid) {
      MyMessage.success("submit!");
    } else {
      MyMessage.danger("Error!");
    }
  });
};

const onReset = () => {
  formRef.value?.resetFields();
};
</script>

<template>
  <my-form ref="formRef" :model="form" :rules="rules">
    <my-form-item label="Activity name" prop="name">
      <my-input v-model="form.name" />
    </my-form-item>
    <my-form-item label="Activity zone" prop="region">
      <my-select
        v-model="form.region"
        placeholder="please select your zone"
        :options="options"
      />
    </my-form-item>
    <my-form-item label="Instant delivery" prop="delivery">
      <my-switch v-model="form.delivery" />
    </my-form-item>
    <my-form-item label="Activity form" prop="desc">
      <my-input v-model="form.desc" type="textarea" />
    </my-form-item>
    <my-form-item>
      <my-button type="primary" @click="onSubmit">Create</my-button>
      <my-button @click="onReset">Reset</my-button>
    </my-form-item>
  </my-form>
</template>
