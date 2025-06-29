import { createApp } from "vue";
import App from "./App.vue";
import MyComponent from "my-component";
import "my-component/dist/index.css";
createApp(App).use(MyComponent).mount("#app");
