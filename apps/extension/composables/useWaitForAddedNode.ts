export function waitForAddedNode(
  params: { id: string; parent?: HTMLDivElement; recursive: boolean },
  callback: (el: HTMLDivElement) => void,
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
