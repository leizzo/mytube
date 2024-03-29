import { readonly } from "vue";

export function useYoutubeElements() {
  const elements = readonly({
    ads: ["ytd-ad-slot-renderer", "ytd-rich-section-renderer", "ytd-playlist-renderer"],
    shorts: ["ytd-reel-shelf-renderer"],
    skipButton: ".ytp-ad-skip-button-modern",
    recommendations: ["#columns > [id=secondary]", "ytd-watch-next-secondary-results-renderer"],
    comments: ["ytd-comments[id='comments'"],
    merchants: ["ytd-merch-shelf-renderer"]
  });

  return { elements };
}
