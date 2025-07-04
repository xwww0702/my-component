import { describe, it, expect } from "vitest";
import type { Plugin } from "vue";
import {
  MyAlert,
  MyButton,
  MyButtonGroup,
  MyCollapse,
  MyCollapseItem,
  MyIcon,
} from "..";
import { get, map } from "lodash-es";
const comps = [
  MyAlert,
  MyButton,
  MyButtonGroup,
  MyCollapse,
  MyCollapseItem,
  MyIcon,
] as Plugin[];

describe("components/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s should be exported",
    (__, comp) => {
      expect(comp).toBeDefined();
      expect(comp.install).toBeDefined();
      expect(typeof comp.install).toBe("function");
    }
  );
});
