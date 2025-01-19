import { test, expect } from "@playwright/test";
import { NavigationBar } from "../pages/navigation.bar";
import { HomePage } from "../pages/home.page";
import { PollsPage } from "../pages/polls.page";
import { EventsPage } from "../pages/events.page";
import { CreatePollsPage } from "../pages/create.poll.page";
import { LoginPage } from "../pages/login.page";
import { PreferencePage } from "../pages/preference.page";
import { ProfilePage } from "../pages/profile.page";
import { BillingPage } from "../pages/billing.page";

// Test suite that covers all navigation test cases
test.describe("Navigation tests", async () => {
  // Guest navigation test case
  test(
    "Guest Navigation",
    {
      // tag: "@smoke",
    },
    async ({ page }) => {
      // Sets up the class component to use Playwright page object
      const navigationBar: NavigationBar = new NavigationBar(page);
      // Navigates the user to the baseURL specified in playwright.config file
      await navigationBar.navigateHome();
      await navigationBar.validateNavItems();
      await navigationBar.logo.click();

      // Checks all UI elements in the Home page
      const homePage: HomePage = new HomePage(page);
      await homePage.validateHomeTitle("Home");
      await homePage.validateGroupPollCard(
        "Group Poll",
        "Share your availability with a group of people and find the best time to meet.",
        "0 Live",
      );

      // Navigates to Polls page via nav and checks the title in the Polls page
      navigationBar.pollNavItem.click();
      const pollsPage: PollsPage = new PollsPage(page);
      await expect(pollsPage.title).toHaveText("Polls");

      // Navigates to Events page via Nav and checks the title in the Events page
      navigationBar.eventNavItem.click();
      const eventsPage: EventsPage = new EventsPage(page);
      await expect(eventsPage.title).toHaveText("Events");

      // Navigates to Create Poll page via Nav and checks the title in the Create page
      navigationBar.createPollNavItem.click();
      const createPollsPage: CreatePollsPage = new CreatePollsPage(page);
      await expect(createPollsPage.title).toHaveText("Group Poll");
      //   commenting out the close button, since the locator for the button is too generic
      //   redirecting back to the webpage with url instead
      //   await createPollsPage.closebutton.click();
      navigationBar.navigateHome();

      // Navigates to Login page via Nav and checks the title in the Create page
      navigationBar.loginNavItem.click();
      const loginPage: LoginPage = new LoginPage(page);
      await expect(loginPage.title).toHaveText("Login");
      // redirect back to the Home page to continue Nav tests
      await loginPage.guestbutton.click();

      // Navigates to Preference page via Nav and checks the title and subheading in the Preference page
      const preferencePage: PreferencePage = new PreferencePage(page);
      await navigationBar.prefNavItem.click();
      await expect(preferencePage.title).toHaveText("Settings");
      await expect(preferencePage.subHeading).toHaveText("Language");

      // Navigates to Billing page via Nav and checks the title and subheading in the Billing page
      const billingPage: BillingPage = new BillingPage(page);
      await billingPage.billingButton.click();
      await expect(billingPage.title).toHaveText("Settings");
      await expect(billingPage.subHeading).toHaveText("Free");

      // Navigates to Profile page via Nav and checks the title and subheading in the Profile page
      const profilePage: ProfilePage = new ProfilePage(page);
      await profilePage.profileSettingButton.click();
      await expect(profilePage.title).toHaveText("Settings");
      await expect(profilePage.subHeading).toHaveText("Profile");
    },
  );

  // Logged In User navigation test case
});
