---
title: Dropdown
description: Dropdown 组件文档

next:
  link: /components/alert
  text: Alert

prev:
  link: /components/tooltip
  text: tooltip
---

# Dropdown 下拉菜单

常用的 Dropdown

## 基础用法

基础 Dropdown. `item` 设置下拉框的内容，item 的类型是`DropdownItemProps[]`，也可以通过 slot 传入

::: preview
demo-preview=../demo/dropdown/Basic.vue
:::

## 禁用状态

你可以使用 `disabled` 属性来定义 Dropdown 是否被禁用。

::: preview
demo-preview=../demo/dropdown/Disabled.vue
:::

## 触发条件

使用 `trigger`属性来定义触发条件，可以为`click` `hover` 和 `contextmenu`

::: preview
demo-preview=../demo/dropdown/Trigger.vue
:::

## 点击菜单隐藏

可以通过 `hide-on-click` 属性来设置点击菜单后是否隐藏菜单。

::: preview
demo-preview=../demo/dropdown/Disappear.vue
:::

## 点击菜单触发指令事件

可以通过 `command` 事件来设置点击 item 后的事件。

::: preview
demo-preview=../demo/dropdown/Command.vue
:::

## 下拉方法

可以获取到 `dropdown` 实例的 `open` 和 `close` 方法，在其他地方进行触发

::: preview
demo-preview=../demo/dropdown/Instance.vue
:::

## 触发对象样式

设置 `split-button` 属性来让触发下拉元素呈现为按钮组，按钮可以有自己单独的功能

::: preview
demo-preview=../demo/dropdown/Group.vue
:::

## 尺寸

设置 `size` 属性来让自定义组件的大小

::: preview
demo-preview=../demo/dropdown/Size.vue
:::

## dropdown API

### Props

| Name          | Description                  | Type                   | Default   |
| ------------- | ---------------------------- | ---------------------- | --------- |
| type          | 菜单按钮类型                 | 与 button 类型相同     |           |
| size          | 大小                         | `large  default small` | `default` |
| items         | 下拉 items                   | `DropdownItemProps[] ` |           |
| hide-on-click | 点击菜单项时是否隐藏下拉菜单 | `boolean`              | true      |
| split-button  | 下拉按钮与功能按钮一套       | `boolean`              | false     |
| show-timeout  | 出现缓冲时间                 | `number`               | 0         |
| hide-timeout  | 隐藏缓冲时间                 | `number`               | 200       |

### Events

| Name           | Description                               | Type                               |
| -------------- | ----------------------------------------- | ---------------------------------- |
| visible-change | 气泡显示                                  | `(value: boolean)=> void`          |
| click          | split-buttton 为 true 时,点击左侧按钮触发 | `(event: MouseEvent) => void`      |
| command        | 点击菜单项时触发                          | `(value: DropdownCommand) => void` |

### Slots

| Name     | Description |
| -------- | ----------- |
| default  | 默认插槽    |
| dropdown | 下拉菜单    |

## dropdownItem API

### Props

| Name     | Description | Type            | Default |
| -------- | ----------- | --------------- | ------- |
| command  | 菜单项 id   | `string number` |         |
| label    | 菜单项文本  | `string`        |         |
| disabled | 是否禁用    | `boolean `      | false   |
| divided  | 是否分割    | `boolean`       | false   |

### Slots

| Name    | Description                |
| ------- | -------------------------- |
| default | 默认插槽，优先级高于 label |
