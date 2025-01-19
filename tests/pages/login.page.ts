import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly title: Locator;
  readonly guestbutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page
      .locator("form")
      .locator("div", { hasText: "Login" })
      .filter({ hasNotText: "with EmailOrContinue" });
    this.guestbutton = page.getByRole("button", { name: "Continue as Guest" });
  }
}
