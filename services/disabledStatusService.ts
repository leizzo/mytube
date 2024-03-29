import { defineProxyService } from "@webext-core/proxy-service";
import { storage } from "wxt/storage";

export type DisabledStatus = {
  Home: boolean;
  Recommendations: boolean;
  Comments: boolean;
  Shorts: boolean;
  Notifications: boolean;
};

class DisabledStatusService {
  setDisabledStatus(value: never) {
    storage.setItem<DisabledStatus>("local:disabledStatus", value);
  }

  async getDisabledStatus() {
    return storage.getItem<DisabledStatus>("local:disabledStatus");
  }
}

export const [registerDisabledStatusService, getDisabledStatusService] =
  defineProxyService(
    "DisabledStatusService",
    () => new DisabledStatusService()
  );
