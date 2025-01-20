import { expect, type Locator, type Page } from "@playwright/test";

export class NavigationBar {
  readonly page: Page;
  readonly logo: Locator;
  readonly homeNavItem: Locator;
  readonly pollNavItem: Locator;
  readonly eventNavItem: Locator;
  readonly createPollNavItem: Locator;
  readonly upgradeNavItem: Locator;
  readonly loginNavItem: Locator;
  readonly supportNavItem: Locator;
  readonly prefNavItem: Locator;
  readonly guestProfileNavItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText("Rallly");
    this.homeNavItem = page.locator("a", { hasText: "Home" });
    this.pollNavItem = page.locator("a", { hasText: "Polls" });
    this.eventNavItem = page.locator("a", { hasText: "Events" });
    this.createPollNavItem = page
      .getByRole("listitem")
      .locator("a", { hasText: "Create" });
    this.upgradeNavItem = page
      .locator("span")
      .locator("span", { hasText: "Upgrade" });
    this.loginNavItem = page.locator("a", { hasText: "Login" });
    this.supportNavItem = page.locator("a", { hasText: "Support" });
    this.prefNavItem = page.locator("a", { hasText: "Preferences" });
    this.guestProfileNavItem = page.locator("a", { hasText: "Guest" });
  }

  async navigateHome() {
    // Navigates user to home page, by using baseURL defined in playwright.config.ts
    await this.page.goto("/");
  }

  async validateNavItems() {
    await expect(this.logo).toBeVisible();
    await expect(this.homeNavItem).toBeVisible();
    await expect(this.pollNavItem).toBeVisible();
    await expect(this.eventNavItem).toBeVisible();
    await expect(this.createPollNavItem).toBeVisible();
    await expect(this.upgradeNavItem).toBeVisible();
    await expect(this.loginNavItem).toBeVisible();
    await expect(this.supportNavItem).toBeVisible();
    await expect(this.prefNavItem).toBeVisible();
    await expect(this.guestProfileNavItem).toHaveText("Guest");
  }
}
