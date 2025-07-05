import { describe, it, expect, vi } from "vitest";
import { ref, defineComponent } from "vue";
import { mount } from "@vue/test-utils";

import useEventListener from "../useEventListener";

describe("hooks/useEventListener", () => {
  it("should add and remove event listener when target is HTMLElement", async () => {
    const target = document.createElement("button");
    const handler = vi.fn();
    const wrapper = mount(
      defineComponent({
        setup() {
          useEventListener(target, "click", handler);
          return () => <div id="container"></div>;
        },
      })
    );
    wrapper.get("#container").element.appendChild(target);
    await target.click();
    expect(handler).toHaveBeenCalledTimes(1);

    await wrapper.unmount();
    await target.click();
    expect(handler).toHaveBeenCalledTimes(1); // should not call after unmount
  });

  it("should add and remove event listener when target is Ref<HTMLElement>", async () => {
    const target = ref<HTMLElement | null>(null);
    const handler = vi.fn();

    mount(
      defineComponent({
        setup() {
          useEventListener(target, "click", handler);
          return () => <button id="container" ref={target}></button>;
        },
      })
    );

    await document.getElementById("container")?.click();
    await target.value?.click();

    expect(handler).toHaveBeenCalledOnce();

    target.value = document.createElement("div");
    await document.getElementById("container")?.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
