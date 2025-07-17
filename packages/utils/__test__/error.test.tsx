import { describe, it, expect, vi } from "vitest";
import { throwError, debugWarn } from "../error";

describe("error", () => {
  it("throwError should be worked", () => {
    expect(() => {
      throwError("scope", "msg");
    }).toThrowError("[scope]: msg");
  });
  it("debugWarn should be worked with Error", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    debugWarn("scope", "msg");
    debugWarn(new SyntaxError("test error"));
    expect(warn.mock.calls).toMatchInlineSnapshot(`
  [
    [
      [MyUIError: [scope]: msg],
    ],
    [
      [SyntaxError: test error],
    ],
  ]
`);
  });
});
