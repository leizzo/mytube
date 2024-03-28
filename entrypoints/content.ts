import { isHomePage, isWatchPage } from "~/composables/useUrlObserver";
import { useHome } from "~/composables/useHome";
import { useWatch } from "~/composables/useWatch";

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main() {
    observeUrl(async (data) => {
      // Remove native ads in youtube.
      useRemoveAds();

      if (isHomePage(data.path)) {
        await useHome();
      }

      if (isWatchPage(data.path)) {
        await useWatch();
      }
    });
  },
});
