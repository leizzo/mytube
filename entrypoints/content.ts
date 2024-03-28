import { useYoutubeElements } from "@/hooks/youtubeElements";
import {
  isHomePage,
  isWatchPage,
  observeUrl,
} from "./content/observers/urlObserver";
import { storage } from "wxt/storage";

export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main() {
    const {
      elements: { recommendations, ads },
    } = useYoutubeElements();

    localStorage.clear();
    sessionStorage.clear();

    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }



    for (const el of ads) {
      waitForAddedNode({ id: el, recursive: false }, (el) => {
        el.remove();
      });
    }
    

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

      if (isWatchPage(data.path)) {
        const isDisableRecommendations = await storage.getItem(
          "local:disabledRecommendations"
        );

        await storage.watch<boolean>(
          "local:disabledRecommendations",
          (value) => {
            for (const el of recommendations) {
              document.querySelector(el).style.display = value
                ? "none"
                : "block";
            }
          }
        );

        for (const element of recommendations) {
          waitForAddedNode({ id: element, recursive: false }, (el) => {
            el.style.display = isDisableRecommendations ? "none" : "block";
          });
        }
      }
    });
  },
});

function waitForAddedNode(
  params: { id: string; parent?: HTMLDivElement; recursive: boolean },
  callback: (el: HTMLDivElement) => void
) {
  new MutationObserver((mutations, observer) => {
    const el = document.querySelector(params.id) as HTMLDivElement;
    if (el) {
      observer.disconnect();
      callback(el);
    }
  }).observe(params.parent || document, {
    subtree: !!params.recursive || !params.parent,
    childList: true,
  });
}
