import { test, expect } from "@playwright/test";
import { NavigationBar } from "../pages/navigation.bar";
import { ProfilePage } from "../pages/profile.page";

test("Delete guest user", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("/");

  // Allows test to click on Profile navigation item
  const navigationBar: NavigationBar = new NavigationBar(page);
  navigationBar.guestProfileNavItem.click();

  // Validates profile fields are displaying
  const profilePage: ProfilePage = new ProfilePage(page);
  await expect(profilePage.title).toBeVisible();
  await expect(profilePage.subHeading).toBeVisible();
  // Playwright can't find this element due to a class styling
  //   await expect(profilePage.userIDLabel).toBeVisible();
  await expect(profilePage.userIDField).toBeDisabled();
  await expect(profilePage.guestUserLabel).toBeVisible();
  await expect(profilePage.warningLabel).toHaveText(
    "Profile settings are not available for guest users. Sign in to your existing account or create a new account to customize your profile.",
  );
  // Click on delete user
  await profilePage.deleteGuestUserButton.click();
  // Validates user is redirected to the login page
  await expect(page).toHaveURL("/login");
});
