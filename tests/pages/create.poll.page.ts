import { expect, type Locator, type Page } from "@playwright/test";

export class CreatePollsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly closebutton: Locator;
  // Event Card section
  readonly eventCardTitle: Locator;
  readonly eventCardDescription: Locator;
  readonly eventTitleLabel: Locator;
  readonly eventLocationLabel: Locator;
  readonly eventDescriptionLabel: Locator;
  // Calender Card Section
  readonly calendarTitleLabel: Locator;
  // Create Poll
  readonly createPollButton: Locator;
  // Error messages
  readonly titleErrorMessage: Locator;
  readonly calendarOptionsErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Group Poll" });
    // No reliable locator for close button
    this.closebutton = page.getByRole("button");
    // Event Card section
    this.eventCardTitle = page.getByRole("heading", { name: "Event" });
    this.eventCardDescription = page.locator("p", {
      hasText: "Describe what your event is about",
    });
    this.eventTitleLabel = page.getByLabel("Title");
    this.eventLocationLabel = page.getByLabel("Location");
    this.eventDescriptionLabel = page.getByLabel("Description");
    // Calender Card Section
    // Create Poll Button
    this.createPollButton = page.getByRole("button", { name: "Create Poll" });
    // Error messages
    this.titleErrorMessage = page.locator("p", {
      hasText: `“Title” is required`,
    });
    this.calendarOptionsErrorMessage = page.locator("p", {
      hasText:
        "You can't create a poll without any options. Add at least one option to continue.",
    });
  }

  async verifyPollElements() {
    await expect(this.title).toBeVisible();
    await expect(this.eventCardTitle).toBeVisible();
    await expect(this.eventCardDescription).toBeVisible();
    await expect(this.eventTitleLabel).toBeVisible();
    await expect(this.eventLocationLabel).toBeVisible();
    await expect(this.eventDescriptionLabel).toBeVisible();
  }
}
