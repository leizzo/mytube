export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
      storage.setItem("local:testStore", true);
    }
  });
});
