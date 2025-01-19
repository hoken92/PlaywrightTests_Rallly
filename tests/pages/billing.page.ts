import { expect, type Locator, type Page } from "@playwright/test";

export class BillingPage {
  readonly page: Page;
  readonly billingButton;
  readonly title: Locator;
  readonly subHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billingButton = page.locator("a", { hasText: "Billing" });
    this.title = page.getByRole("heading", { name: "Settings" });
    this.subHeading = page.getByRole("heading", { name: "Free" });
  }
}
