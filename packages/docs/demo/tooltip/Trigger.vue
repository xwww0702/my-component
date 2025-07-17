<template>
  <div class="wrapper">
    <my-tooltip
      class="my-tooltip"
      placement="top-start"
      content="hover"
      trigger="hover"
    >
      <my-button>hover</my-button>
    </my-tooltip>
    <my-tooltip
      class="my-tooltip"
      placement="top-start"
      content="click"
      trigger="click"
    >
      <my-button>click</my-button>
    </my-tooltip>
    <my-tooltip
      class="my-tooltip"
      placement="top-start"
      content="contextmenu"
      trigger="contextmenu"
    >
      <my-button>contextmenu</my-button>
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
