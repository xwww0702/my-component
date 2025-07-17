import makeInstaller from "./makeInstaller";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import printLogo from "./printLogo";
import "@my-component/theme";
printLogo();
library.add(fas);
const installer = makeInstaller(components);

export * from "@my-component/components";
export default installer;
export * from "@my-component/locale";
