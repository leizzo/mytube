export async function useRemoveAds() {
  const {
    elements: { ads },
  } = useYoutubeElements();

  for (const el of ads) {
    waitForAddedNode({ id: el, recursive: false }, (el) => {
      el.remove();
    });
  }
}
