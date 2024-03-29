import type { DisabledStatus } from "@/services/disabledStatusService";
import { storage } from "wxt/storage";

export async function useHome() {
  const disabledStatus = await storage.getItem<DisabledStatus>(
    "local:disabledStatus",
  );

  if (disabledStatus?.Home) {
    window.location.assign("/subscriptions");
  }

  await storage.watch<DisabledStatus>(
    "local:disabledStatus",
    (disabledStatus) => {
      if (disabledStatus?.Home) {
        window.location.assign("/subscriptions");
      }
    },
  );
}
