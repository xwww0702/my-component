<script setup lang="ts">
import type { DropdownItemProps } from "@qiwen72/my-component";

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
      <my-dropdown :items="items" disabled>
        <div class="trigger">
          <span>Disabled</span>
        </div>
      </my-dropdown>
    </div>
    <div class="col">
      <my-dropdown :items="items">
        <div class="trigger">
          <span>can use</span>
        </div>
      </my-dropdown>
    </div>
  </div>
</template>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  flex: 1;
}
.trigger {
  display: flex;
  span {
    align-items: center;
  }
}
</style>
