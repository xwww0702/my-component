import { type Ref, computed } from "vue";

const defaultInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
};
export function useId(namespace: string = "er"): Ref<string> {
  const idRef = computed(
    () =>
      `${namespace}-${defaultInjection.prefix}-${defaultInjection.current++}`
  );
  return idRef;
}

export default useId;
