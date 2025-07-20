---
title: Collapse
description: Collapse 组件文档

next:
  link: /components/alert
  text: Alert

prev:
  link: /components/button
  text: button
---

# Collapse 折叠

常用的 Collapse。

## 基础用法

基础 collapse。通过`v-model` 来设置展开的部分。

::: preview
demo-preview=../demo/collapse/Basic.vue
:::

## 禁用状态

你可以使用 `disabled` 属性来定义 CollapseItem 是否被禁用。

::: preview
demo-preview=../demo/collapse/Disabled.vue
:::

## 手风琴样式

使用 `accordion`属性来定义手风琴模式，一次只能有一个活跃项。

::: preview
demo-preview=../demo/collapse/Accordion.vue
:::

## 自定义 title

使用具名插槽来实现自定义 title。

::: preview
demo-preview=../demo/collapse/CustomTitle.vue
:::

## Collapse API

### Props

| Name       | Description | Type                 | Default |
| ---------- | ----------- | -------------------- | ------- |
| modelValue | active      | `CollapseItemName[]	` | []      |
| accordion  | 手风琴模式  | `boolean`            | false   |

### Events

| Name   | Description | Type                                |
| ------ | ----------- | ----------------------------------- |
| change | 活动项切换  | `(name: CollapseItemName[])=> void` |

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | CollapseItem |

## CollapseItem API

### Props

| Name     | Description | Type                | Default |
| -------- | ----------- | ------------------- | ------- |
| name     | 唯一标识符  | ` CollapseItemName` | —       |
| title    | 面板标题    | `string`            | info    |
| disabled | 是否禁用    | `boolean`           | false   |

### Slots

| Name    | Description | Sub Component   |
| ------- | ----------- | --------------- |
| default | 默认插槽    | collapse 的内容 |
| title.  | 自定义标题  | 标题样式        |
