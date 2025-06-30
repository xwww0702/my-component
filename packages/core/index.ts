import { makeInstaller } from "@my-component/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import printLogo from "./printLogo";
import "@my-component/theme";
printLogo();
library.add(fas);
const installer = makeInstaller(components);

export * from "@qiwen72/my-component";
export default installer;
