import { registerMessageService } from "@/hooks/proxyService";

export default defineBackground(() => {
  registerMessageService();

  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
      storage.setItem("local:testStore", true);
    }
  });
});
