import { makeInstaller } from "@my-component/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import "@my-component/theme";

library.add(fas);
const installer = makeInstaller(components);

export * from "../components";
export default installer;
