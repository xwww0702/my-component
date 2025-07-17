---
title: Notification
description: Notification 组件文档

next:
  link: /components/alert
  text: Alert

prev:
  link: /components/message
  text: message
---

# Notification 通知

常用的 Notification

## 基础用法

基础 Notification. 支持多种方式调用.

::: preview
demo-preview=../demo/notification/Basic.vue
:::

## 不同类型

有四种不同的类型

::: preview
demo-preview=../demo/notification/Types.vue
:::

## 不自动关闭

使用 `duration`属性来设置是否自动关闭以及自动关闭的时间

::: preview
demo-preview=../demo/notification/Duration.vue
:::

## 可关闭的

使用 `showClose`属性来定义是否显示关闭 icon

::: preview
demo-preview=../demo/notification/Closable.vue
:::

## offset

可以通过 `offset` 属性来定义通知的间距

::: preview
demo-preview=../demo/notification/Offset.vue
:::

## position

可以通过 `position` 属性来定义通知展示的位置

::: preview
demo-preview=../demo/notification/Position.vue
:::

## CloseAll

可以通过 `$Notification.closeAll` 一键全部关闭.

::: preview
demo-preview=../demo/notification/Handler.vue
:::

## 全局方法

可以通过 `$Notification` 直接调用

## dropdown API

### Props

| Name           | Description            | Type                                                  | Default   |
| -------------- | ---------------------- | ----------------------------------------------------- | --------- |
| message        | 消息文字               | `string`                                              |           |
| type           | 主题                   | `success warning  error  danger  info`                | `info`    |
| duration       | 消息持续时间           | `number`                                              | 3000      |
| center         | 文字是否居中           | `boolean`                                             | `false`   |
| offset         | 消息显示距离顶部的偏移 | `number`                                              | 10        |
| transitionName | 过渡动画               | `string`                                              | `fade-up` |
| showClose      | 展示关闭按钮           | `boolean`                                             | `false`   |
| position       | 通知展示的位置         | `string: top-right top-left bottom-right bottom-left` | `false`   |
