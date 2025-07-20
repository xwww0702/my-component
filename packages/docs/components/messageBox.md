---
title: messageBox
description: messageBox 组件文档

next:
  link: /components/messageBox
  text: messageBox

prev:
  link: /components/notification
  text: Notification
---

# messageBox 消息弹出框

常用的 messageBox

## 基础用法

基础 messageBox. 有三种不同的类型，`alert`、`confirm`和`prompt`

::: preview
demo-preview=../demo/messageBox/Basic.vue
:::

## 使用 VNode 传入内容

::: preview
demo-preview=../demo/messageBox/VNode.vue
:::

## 可关闭的

使用 `showClose`属性来定义是否显示关闭 icon

::: preview
demo-preview=../demo/messageBox/Closable.vue
:::

## 点击外部关闭

可以通过 `closeOnClickModal` 来设置是否能点击外部关闭

::: preview
demo-preview=../demo/messageBox/ClickOutside.vue
:::

## 自定义

可以自定义 MessageBox，并且可以利用钩子函数在提交或取消时执行回调函数。

::: preview
demo-preview=../demo/messageBox/Custom.vue
:::

## 全局方法

可以直接调用 `ErMessageBox.alert、ErMessageBox.confirm、ErMessageBox.prompt`

## MessageBox API

### Props

| Name                    | Description          | Type                                   | Default   |
| ----------------------- | -------------------- | -------------------------------------- | --------- |
| title                   | 标题                 | `string`                               |           |
| message                 | 消息内容             | `string/ VNode  () => VNode`           |           |
| type                    | 类型，用于图标展示   | `success warning  error  danger  info` |           |
| icon                    | icon                 | `string`                               |           |
| callback                | 关闭的回调函数       | `(action: MessageBoxAction) => void`   |           |
| show-close              | 显示关闭 icon        | `boolean`                              |           |
| before-close            | 关闭前的回调函数     | `boolean`                              |           |
| show-confirm-button     | 确认按钮             | `boolean`                              |           |
| show-cancel-button      | 取消按钮             | `boolean`                              |           |
| confirm-button-text     | 确认按钮的文字       | `string`                               |           |
| cancel-button-text      | 取消按钮的文字       | `string`                               |           |
| confirm-button-type     | 确认按钮的类型       | `string`                               |           |
| cancel-button-type      | 取消按钮的类型       | `string`                               |           |
| confirm-button-disabled | 确认按钮禁用         | `boolean`                              |           |
| confirm-button-loading  | 确认按钮加载         | `boolean`                              |           |
| cancel-button-disabled  | 取消按钮禁用         | `boolean`                              |           |
| cancel-button-loading   | 取消按钮加载         | `boolean`                              |           |
| close-on-click-modal    | 点击外部关闭         | `boolean`                              |           |
| show-input              | 展示 input 框        | `boolean`                              |           |
| input-placeholder       | input 的 placeholder | `string`                               |           |
| input-type              | input 的 type        | `string`                               |           |
| input-value             | 输入框的初始值       | `string`                               |           |
| center                  | 是否居中显示         | `boolean`                              |           |
| round-button            | 是否显示圆角按钮     | `boolean`                              |           |
| button-size             | 按钮大小             | `default、large 、small`               | `default` |
