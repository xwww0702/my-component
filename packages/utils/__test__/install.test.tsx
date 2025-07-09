import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, createApp } from "vue";
import { WithInstall } from "../install";

const AppComp = defineComponent({
  setup() {
    return () => <div>App</div>;
  },
});

const compA = WithInstall(
  defineComponent({
    name: "CompA",
    setup() {
      return () => <div>CompA</div>;
    },
  })
);

const compB = WithInstall(
  defineComponent({
    name: "CompB",
    setup() {
      return () => <div>CompB</div>;
    },
  })
);

describe("install", () => {
  it("WithInstall should be worked", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    app.use(compA);
    app.use(compB);
    app.mount(wrapper.element as HTMLElement);

    expect(compA.install).toBeDefined();
    expect(compB.install).toBeDefined();
    expect(app._context.components["CompA"]).toBeTruthy();
    expect(app._context.components["CompB"]).toBeTruthy();
  });

  // it("makeInstaller should be worked", () => {
  //   const wrapper = mount(() => <div id="app"></div>);
  //   const app = createApp(AppComp);
  //   const installer = makeInstaller([compA, compB]);
  //   app.use(installer).mount(wrapper.element);

  //   expect(installer).toBeDefined();
  //   expect(app._context.components["CompA"]).toBeTruthy();
  //   expect(app._context.components["CompB"]).toBeTruthy();
  // });
});
