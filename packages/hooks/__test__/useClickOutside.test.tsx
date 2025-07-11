import { describe, it, expect, vi } from "vitest";
import { ref, defineComponent } from "vue";
import { mount } from "@vue/test-utils";

import useClickOutside from "../useClickOutside";

describe("hooks/useClickOutside", () => {
  it("should add click-outside listener ", async () => {
    const target = ref<HTMLElement | null>(null);
    const btnRef = ref<HTMLElement | null>(null);
    const handler = vi.fn();

    mount(
      defineComponent({
        setup() {
          useClickOutside(target, handler);
          return () => (
            <div>
              <div id="outside" ref={target}>
                <button ref={btnRef}>Click Me</button>
              </div>
            </div>
          );
        },
      })
    );

    await btnRef.value?.click();
    expect(handler).toHaveBeenCalledTimes(0);

    await document.body.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
