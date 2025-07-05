import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { WithInstall } from "@my-component/utils";

export const MyCollapse = WithInstall(Collapse);
export const MyCollapseItem = WithInstall(CollapseItem);

export * from "./types";
