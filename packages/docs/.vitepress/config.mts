import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "一个组件库",
  base: "/my-component/",
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "开始使用", link: "/get-started" },
      { text: "组件", link: "/components/button" },
    ],
    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "组件",
        collapsed: false,
        items: [
          { text: "Button 按钮", link: "/components/button" },
          { text: "Alert 警告", link: "/components/alert" },
          { text: "Collapse ", link: "/components/collapse" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/xwww0702/my-component" },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});
