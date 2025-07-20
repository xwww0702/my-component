---
title: Form
description: Form 组件文档

prev:
  link: /components/loading
  text: loading
---

# Form 表单

常用的 `Form` 组件，`Form` 组件中，我开发了两个表单组件，分别是 `Input` 和 `Switch`，其他组件待开发...

## 基础用法

Form 里每个表单组件都需要用 from-item 包裹

::: preview
demo-preview=../demo/form/Basic.vue
:::

## Rule 校验

用 rule 对表单进行校验，要给 item 设置 prop

::: preview
demo-preview=../demo/form/Rule.vue
:::

## Disabled 禁用

可以给 form 添加 disabled 禁用整个表单，也可以单独给 form item 添加 disabled 禁用
::: preview
demo-preview=../demo/form/Disabled.vue
:::
