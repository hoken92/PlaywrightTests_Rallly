import { expect, type Locator, type Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly title: Locator;
  readonly profileSettingButton: Locator;
  readonly subHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Settings" });
    this.profileSettingButton = page.locator("a", { hasText: "Profile" });
    this.subHeading = page.getByRole("heading", { name: "Profile" });
  }
}
