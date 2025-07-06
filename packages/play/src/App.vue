<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, MyConfigProvider } from "@qiwen72/my-component";
import { get } from "lodash-es";

import { computed, ref } from "vue";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
</script>
<template>
  <my-button @click="changelang" type="info" style="margin-right: 20px">change language</my-button>
  <my-config-provider :locale="locale">
    <MyPopConfirm title="Are you shure to delete this item?">
      <my-button>Delete</my-button>
    </MyPopConfirm>
  </my-config-provider>
</template>