import type { DisabledStatus } from "@/services/disabledStatusService";
import { storage } from "wxt/storage";

export async function useWatch() {
  const {
    elements: { recommendations, comments },
  } = useYoutubeElements();

  const disabledStatus = await storage.getItem<DisabledStatus>(
    "local:disabledStatus",
  );

  // When user change the recommendation state
  await storage.watch(
    "local:disabledStatus",
    (disabledStatus: DisabledStatus | null) => {
      for (const el of recommendations) {
        (document.querySelector(el) as HTMLElement).style.display =
          disabledStatus?.Recommendations ? "none" : "block";
      }

      for (const el of comments) {
        (document.querySelector(el) as HTMLElement).style.display =
          disabledStatus.Comments ? "none" : "block";
      }
    },
  );

  // Initialize
  for (const element of recommendations) {
    waitForAddedNode({ id: element, recursive: false }, (el) => {
      el.style.display = disabledStatus?.Recommendations ? "none" : "block";
    });
  }
}
