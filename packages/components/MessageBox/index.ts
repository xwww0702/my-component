import MessageBox from "./methods";
// import {} from '@my-component/utils'
import { set } from "lodash-es";
import type { App } from "vue";

export const MyMessageBox = MessageBox;

set(MyMessageBox, "install", (app: App) => {
  app.config.globalProperties.$msgbox = MessageBox;
  app.config.globalProperties.$messagebox = MessageBox;
  app.config.globalProperties.$alert = MessageBox.alert;
  app.config.globalProperties.$confirm = MessageBox.confirm;
  app.config.globalProperties.$prompt = MessageBox.prompt;
});

export default MessageBox;
export * from "./types";
