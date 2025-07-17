import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  toRef,
  unref,
  watch,
  type MaybeRef,
  type WatchStopHandle,
} from "vue";
import { useProp } from "@my-component/hooks";
import type { FormItemContext } from "./types";
import { useId } from "@my-component/hooks";
export function useFormItem() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  return { form, formItem };
}
export function useFormDisabled(fallback?: MaybeRef<boolean | void>) {
  const disabled = useProp<boolean>("disabled"); //从当前实例取出 props中的disabled
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  return computed(
    () =>
      disabled.value ||
      unref(fallback) ||
      form?.disabled ||
      formItem?.disabled ||
      false
  );
}

interface UseFormInputComponentProps extends Record<string, any> {
  id?: string;
}

export function useFormItemInputId(
  porps?: UseFormInputComponentProps,
  formItemComtext?: FormItemContext
) {
  const inputId = ref<string>("");
  let unwatch: WatchStopHandle | void;

  onMounted(() => {
    unwatch = watch(
      toRef(() => porps?.id),
      (id) => {
        const newId = id ?? useId().value;
        if (newId !== inputId.value) {
          inputId.value && formItemComtext?.removeInputId(inputId.value);
          formItemComtext?.addInputId(newId);
          inputId.value = newId;
        }
      },
      {
        immediate: true,
      }
    );
  });
  onUnmounted(() => {
    unwatch && unwatch();
    inputId.value && formItemComtext?.removeInputId(inputId.value);
  });
  return { inputId };
}
