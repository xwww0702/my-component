import { isString } from "lodash-es";

class MyUIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MyUIError";
  }
}

export function throwError(scope: string, mag: string) {
  throw new MyUIError(`[${scope}]: ${mag}`);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new MyUIError(`[${scope}]: ${msg}`) : scope;
    console.warn(err);
  }
}
