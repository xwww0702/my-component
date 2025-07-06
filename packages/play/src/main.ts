import { createApp } from "vue";
import App from "./App.vue";
import MyComponent, { zhCn } from "@qiwen72/my-component";
import "@qiwen72/my-component/dist/index.css";
createApp(App).use(MyComponent, { locale: zhCn }).mount("#app");
