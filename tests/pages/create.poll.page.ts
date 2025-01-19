import { expect, type Locator, type Page } from "@playwright/test";

export class CreatePollsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly closebutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Group Poll" });
    this.closebutton = page.getByRole("button");
  }
}
