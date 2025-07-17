import { computed, ref } from "vue";
const zIndex = ref(0);

export default function useZIndex(initval = 2000) {
  const _initval = ref(initval);
  const currentZIndex = computed(() => zIndex.value + _initval.value);
  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    initialValue: _initval,
    currentZIndex,
    nextZIndex,
  };
}
