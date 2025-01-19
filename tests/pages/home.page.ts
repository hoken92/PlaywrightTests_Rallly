import { expect, type Locator, type Page } from "@playwright/test";

// Sets up Home page locators and functions to use for test cases for the Home Page
export class HomePage {
  // initialize locator variables for the page
  readonly page: Page;
  readonly title: Locator;
  readonly groupPollTitle: Locator;
  readonly pollDescription: Locator;
  readonly liveLabel: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    // defines all locators in the constructor
    this.page = page;
    this.title = page.getByRole("heading", { name: "Home" });
    this.groupPollTitle = page.getByRole("heading", { name: "Group Poll" });
    this.pollDescription = page.locator("p", {
      hasText:
        "Share your availability with a group of people and find the best time to meet.",
    });
    this.liveLabel = page.locator("a", { hasText: "Live" });
    this.createButton = page
      .locator("div")
      .filter({ has: page.locator("div") })
      .locator("a", { hasText: "Create" });
  }

  async navigateHome() {
    await this.page.goto("/");
  }

  // Validates the title with the given string
  async validateHomeTitle(title: string) {
    // Will check to see if title is visible and attached to the DOM first
    await expect(this.title).toBeVisible();
    await expect(this.title).toHaveText(title);
  }

  async validateGroupPollCard(
    title: string,
    description: string,
    count: string,
  ) {
    // Will check to see if title is visible and attached to the DOM first
    // It will then assert all other elements to have the correct text
    await expect(this.groupPollTitle).toBeVisible();
    await expect(this.groupPollTitle).toHaveText(title);
    await expect(this.pollDescription).toHaveText(description);
    await expect(this.liveLabel).toHaveText(count);
    // await expect(this.createButton).toBeVisible();
  }

  async createPoll() {
    // Class function that will click create button
    await this.createButton.click();
    //await expect(this.page).toHaveURL("./new");
  }
}
