import Message from "./methods.ts";
import { withInstallFunciton } from "@my-component/utils";

export const MyMessage = withInstallFunciton(Message, "$message");
export * from "./types.ts";
