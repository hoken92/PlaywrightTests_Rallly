import { expect, type Locator, type Page } from "@playwright/test";

export class EventsPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Events" });
  }
}
