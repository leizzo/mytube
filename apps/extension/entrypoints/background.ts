import { registerDisabledStatusService } from "@/services/disabledStatusService";

export default defineBackground(() => {
  registerDisabledStatusService();
});
