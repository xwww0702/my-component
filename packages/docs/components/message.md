---
title: Message
description: Message 组件文档

next:
  link: /components/notification
  text: Notification

prev:
  link: /components/dropdown
  text: dropdown
---

# Message 消息提示

常用的 Message

## 基础用法

基础 Message. 支持多种方式调用

::: preview
demo-preview=../demo/Message/Basic.vue
:::

## 不同类型

有四种不同的类型

::: preview
demo-preview=../demo/Message/Types.vue
:::

## 可关闭的

使用 `showClose`属性来定义是否能关闭

::: preview
demo-preview=../demo/Message/Closable.vue
:::

## 文字居中

可以通过 `center` 属性来设置文字居中

::: preview
demo-preview=../demo/Message/Center.vue
:::

## CloseAll

可以通过 `$message.closeAll` 一键全部关闭.

::: preview
demo-preview=../demo/Message/Handler.vue
:::

## 全局方法

可以通过 `$message` 直接调用

## Message API

### Props

| Name           | Description            | Type                                   | Default   |
| -------------- | ---------------------- | -------------------------------------- | --------- |
| message        | 消息文字               | `string`                               |           |
| type           | 主题                   | `success warning  error  danger  info` | `info`    |
| duration       | 消息持续时间           | `number`                               | 3000      |
| center         | 文字是否居中           | `boolean`                              | `false`   |
| offset         | 消息显示距离顶部的偏移 | `number`                               | 10        |
| transitionName | 过渡动画               | `string`                               | `fade-up` |
| showClose      | 展示关闭按钮           | `boolean`                              | `false`   |
