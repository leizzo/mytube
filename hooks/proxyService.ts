import { defineProxyService } from "@webext-core/proxy-service";
import { storage } from "wxt/storage";

class MessageService {

  setDisabledStatus(type: string, value: boolean) {
    storage.setItem(type, value);
  }

  async getDisabledStatus(type: string) {
    return storage.getItem<boolean>(type);
  }
}

export const [registerMessageService, getMessageService] = defineProxyService(
  "MessageService",
  () => new MessageService()
);
