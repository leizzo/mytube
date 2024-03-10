import { describe, it, expect, beforeEach } from "vitest";
import background from "../background";
import { fakeBrowser } from "wxt/testing";

describe("Background Entrypoint", () => {
  beforeEach(() => {
    // Reset the in-memory state, including storage
    fakeBrowser.reset();
  });

  it("should store the current date on install", async () => {
    background.main();
    await fakeBrowser.runtime.onInstalled.trigger({
      reason: "install",
      temporary: false,
    });

    const testStore = await storage.getItem("local:testStore");

    expect(testStore).toBe(true);
  });
});
