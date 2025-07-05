import {
  onMounted,
  onBeforeUnmount,
  watch,
  isRef,
  unref,
  type MaybeRef,
} from "vue";

export default function useEventListener(
  target: MaybeRef<EventTarget | HTMLElement | null>,
  event: string,
  handler: (event: Event) => void
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler);
      val?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => target?.addEventListener(event, handler));
  }
  onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler));
}
