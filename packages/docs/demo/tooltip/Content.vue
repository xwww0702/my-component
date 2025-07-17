<template>
  <div class="wrapper">
    <my-tooltip class="my-tooltip" placement="top-start">
      <my-button>Content Slot</my-button>
      <template #content>
        <h3>hihi!</h3>
        <p>This is me</p>
      </template>
    </my-tooltip>
  </div>
</template>

<style>
.wrapper {
  height: 300px;
}
.my-tooltip {
  width: 110px;
  margin-right: 20px;
  margin-top: 20px;
}
</style>
