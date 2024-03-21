import { isHomePage, observeUrl } from "./content/observers/urlObserver";
import { storage } from "wxt/storage";

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main() {
    console.log("Hello content.");

    observeUrl(async (data) => {
      if (isHomePage(data.path)) {
        const isDisabledHome = await storage.getItem("local:disabledHome");

        if (isDisabledHome) {
          window.location.assign("/subscriptions");
        }

        await storage.watch<boolean>("local:disabledHome", (isDisabledHome) => {
          if (isDisabledHome) {
            window.location.assign("/subscriptions");
          }
        });
      }
    });
  },
});
