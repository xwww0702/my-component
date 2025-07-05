import { describe, it, expect } from "vitest";
import {
  debugWarn,
  throwError,
  WithInstall,
  makeInstaller,
  typeIconMap,
} from "..";
import { each } from "lodash-es";

describe("utils/index", () => {
  it("debugWarn should be exported", () => {
    expect(debugWarn).toBeDefined();
  });

  it("typeIconMap should be exported", () => {
    expect(typeIconMap).toBeDefined();
  });
  it("throwError should be exported", () => {
    expect(throwError).toBeDefined();
  });
  it("WithInstall should be exported", () => {
    expect(WithInstall).toBeDefined();
  });
  it("makeInstaller should be exported", () => {
    expect(makeInstaller).toBeDefined();
  });
  it("typeIconMap should be worked", () => {
    expect(typeIconMap).toBeDefined();
    each(
      [
        ["info", "circle-info"],
        ["success", "check-circle"],
        ["warning", "circle-exclamation"],
        ["danger", "circle-xmark"],
        ["error", "circle-xmark"],
      ],
      ([type, icon]) => {
        expect(typeIconMap.get(type)).toBe(icon);
      }
    );
  });
});
