import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import MyComponent from "my-component";

createApp(App).use(MyComponent).mount("#app");
