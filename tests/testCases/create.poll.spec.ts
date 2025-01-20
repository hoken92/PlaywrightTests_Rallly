import { expect, test } from "@playwright/test";
import { NavigationBar } from "../pages/navigation.bar";
import { CreatePollsPage } from "../pages/create.poll.page";
import { HomePage } from "../pages/home.page";
import { PollDetailsPage } from "../pages/poll.details.page";
import { PollsPage } from "../pages/polls.page";

test.beforeEach(async ({ page }) => {
  // Navigates user to home page
  await page.goto("/");
});

test.describe("Poll CRUD", async () => {
  const pollName = "Test Event One";
  const newPollName = "Test Event One Updated";
  const newLocation = "Bean Coffee";
  const newDescription = "Weekly meet up to catch up stories!";

  test(
    "Create poll without required fields", // all smoke tags can be run with npm run test:smoke script // tags the test case as smoke tests
    { tag: "@smoke" },
    async ({ page }) => {
      const navigationBar: NavigationBar = new NavigationBar(page);
      navigationBar.createPollNavItem.click();
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

  //Since each test is a new session for GUESTS, I'll need to run all CRUD in this one test.
  test(
    "Create, edit, pause, delete poll",
    { tag: "@smoke" },
    async ({ page }) => {
      // CREATE A POLL

      const navigationBar: NavigationBar = new NavigationBar(page);
      navigationBar.createPollNavItem.click();

      const createPollsPage: CreatePollsPage = new CreatePollsPage(page);
      // Verifies all elements on the Create page
      await createPollsPage.verifyPollElements();

      // Fill Event field and select the 15th date of the month
      await createPollsPage.eventTitleLabel.fill(pollName);
      await createPollsPage.calendarDatePicker.click();
      await createPollsPage.createPollButton.click();

      // Checks url is redirected and poll title was created successfully
      await expect(page).toHaveURL(/poll/);
      const pollDetailsPage: PollDetailsPage = new PollDetailsPage(
        page,
        pollName,
      );
      await pollDetailsPage.closeModalButton.click();
      await expect(pollDetailsPage.titleNav).toBeVisible();

      // Checks if poll is shown Home and Polls page
      navigationBar.navigateHome();
      const homePage: HomePage = new HomePage(page);
      await homePage.validateGroupPollCard(
        "Group Poll",
        "Share your availability with a group of people and find the best time to meet.",
        "1 Live",
      );
      await navigationBar.pollNavItem.click();
      // This soft test is expected to fail, rallly app is not updating this number correctly currently
      // So this test will hang for a bit and will continue the rest of the tests.
      await expect
        .soft(
          page
            .getByRole("button", { name: "Live" })
            .locator("span", { hasText: "1" }),
        )
        .toBeVisible();
      await expect(page.getByRole("heading", { name: pollName })).toBeVisible();

      // EDIT POLL DETAILS
      const navgationBar: NavigationBar = new NavigationBar(page);
      navgationBar.pollNavItem.click();
      const pollsPage: PollsPage = new PollsPage(page);
      await expect(pollsPage.title).toBeVisible();
      await page.getByRole("heading", { name: pollName }).click();
      await pollDetailsPage.closeModalButton.click();
      await expect(pollDetailsPage.titleNav).toBeVisible();
      await pollDetailsPage.manageButton.click();
      await pollDetailsPage.editDetailsButton.waitFor();
      await pollDetailsPage.editDetailsButton.click();
      await expect(pollDetailsPage.eventTitleLabel).toHaveValue(pollName);
      await pollDetailsPage.eventTitleLabel.fill(newPollName);
      await pollDetailsPage.eventLocationLabel.fill(newLocation);
      await pollDetailsPage.eventDescriptionLabel.fill(newDescription);
      await pollDetailsPage.saveButton.click();
      // asserts fields are updated in poll details
      await expect(
        page.getByRole("heading", { name: newPollName }).first(),
      ).toBeVisible();
      await expect(page.locator("p", { hasText: newLocation })).toBeVisible();
      await expect(
        page.locator("p", { hasText: newDescription }),
      ).toBeVisible();

      // PAUSE POLL
      await pollDetailsPage.manageButton.click();
      await pollDetailsPage.pauseButton.waitFor();
      await pollDetailsPage.pauseButton.click();
      await expect(pollDetailsPage.pausedStatus).toBeVisible();
      await expect(pollDetailsPage.pausedTitle).toBeVisible();

      // DELETE POLL
      await pollDetailsPage.manageButton.click();
      await pollDetailsPage.deleteButton.waitFor();
      await pollDetailsPage.deleteButton.click();
      await pollDetailsPage.confirmDeleteButton.waitFor();
      await pollDetailsPage.confirmDeleteButton.click();
      await expect(page).toHaveURL("/polls");
      await expect(pollsPage.noPollsText).toBeVisible();
    },
  );
});
