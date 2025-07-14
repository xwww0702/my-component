---
title: Collapse
description: Collapse 组件文档

next:
  link: /components/alert
  text: Alert

prev:
  link: /get-started
  text: 快速开始
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

## 图标按钮

使用 `accordion`属性来定义手风琴模式，一次只能有一个活跃项。

::: preview
demo-preview=../demo/collapse/Accordion.vue
:::

## 按钮组

使用具名插槽来实现自定义 title。

::: preview
demo-preview=../demo/collapse/CustomTitle.vue
:::

## Collapse API

### Props

| Name              | Description                       | Type                                                             | Default |
| ----------------- | --------------------------------- | ---------------------------------------------------------------- | ------- |
| size              | 尺寸                              | `enum` - `'large'\| 'default'\| 'small'`                         | —       |
| type              | 类型                              | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | info    |
| plain             | 是否为朴素按钮                    | `boolean`                                                        | false   |
| round             | 是否为圆角按钮                    | `boolean`                                                        | false   |
| circle            | 是否为圆形按钮                    | `boolean`                                                        | false   |
| loading           | 是否为加载中状态                  | `boolean`                                                        | false   |
| loading-icon      | 自定义加载中状态图标组件          | `string`                                                         | spinner |
| disabled          | 按钮是否为禁用状态                | `boolean`                                                        | false   |
| icon              | 按钮图标                          | `string`                                                         | -       |
| autofocus         | 是否自动聚焦(原生`autofocus`属性) | `boolean`                                                        | false   |
| native-type       | 原生 type 属性                    | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |
| tag               | 自定义元素标签                    | `string`\/`Component`                                            | button  |
| use-throttle      | 是否使用节流模式                  | `boolean`                                                        | true    |
| throttle-duration | 节流模式下，节流时间间隔(ms)      | `number`                                                         | 500     |

### Events

| Name  | Description  | Type                         |
| ----- | ------------ | ---------------------------- |
| click | 按钮点击事件 | `(event: MouseEvent)=> void` |

### Slots

| Name    | Description        |
| ------- | ------------------ |
| default | 默认插槽, 按钮内容 |
| loading | 自定义加载图标     |

### Expose

| Name     | Description    | Type                                 |
| -------- | -------------- | ------------------------------------ |
| ref      | 按钮 html 元素 | `Ref<HTMLButtonElement>`             |
| size     | 按钮尺寸       | `ComputedRef<''\|'small' \|'large'>` |
| type     | 按钮类型       | `ComputedRef<''\|'primary' \|...>`   |
| disabled | 按钮禁用状态   | `ComputedRef<boolean>`               |

## ButtonGroup API

### Props

| Name     | Description          | Type                                                             | Default |
| -------- | -------------------- | ---------------------------------------------------------------- | ------- |
| size     | 尺寸                 | `enum` - `'large'\| 'default'\| 'small'`                         | —       |
| type     | 类型                 | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | info    |
| disabled | 按钮组是否为禁用状态 | `boolean`                                                        | false   |

### Slots

| Name    | Description | Sub Component |
| ------- | ----------- | ------------- |
| default | 默认插槽    | Button        |
