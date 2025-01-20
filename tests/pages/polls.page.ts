import { expect, type Locator, type Page } from "@playwright/test";

export class PollsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly noPollsText: Locator;
  readonly liveFilterButton: Locator;
  readonly pausedFilterButton: Locator;
  readonly finalizedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Polls" });
    this.noPollsText = page.locator("p", { hasText: "No polls" });
    this.liveFilterButton = page.getByRole("radio", { name: "Live" });
    this.pausedFilterButton = page.getByRole("radio", { name: "Paused" });
    this.finalizedButton = page.getByRole("radio", { name: "Finalized" });
  }
}
