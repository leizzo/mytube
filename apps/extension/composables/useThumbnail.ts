import { DisabledStatus } from "@/services/disabledStatusService";

export async function useThumbnail() {
  const el = await storage.getItem<DisabledStatus>("local:disabledStatus");

  if (el?.Thumbnail) {
    thumbnailReplacer();
  }

  storage.watch<DisabledStatus>("local:disabledStatus", (disabledStatus) => {
    if (disabledStatus?.Thumbnail || !disabledStatus?.Thumbnail) {
      location.reload();
    }
  });
}

function thumbnailReplacer() {
  const thumbClass = "yt-core-image";
  const source =
    "https://i.ytimg.com/(vi|vi_webp)/.*/(hqdefault|mqdefault|hq720)(_custom_[0-9]+)?.jpg?.*";

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const target = mutation.target as HTMLElement;

      if (
        mutation.type === "attributes" &&
        target.getAttribute("src")?.match(source) &&
        target.classList?.contains(thumbClass)
      ) {
        const url = target.src.replace(
          /(hq1|hq2|hq3|hqdefault|mqdefault|hq720)(_custom_[0-9]+)?.jpg/,
          "hq3.jpg"
        );

        target.setAttribute("src", url);
      }
    });
  }).observe(document.body, {
    attributes: true,
    attributeFilter: ["src"],
    subtree: true,
  });
}
