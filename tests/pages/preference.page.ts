import { expect, type Locator, type Page } from "@playwright/test";

export class PreferencePage {
  readonly page: Page;
  readonly title: Locator;
  readonly subHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Settings" });
    this.subHeading = page.getByRole("heading", { name: "Language" });
  }
}
