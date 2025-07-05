import { describe, it, expect } from "vitest";
import { useClickOutside, useEventListener } from "..";

describe("hooks/index.ts", () => {
  it("should export useClickOutside", () => {
    expect(useClickOutside).toBeDefined();
  });

  it("should export useEventListener", () => {
    expect(useEventListener).toBeDefined();
  });
});
