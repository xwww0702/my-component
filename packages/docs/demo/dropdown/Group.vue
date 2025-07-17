<script setup lang="ts">
import { type DropdownItemProps, MyMessage } from "@qiwen72/my-component";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];

function handleClick() {
  MyMessage.info("button click");
}
</script>

<template>
  <div class="row">
    <my-dropdown :items="items">
      <my-button type="primary">
        Dropdown List
        <my-icon icon="angle-down" style="margin-left: 8px" />
      </my-button>
    </my-dropdown>
    <my-dropdown
      :items="items"
      type="primary"
      @click="handleClick"
      split-button
    >
      Dropdown List
    </my-dropdown>
  </div>
</template>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>
