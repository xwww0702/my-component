import Notification from "./methods";
import { withInstallFunciton } from "@my-component/utils";

export const MyNotification = withInstallFunciton(
  Notification,
  "$Notification"
);

export * from "./types";
