import { expect, type Locator, type Page } from "@playwright/test";
// date-fns library for formatting and getting dates
import { format, getYear, addMonths, subMonths } from "date-fns";

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
  readonly calendarTitle: Locator;
  readonly calendarDescription: Locator;
  readonly monthViewButton: Locator;
  readonly weekViewButton: Locator;
  readonly prevMonthButton: Locator;
  readonly nextMonthButton: Locator;
  readonly calendarMonthDateText: Locator;
  readonly calendarTodayButton: Locator;
  readonly calendarDatePicker: Locator;
  // Settings Card Section
  readonly settingsTitle: Locator;
  readonly settingsDescription: Locator;
  readonly disableComments: Locator;
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
    this.calendarTitle = page.getByRole("heading", { name: "Calendar" });
    this.calendarDescription = page.locator("p", {
      hasText: "Select potential dates or times for your event",
    });
    this.monthViewButton = page.getByRole("tab", { name: "Month view" });
    this.weekViewButton = page.getByRole("tab", { name: "Week view" });
    this.prevMonthButton = page.getByTitle("Previous month");
    this.nextMonthButton = page.getByTitle("Next month");
    // this.calendarMonthDateText = page.locator('div', { hasText: '' });
    this.calendarTodayButton = page.getByRole("button", { name: "Today" });
    this.calendarDatePicker = page.getByText("15");
    // Settings Card Section
    this.settingsTitle = page.getByRole("heading", { name: "Settings" });
    this.settingsDescription = page.locator("p", {
      hasText: "Customize the behaviour of your poll",
    });
    this.disableComments = page.getByLabel("Disable comments");
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

  async clickNextMonth() {
    // Stores next month and year into a string and checks the text is visible and attached to the DOM
    const nextMonth = format(addMonths(new Date(), 1), "LLLL").toString();
    let currentYear = getYear(new Date());
    // If the next month is January, increase the year count by 1
    if (nextMonth === "January") {
      (currentYear += 1).toString();
    }
    const nextDate = nextMonth + " " + currentYear;
    await this.nextMonthButton.click();
    await expect(this.page.getByText(nextDate)).toBeVisible();
  }

  async clickPrevMonth() {
    // Stores previous month and year into a string and checks the text is visible and attached to the DOM
    const prevMonth = format(subMonths(new Date(), 1), "LLLL").toString();
    let currentYear = getYear(new Date());
    // If the prev month is December, increase the year count by 1
    if (prevMonth === "December") {
      (currentYear -= 1).toString();
    }
    const prevDate = prevMonth + " " + currentYear;
    await this.prevMonthButton.click();
    await expect(this.page.getByText(prevDate)).toBeVisible();
  }

  async clickTodayButton() {
    // Stores current month and year into a string and checks the text is visible and attached to the DOM
    const currentMonth = format(new Date(), "LLLL").toString();
    const currentYear = getYear(new Date()).toString();
    const currentDate = currentMonth + " " + currentYear;
    await this.calendarTodayButton.click();
    await expect(this.page.getByText(currentDate)).toBeVisible();
  }

  async verifyPollElements() {
    // Stores today's month and year in string format
    const currentMonth = format(new Date(), "LLLL").toString();
    const currentYear = getYear(new Date()).toString();
    const currentDate = currentMonth + " " + currentYear;

    // Verify Event Card Elements
    await expect(this.title).toBeVisible();
    await expect(this.eventCardTitle).toBeVisible();
    await expect(this.eventCardDescription).toBeVisible();
    await expect(this.eventTitleLabel).toBeVisible();
    await expect(this.eventLocationLabel).toBeVisible();
    await expect(this.eventDescriptionLabel).toBeVisible();
    // Verify Calendar Card Elements
    await expect(this.calendarTitle).toBeVisible();
    await expect(this.calendarDescription).toBeVisible();
    await expect(this.monthViewButton).toBeVisible();
    await expect(this.weekViewButton).toBeVisible();
    await expect(this.prevMonthButton).toBeVisible();
    await expect(this.nextMonthButton).toBeVisible();
    await expect(this.page.getByText(currentDate)).toBeVisible();
    await expect(this.calendarTodayButton).toBeVisible();
    // Verify Settings card elements
    await expect(this.settingsTitle).toBeVisible();
    await expect(this.settingsDescription).toBeVisible();
    await expect(this.disableComments).toBeVisible();
  }
}
