## [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

Playwright is a framework for Web Testing and Automation. It allows testing [Chromium](https://www.chromium.org/Home), [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [WebKit](https://webkit.org/) with a single API. Playwright is built to enable cross-browser web automation that is **ever-green**, **capable**, **reliable** and **fast**.

|                                                                      |       Linux        |       macOS        |      Windows       |
| :------------------------------------------------------------------- | :----------------: | :----------------: | :----------------: |
| Chromium <!-- GEN:chromium-version -->133.0.6943.16<!-- GEN:stop --> | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| WebKit <!-- GEN:webkit-version -->18.2<!-- GEN:stop -->              | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Firefox <!-- GEN:firefox-version -->134.0<!-- GEN:stop -->           | :white_check_mark: | :white_check_mark: | :white_check_mark: |

Headless execution is supported for all browsers on all platforms. Check out [system requirements](https://playwright.dev/docs/intro#system-requirements) for details.

## Installation

After forking over the repo, please make sure to navigate back to the root folder, PlaywrightTests_Rallly.

Following the command npm install will install Playwright and all other Rallly dependencies.

## 📁 Structure

```sh
 |- playwright.config.ts # Configuration file
 |- test-results # Test recordings and failed test screenshots
 |- tests # Root directory for all my tests, locators
  -- pages # Sets of pages for Rallly application
  -- testCases # Here is the magic 🧙‍♂️
```

## 📜 Test Suite Coverage

For the suite template I chose to follow the Page Objects pattern in order to encapsulate each pages internal structure and responsibilities inside its own highly cohesive class file.

For more information on Page objects, read Playwright documentation [Doc](https://playwright.dev/docs/pom).

1. Navigation Test Case:
   - Validates all navigation items are visible and attached to the DOM
   - Clicks on each navigation item and verifies the content of the page
2. Create/Edit/Pause/Delete Test Case:
   - Creates a poll w/out required fields
   - Creates a poll w required fields
     - A test case for the Poll filter "Live 1" is expected to fail. The app doesn't correctly update.
   - Edit a poll with new values and checks it is updated
   - Pause a poll and checks if it is updated and reflected on Polls page
     - A test case for the Poll filter "Paused 1" is expected to fail. The app doesn't correctly update.
   - Delete a poll and checks if the poll is shown on Polls page
     I would recommend running this test separately as it does have a lot steps due to an issue listed down in blockers.
3. Delete Guest User Test Case:
   - Creates a session and deletes the guest user

## 🧰 How to run playwright tests

After following Rallly's installation process in their [README](../README.md) and starting up the local server + docker. You can use multiple commands to start running the tests.

1. Running all tests, in headless mode on Chrome

```
npx playwright test
```

2. All current tests have a tag for smoke. Using the following command will run all tagged tests in head mode

```
npm run test:smoke
```

3. Run individual tests on their own in head mode on chrome

```
npx playwright test --headed --project chromium 'file-name'
```

## :pencil2: Note:

- Configured in the playwright.config.ts is the timeout for each test step. It is currently configured to 6 seconds. I would suggest to increase it if it is the first time running the tests, since loading on local for nextJS is slow on loading the first time.
- The max runtime each test can take is 30 seconds. If a test exceeds the runtime, the test will exit automatically.

## ✅ How to get Results

After the tests have completed, you can run the command below. This will open up the HTML report into your browser where you can view all test results. It'll also include a recording of the test flow the test cases went through.

If any failures occured, there will be a screenshot of the time the test failed.

```
npx playwright show-report
```

## 🔨 Improvements

1. Run the tests on CI with GitHub Actions
2. Implementing data-testids for more accurate element locators. It would hugely improve assertions and allow more flexibility on class locators to be used elsewhere.
3. Add in API tests for CRUD actions for a poll

## 🎬 Blockers

1. My local couldn't set up the email verification messenger. It would never send out the 6 digit code, used to verify the email address. This ended up blocking test cases to register for any accounts and login flow.
2. The above made verifying an existing poll longer. Each test is a new browser session, which meant each test would have a new guest user and the created poll wouldn't exist. To work around this, I had to include all CRUD tests in a single test and that causes the test run time to exceed 30 seconds with 4 tests running locally in parrallel.
