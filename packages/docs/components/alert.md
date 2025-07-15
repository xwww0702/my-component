---
title: Collapse
description: Collapse 组件文档

next:
  link: /components/
  text:

prev:
  link: /components/collapse
  text: 折叠组件
---

# Alert

常用的 Alert。

## 基础用法

通过`slot`/`props` 来传递内容。

::: preview
demo-preview=../demo/alert/Basic.vue
:::

## 关闭按钮

你可以使用 `closable` 属性来定义 关闭按钮 是否被禁用。可以通过设置`@close`来指定关闭的回调

::: preview
demo-preview=../demo/alert/Close.vue
:::

## Description

除了设置 `title` 之外，还可以通过设置 `description` 来更详细的描述。

::: preview
demo-preview=../demo/alert/Desc.vue
:::

## 图标和描述

::: preview
demo-preview=../demo/alert/IconDesc.vue
:::

## 展示图标

通过`show-icon`来设置图标

::: preview
demo-preview=../demo/alert/IconDesc.vue
:::

## 文字居中

使用 center 属性来让文字水平居中。
::: preview
demo-preview=../demo/alert/TextCenter.vue
:::

## 主题

通过设置 `effect` 属性来改变主题(`light`|`dark`)，默认为 `light`

::: preview
demo-preview=../demo/alert/Theme.vue
:::

## Alert API

### Props

| Name        | Description      | Type                            | Default |
| ----------- | ---------------- | ------------------------------- | ------- |
| title       | 标题             | `string	`                        |         |
| type        | 类型             | `success  info  warning  error` | `info`  |
| description | 描述             | `string`                        |         |
| effect      | 主题             | ` light``dark `                 | `light` |
| closable    | 是否展示关闭按钮 | `boolean`                       | true    |
| center      | 剧中             | `boolean`                       | false   |
| showIcon    | 展示图标         | `boolean`                       | false   |

### Events

| Name  | Description | Type                         |
| ----- | ----------- | ---------------------------- |
| close | 关闭时回调  | `(event: MouseEvent)=> void` |

### Slots

| Name    | Description                     |
| ------- | ------------------------------- |
| default | 默认插槽，用于设置 Alert 的描述 |
| title   | 标题                            |
