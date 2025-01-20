import { expect, type Locator, type Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly title: Locator;
  readonly profileSettingButton: Locator;
  readonly subHeading: Locator;
  // Profile Card section
  readonly userIDLabel: Locator;
  readonly userIDField: Locator;
  readonly guestUserLabel: Locator;
  readonly warningLabel: Locator;
  readonly deleteGuestUserButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Settings" });
    this.profileSettingButton = page.locator("a", { hasText: "Profile" });
    this.subHeading = page.getByRole("heading", { name: "Profile" });
    this.userIDLabel = page.getByLabel("User ID");
    this.userIDField = page.locator("input");
    this.guestUserLabel = page.getByRole("heading", { name: "Guest User" });
    this.warningLabel = page.getByText(
      "Profile settings are not available for guest users. ",
    );
    this.deleteGuestUserButton = page.getByRole("button", {
      name: "Forget me",
    });
  }
}
