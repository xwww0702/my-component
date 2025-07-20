<template>
  <div class="wrapper">
    <my-tooltip class="my-tooltip" placement="top" content="no" disabled>
      <my-button>Disabled</my-button>
    </my-tooltip>
    <my-tooltip class="my-tooltip" placement="top-start" content="no diabled">
      <my-button>Disabled</my-button>
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
