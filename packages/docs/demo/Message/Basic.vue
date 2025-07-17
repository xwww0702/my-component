<script lang="ts" setup>
import { h } from "vue";
import { MyMessage } from "@qiwen72/my-component";

const open = () => {
  MyMessage("This is a message.");
};

const openVn = () => {
  MyMessage({
    message: h("p", { style: "line-height: 1; font-size: 14px" }, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
};

const openInsert = () => {
  MyMessage({
    message: "hihi",
    type: "success",
  });
};

const openFn = () => {
  MyMessage.success("hihihihi");
};
</script>

<template>
  <my-button :plain="true" @click="open">string</my-button>
  <my-button :plain="true" @click="openVn">VNode</my-button>
  <my-button :plain="true" @click="openInsert">插件式调用</my-button>
  <my-button :plain="true" @click="openFn">函数式调用</my-button>
  <my-button :plain="true" @click="$message.success('hihihi')"
    >全局方法调用</my-button
  >
</template>
