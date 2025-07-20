<script setup lang="ts">
import { type DropdownItemProps } from "@qiwen72/my-component";

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
      <div class="desc">slot 传入 item</div>
      <my-dropdown>
        <span class="dropdown-link">
          Dropdown List
          <my-icon icon="angle-down" />
        </span>
        <template #dropdown>
          <my-dropdown-item command="1" label="Item 1"></my-dropdown-item>
          <my-dropdown-item command="2" label="Item 2" />
          <my-dropdown-item command="3" disabled>Item 3</my-dropdown-item>
          <my-dropdown-item command="4" divided>Item 4</my-dropdown-item>
        </template>
      </my-dropdown>
    </div>
    <div class="col">
      <div class="desc">通过 props 传入 item</div>
      <my-dropdown :items="items">
        <span class="dropdown-link">
          Dropdown List
          <my-icon icon="angle-down" />
        </span>
      </my-dropdown>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  flex: 1;
}
.desc {
  display: block;
  color: var(--er-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--er-color-primary);
  i {
    margin-left: 8px;
  }
}
</style>
