import { expect, test } from "@playwright/test";
import { NavigationBar } from "../pages/navigation.bar";
import { CreatePollsPage } from "../pages/create.poll.page";
import { HomePage } from "../pages/home.page";

test.beforeEach(async ({ page }) => {
  // Navigates user to home page and clicks on Create in the Nav Bar
  const navigationBar: NavigationBar = new NavigationBar(page);
  navigationBar.navigateHome();
  navigationBar.createPollNavItem.click();
});

test.describe("Create Poll", async () => {
  test(
    "Create poll without required fields",
    // tags the test case as smoke tests
    // all smoke tags can be run with npm run test:smoke script
    { tag: "@smoke" },
    async ({ page }) => {
      const createPollsPage: CreatePollsPage = new CreatePollsPage(page);
      // Verifies all elements on the Create page
      await createPollsPage.verifyPollElements();
      await createPollsPage.clickNextMonth();
      await createPollsPage.clickTodayButton();
      await createPollsPage.clickPrevMonth();
      await createPollsPage.clickTodayButton();

      // Checking the two required fields are enforced
      await createPollsPage.createPollButton.click();
      await expect(createPollsPage.titleErrorMessage).toBeVisible();
      await createPollsPage.eventTitleLabel.fill("Test Event One");
      await createPollsPage.createPollButton.click();
      await expect(createPollsPage.calendarOptionsErrorMessage).toBeVisible();
    },
  );

  test(
    "Create poll with required fields",
    { tag: "@smoke" },
    async ({ page }) => {
      const pollName: string = "Test Event One";

      const createPollsPage: CreatePollsPage = new CreatePollsPage(page);
      // Verifies all elements on the Create page
      await createPollsPage.verifyPollElements();

      // Fill Event field and select the 15th date of the month
      await createPollsPage.eventTitleLabel.fill(pollName);
      await createPollsPage.calendarDatePicker.click();
      await createPollsPage.createPollButton.click();

      // Checks url is redirected and poll title was created successfully
      await expect(page).toHaveURL(/poll/);
      await page
        .getByRole("button")
        .locator("span", { hasText: "Close" })
        .click();
      await expect(
        page.getByRole("heading", { name: pollName }).first(),
      ).toBeVisible();

      // Checks if poll is shown Home and Polls page
      const navigationBar: NavigationBar = new NavigationBar(page);
      navigationBar.navigateHome();
      const homePage: HomePage = new HomePage(page);
      await homePage.validateGroupPollCard(
        "Group Poll",
        "Share your availability with a group of people and find the best time to meet.",
        "1 Live",
      );
      await navigationBar.pollNavItem.click();
      await expect(page.getByRole("heading", { name: pollName })).toBeVisible();
    },
  );
  // test("Pause", { tag: "@smoke" }, async ({ page }) => {});
});
