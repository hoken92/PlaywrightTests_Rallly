import { expect, type Locator, type Page } from "@playwright/test";

export class PollsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly noPollsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Polls" });
    this.noPollsText = page.locator("p", { hasText: "No polls" });
  }
}
