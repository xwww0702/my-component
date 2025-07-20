import type { Component, Ref, ComputedRef } from "vue";
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type NativeType = "button" | "reset" | "submit";
export type ButtonSize = "large" | "default" | "small";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
  loadingIcon?: string;
  useThrottle?: boolean;
  throttleDuration?: number;
}
export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}
export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}
export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
  disabled?: ComputedRef<boolean>;
  size: ComputedRef<ButtonSize | undefined>;
  type: ComputedRef<ButtonType | undefined>;
}
