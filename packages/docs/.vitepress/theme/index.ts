import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import MyComponent from "@qiwen72/my-component";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";

import "@vitepress-demo-preview/component/dist/style.css";
import "@qiwen72/my-component/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(MyComponent);
  },
};
