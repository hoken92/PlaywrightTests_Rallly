import { expect, type Locator, type Page } from "@playwright/test";

export class PollDetailsPage {
  readonly page: Page;
  // Top section
  readonly closeModalButton: Locator;
  readonly titleNav: Locator;
  readonly manageButton: Locator;
  readonly editDetailsButton: Locator;
  readonly pauseButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton;

  // Event Details
  readonly eventTitleLabel: Locator;
  readonly eventLocationLabel: Locator;
  readonly eventDescriptionLabel: Locator;
  readonly saveButton: Locator;
  readonly pausedStatus: Locator;
  readonly pausedTitle: Locator;

  constructor(page: Page, pollName: string) {
    this.page = page;
    this.closeModalButton = page
      .getByRole("button")
      .locator("span", { hasText: "Close" });
    this.titleNav = page.getByRole("heading", { name: pollName }).first();
    this.manageButton = page.getByRole("button", { name: "Manage" });
    this.editDetailsButton = page.getByRole("menuitem", {
      name: "Edit details",
    });
    this.pauseButton = page.getByRole("menuitem", { name: "Pause" });
    this.deleteButton = page.getByRole("menuitem", { name: "Delete" });
    this.confirmDeleteButton = page.getByRole("button", { name: "Delete" });
    // Event Details section
    this.eventTitleLabel = page.getByLabel("Title");
    this.eventLocationLabel = page.getByLabel("Location");
    this.eventDescriptionLabel = page.getByLabel("Description");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.pausedStatus = page.locator("span", { hasText: "Paused" });
    this.pausedTitle = page.getByRole("heading", { name: "Paused" });
  }
}
