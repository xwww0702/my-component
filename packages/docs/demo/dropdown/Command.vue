<script setup lang="ts">
import {
  type DropdownItemProps,
  type DropdownCommand,
  MyMessage,
} from "@qiwen72/my-component";

const items: DropdownItemProps[] = [
  { command: "1", label: "Item 1" },
  { command: "2", label: "Item 2" },
  { command: "3", label: "Item 3", disabled: true },
  { command: "4", label: "Item 4", divided: true },
];

function handleClick(command: DropdownCommand) {
  MyMessage.success("click on item " + command);
}
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="desc">command</div>
      <my-dropdown :items="items" @command="handleClick">
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
