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

## Form API

### Props

| Name                       | Description      | Type                   | Default |
| -------------------------- | ---------------- | ---------------------- | ------- |
| model                      | 表单数据         | `Record<string, any>`  |         |
| rules                      | 校验规则         | `FormRules`            |         |
| disabled                   | 禁用             | `boolean`              | false   |
| label-position             | 标签位置         | `'left'  'top' right'` | left    |
| label-width                | 标签宽度         | `number`               |         |
| label-suffix               | 标签后缀         | `string`               |         |
| show-message               | 是否显示提示     | `boolean`              |         |
| hide-required-asterisk     | 是否隐藏必填符号 | `boolean`              |         |
| required-asterisk-position | 必填符号的位置   | `left/right`           |         |

### Events

| Name     | Description          | Type                                                              |
| -------- | -------------------- | ----------------------------------------------------------------- |
| validate | 验证表单项校验后触发 | (prop: FormItemProps, isValid: boolean, message: string ) => void |

## Slots

| Name    | Description | Type         |
| ------- | ----------- | ------------ |
| default | 插槽        | my-form-item |

## Instance

| Name          | Description    | Type                                                                                                   |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| validate      | 校验表单项     | () => Promise<boolean>                                                                                 |
| validateField | 校验指定表单项 | (props?: string[],callback?:(isValid:boolean,invalidFields?: ValidateFieldsError)) => Promise<boolean> |
| resetFields   | 重置表单项     | (props?: string[]) => void                                                                             |
| clearValidate | 清除校验状态   | (props?: string[]) => void                                                                             |

## FormItem API

| Name         | Description                                                 | Type           | Default |
| ------------ | ----------------------------------------------------------- | -------------- | ------- |
| prop         | 表单域 model 字段                                           | string         | -       |
| label        | 标签文本                                                    | string         | -       |
| disabled     | 是否禁用表单域                                              | boolean        | false   |
| required     | 是否必填，如不设置，则会根据校验规则自动生成                | boolean        | false   |
| show-message | 是否显示校验错误信息                                        | boolean        | true    |
| error        | 错误提示文案，如不设置，则会从校验规则的 message 属性中获取 | string         | -       |
| rules        | 校验规则                                                    | FormItemRule[] | -       |

## SLots

| Name    | Description      | Type           |
| ------- | ---------------- | -------------- |
| default | 默认插槽         | -              |
| label   | label 插槽       | {label:string} |
| error   | 错误提示文案插槽 | {error:string} |

## Instance

| Name            | Description  | Type                                                                                                          |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| validateStatus  | 校验状态     | 'success' 'error' 'validating' 'init'                                                                         |
| validateMessage | 校验信息     | Ref<string>                                                                                                   |
| validate        | 校验表单项   | (trigger: string,callback?: (valid: boolean,invalidFields?: ValidateFieldsError) => void) => Promise<boolean> |
| resetField      | 重置表单     | () => void                                                                                                    |
| clearValidate   | 清除校验状态 | () => void                                                                                                    |
