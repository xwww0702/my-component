<script setup lang="ts">
import {
  type DropdownItemProps,
  type DropdownInstance,
} from "@qiwen72/my-component";
import { ref } from "vue";

const _myDropDown = ref<DropdownInstance>();
const items: DropdownItemProps[] = [
  { command: "1", label: "Item 1" },
  { command: "2", label: "Item 2" },
  { command: "3", label: "Item 3", disabled: true },
  { command: "4", label: "Item 4", divided: true },
];
</script>

<template>
  <div class="row">
    <div class="col">
      <my-button @click="() => _myDropDown?.open()">Open</my-button>
      <my-button @click="() => _myDropDown?.close()">Close</my-button>
      <div class="desc">command</div>
      <my-dropdown :items="items" ref="_myDropDown">
        <div class="trigger">
          <span>command</span>
        </div>
      </my-dropdown>
    </div>
  </div>
</template>

<style>
.row {
  margin-right: 5px;
  display: flex;
  flex-wrap: wrap;
}
.col {
  flex: 1;
}
.desc {
  margin-bottom: 10px;
  color: var(--er-text-color-secondary);
}
.trigger {
  display: flex;
  span {
    align-items: center;
    color: var(--er-color-primary);
  }
}
</style>
