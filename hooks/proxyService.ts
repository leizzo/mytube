import { defineProxyService } from "@webext-core/proxy-service";
import { storage } from "wxt/storage";

class MessageService {
  setDisabledStatusForHomePage(value: boolean) {
    storage.setItem("local:disabledHome", value);
  }
  
  async getDisabledStatusForHomePage() {
    return storage.getItem<boolean>("local:disabledHome");
  }
}

export const [registerMessageService, getMessageService] = defineProxyService(
  "MessageService",
  () => new MessageService()
);
