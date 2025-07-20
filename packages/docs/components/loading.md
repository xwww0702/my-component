---
title: Loading
description: Loading 组件文档

next:
  link: /components/form
  text: messageBox

prev:
  link: /components/messageBox
  text: messageBox
---

# Loading 加载

常用的 Loading

## 指令式用法

指令式 Loading.

::: preview
demo-preview=../demo/loading/Directive.vue
:::

## 全屏展示

可以设置 fullscreen，就是全屏展示，lock 可以锁定页面的滚动

::: preview
demo-preview=../demo/loading/FullScreen.vue
:::

## 自定义加载图标样式

使用 ` er-loading-spinner`属性来设置 icon

::: preview
demo-preview=../demo/loading/Customise.vue
:::

## Loading API

### Props

| Name       | Description        | Type          | Default       |
| ---------- | ------------------ | ------------- | ------------- |
| target     | 遮罩绑定的目标元素 | `HTMLElement` | document.body |
| fullscreen | 全屏               | `boolean`     | true          |
| lock       | 滚动锁定           | `boolean`     | false         |
| text       | 文字               | `string`      |               |
| spinner    | 加载图标           | `string`      |               |
| background | 背景颜色           | `string`      |               |

### Directive

| Name                  | Description      | Type      |
| --------------------- | ---------------- | --------- |
| v-loading             | 是否显示加载动画 | `boolean` |
| fullscreen            | 全屏             | `boolean` |
| lock                  | 滚动锁定         | `boolean` |
| er-loading-text       | 文字             | `string`  |
| er-loading-spinner    | 加载图标         | `string`  |
| er-loading-background | 背景颜色         | `string`  |
