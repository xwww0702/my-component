import { makeInstaller } from "@my-component/utils";
import components from "./components";
import "@my-component/theme";
const installer = makeInstaller(components);

export * from "@my-component/components";
export default installer;
