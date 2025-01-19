import { expect, test } from "@playwright/test";
import { NavigationBar } from "../pages/navigation.bar";
import { CreatePollsPage } from "../pages/create.poll.page";

test.describe("Create Poll", async () => {
  test(
    "Create poll without required fields",
    // tags the test case as smoke tests
    // all smoke tags can be run with npm run test:smoke script
    { tag: "@smoke" },
    async ({ page }) => {
      const navigationBar: NavigationBar = new NavigationBar(page);
      navigationBar.navigateHome();
      navigationBar.createPollNavItem.click();

      const createPollsPage: CreatePollsPage = new CreatePollsPage(page);
      await createPollsPage.verifyPollElements();
      await createPollsPage.createPollButton.click();
      await expect(createPollsPage.titleErrorMessage).toBeVisible();
      await createPollsPage.eventTitleLabel.fill("Test Event One");
      await createPollsPage.createPollButton.click();
      await expect(createPollsPage.calendarOptionsErrorMessage).toBeVisible();
    },
  );

  //   test(
  //     "Create poll with required fields",
  //     { tag: "@smoke" },
  //     async ({ page }) => {},
  //   );
});
