---
title: Tooltip
description: Tooltip 组件文档

next:
  link: /components/alert
  text: Alert

prev:
  link: /components/alert
  text: alert
---

# Tooltip 弹出气泡

常用的 Tooltip

## 基础用法

基础 Tooltip，通过 `content` 设置气泡内的内容，`placement` 设置气泡的位置，触发元素的内容以插槽的形式传入。

::: preview
demo-preview=../demo/tooltip/Basic.vue
:::

## 禁用状态

你可以使用 `disabled` 属性来定义 Tooltip 是否被禁用。

::: preview
demo-preview=../demo/tooltip/Disabled.vue
:::

## 触发条件

使用 `trigger`属性来定义触发条件，可以为`click` `hover` 和 `contextmenu`

::: preview
demo-preview=../demo/tooltip/Trigger.vue
:::

## 自定义 content

使用具名插槽来实现自定义 `content`

::: preview
demo-preview=../demo/tooltip/Content.vue
:::

## Tooltip API

### Props

| Name          | Description        | Type                                                                                                                              | Default  |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| content       | 气泡中的内容       | `string	`                                                                                                                          |          |
| trigger       | 触发方式           | ` click`` hover ``contextmeunu `                                                                                                  | `hover`  |
| placement     | 气泡弹出位置       | `top-start` `top` `top-end` `left-start` `right-start` `left` `right` `left-end` `right-end` `bottom-start` `bottom` `bottom-end` | `bottom` |
| manual        | 手动模式           | `boolean`                                                                                                                         | false    |
| disabled      | 禁用               | `boolean`                                                                                                                         | false    |
| popperOptions | popperJs 的 option | object 参考 popper.js                                                                                                             | {}       |
| transition    | 动画效果           | `string`                                                                                                                          | `fade`   |
| showTimeout   | 出现缓冲时间       | `number`                                                                                                                          | 0        |
| hideTimeout   | 隐藏缓冲时间       | `number`                                                                                                                          | 200      |

### Events

| Name           | Description    | Type                      |
| -------------- | -------------- | ------------------------- |
| visible-change | 气泡显示       | `(value: boolean)=> void` |
| click-outside  | 点击外部时触发 | `()=> void`               |

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | 默认插槽     |
| content | 气泡内容插槽 |
